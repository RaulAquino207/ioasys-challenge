import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Department } from "../entity/Department.entity";
import { User } from "../entity/User.entity";

export class DepartmentController {

    private departmentRepository = getRepository(Department);

    async all(req: Request, res: Response, next: NextFunction) {
        return this.departmentRepository.find();
    }

    async one(req: Request, res: Response, next: NextFunction) {
        return this.departmentRepository.findOne(req.params.id);
    }

    async save(req: Request, res: Response) {
        
        return this.departmentRepository.save(req.body);
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        let userToRemove = await this.departmentRepository.findOne(req.params.id);
        await this.departmentRepository.remove(userToRemove);
    }

}