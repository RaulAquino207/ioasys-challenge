import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User.entity";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

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
      throw new Error(`Internal server error : ${error}`);
    }
  }