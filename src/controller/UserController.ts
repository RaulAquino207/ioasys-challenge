import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import * as bcrypt from "bcrypt";
import { Role } from "../entity/Role.entity";
import { Enterprise } from "../entity/Enterprise.entity";
import { Department } from "../entity/Department.entity";

export const findUserByDepartment = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { id } = req.params;

  try {
    const users = await userRepository.find({
      where : {
        department : id
      }
    })

    return res.send(users);
  } catch (error) {
    throw new Error(`Internal server error : ${error}`);
  }
}

export const findUserByEnterpriseId = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { id } = req.params;

  try {

    const users = await userRepository.find({
      where : {
        enterprise : id
      }
    });
    return res.send(users);
  } catch (error) {
    throw new Error(`Internal server error : ${error}`);
  }
}

export const registerUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const roleRepository = getRepository(Role);
  const enterpriseRepository = getRepository(Enterprise);
  const departmentRepository = getRepository(Department);

  const { userName, email, password, passwordConfirm, roleTag, enterpriseId, departmentId } = req.body;

  try {
    const foundUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    const foundEnterprise = await enterpriseRepository.findOne({
      where : {
        id : enterpriseId
      }
    })

    const foundDepartment = await departmentRepository.findOne({
      where : {
        id : departmentId
      }
    })

    if (password != passwordConfirm) {
      return res.status(400).json({ message: "Password do not match" });
    } else if (!!foundUser) {
      return res.status(409).send({
        message: "Email is already in use",
      });
    } else if (!foundEnterprise){
      return res.status(401).send({
        message: "Enterprise not found",
      });
    }else if(!foundDepartment) {
      return res.status(401).send({
        message: "Department not found",
      });
    }else {
      let hashedPassword = await bcrypt.hash(password, 8);

      let foundRole = await roleRepository.findOne({
        where: {
          roleTag: roleTag,
        },
      });

      if (foundRole == undefined) {
        return res.status(400).json({
          message: "Role not found",
        });
      } else {


        const user = new User({
          userName: userName,
          createAt: new Date(),
          email: email,
          password: hashedPassword,
          role: foundRole,
          enterprise : foundEnterprise,
          department : foundDepartment
        });

        await userRepository.save(user);

        return res.status(200).json({
          message: `${roleTag} user successfully registered`,
        });
      }
    }
  } catch (error) {
    throw new Error(`Internal server error : ${error}`);
  }
};
