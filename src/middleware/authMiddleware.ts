import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from '../entity/User.entity';

export function verifyToken(req : Request, res : Response, next : NextFunction) {
    try {
        var authorization = req.body.token || req.query.token || req.headers;
    } catch (error) {
        res.status(401).json({
            message: "Please login"
        })
    }

    if(!authorization){
        res.status(403).send('A token is required for authentication');
    }
    
    const decoded = authorization.authorization.replace('Bearer', '').trim();
    try {
        const data = jwt.verify(decoded, process.env.JWT_SECRET);
        Object.assign(req, {
            userId : data
        } );

    } catch (error) {
        return res.status(401).send({message: 'Invalid Token'});
    }

    return next();
}

export function verifyRole(...permittedRoles) {
    
    return async (req : Request, res : Response, next : NextFunction) => {
        const UserRepository = getRepository(User);
        const { id } = req['userId'];

        const userRole = await UserRepository.findOne({
            where : {
                id
            },
            relations : ['role']
        })

        if(userRole.role.roleTag && permittedRoles.includes(userRole.role.roleTag)){
            next();
        } else {
            return res.status(403).send({message: 'Forbidden'});
        }

    }
    

}