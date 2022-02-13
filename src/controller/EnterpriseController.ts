import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Enterprise } from "../entity/Enterprise.entity";
import { User } from "../entity/User.entity";
import * as bcrypt from 'bcrypt';
import { Role } from "../entity/Role.entity";

// private enterpriseRepository = getRepository(Enterprise);
// private userRepository = getRepository(User);

export const all = async (req: Request, res: Response) => {
  // return this.userRepository.find();
};

export const one = async (req: Request, res: Response) => {
  // return this.userRepository.findOne(req.params.id);
};

export const registerEnterprise = async (req: Request, res: Response) => {
  const enterpriseRepository = getRepository(Enterprise);
  const userRepository = getRepository(User);
  const roleRepository = getRepository(Role);

  const { enterpriseName, userName, email, password, passwordConfirm } =
  req.body;
  const foundEnterprise = await enterpriseRepository.findOne({
    where: {
      enterpriseName,
    },
  });

  const foundUser = await userRepository.findOne({
    where: {
        email,
    },
  });

  try {
    if (password != passwordConfirm) {
      return res.status(400).json({ message: "Password do not match" });
    } else if(!!foundEnterprise){
        return res.status(400).send({
            message : "Enterprise name is already in use"
        })
    } else if(!!foundUser){
        return res.status(400).send({
            message : "Email is already in use"
        })
    } else {
        let hashedPassword = await bcrypt.hash(password, 8);
        const enterprise = new Enterprise({
            enterpriseName : enterpriseName,
            createAt : new Date
        })

        let roleADMIN = await roleRepository.findOne({
            where : {
                roleTag : 'ADMIN'
            }
        })

        const user = new User({
            userName : userName,
            createAt : new Date,
            email : email,
            password : hashedPassword,
            role : roleADMIN
        })

        await enterpriseRepository.save(enterprise);
        await userRepository.save(user);

        return res.status(200).json({
            message : "Enterprise and admin user successfully registered"
        })
    }
  } catch (error) {
    throw new Error(`Internal server error : ${error}`);
  }
};

export const remove = async (req: Request, response: Response) => {
  // let userToRemove = await this.userRepository.findOne(req.params.id);
  // await this.userRepository.remove(userToRemove);
};
