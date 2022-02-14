import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import * as bcrypt from "bcrypt";
import { Role } from "../entity/Role.entity";
import * as jwt from 'jsonwebtoken';
import { Enterprise } from "../entity/Enterprise.entity";

export const authenticate = async (req: Request, res: Response) => {
  const UserRepository = getRepository(User);
  const { email, password } = req.body;

  try {
    const foundUser = await UserRepository.findOne({
      where : {
        email
      }
    });

    if(!foundUser) {
      return res.status(401).json({
        message: "User not found",
      })
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);
    if(!isValidPassword){
      return res.status(401).json({
        message: "Incorrect password",
      })
    }

    const token = jwt.sign({id : foundUser.id}, process.env.JWT_SECRET, {
      expiresIn : process.env.JWT_EXPIRES_IN
    })

    delete foundUser.password;

    return res.status(200).json({
      foundUser,
      token
    })
  } catch (error) {
    
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

  const { userName, email, password, passwordConfirm, roleTag, enterpriseId } = req.body;

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
          enterprise : foundEnterprise
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
