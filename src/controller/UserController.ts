import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import * as bcrypt from "bcrypt";
import { Role } from "../entity/Role.entity";

export const login = async (req: Request, res: Response) => {
    
}

export const registerUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const roleRepository = getRepository(Role);

  const { userName, email, password, passwordConfirm, roleTag } = req.body;

  try {
    const foundUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (password != passwordConfirm) {
      return res.status(400).json({ message: "Password do not match" });
    } else if (!!foundUser) {
      return res.status(400).send({
        message: "Email is already in use",
      });
    } else {
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
