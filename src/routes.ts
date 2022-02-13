import { Router, Request, Response } from "express";
import { registerUser } from './controller/UserController';
import { registerEnterprise } from './controller/EnterpriseController';
import { registerDepartment } from './controller/DepartmentController';

const routes = Router();

routes.get("/health", (req : Request, res : Response) => {
    return res.json({
        status : "SUCCESS"
    })
});

routes.get("/version", (req : Request, res : Response) => {
    return res.json({
        version : "1.0.0"
    })
});

routes.post("/registerEnterprise", registerEnterprise);

routes.post("/registerDepartment", registerDepartment);

routes.post("/registerUser", registerUser);

export default routes;