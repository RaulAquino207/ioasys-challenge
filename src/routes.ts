import { Router, Request, Response } from "express";
import { verifyToken, verifyRole } from './middleware/authMiddleware'
import { authenticate } from './controller/AuthController'
import { registerUser, findUserByEnterpriseId, findUserByDepartment, changeUserInfo, deleteUser } from './controller/UserController';
import { registerEnterprise } from './controller/EnterpriseController';
import { registerDepartment, findDepartmentByEnterpriseId, changeDepartmentName, deleteDepartment } from './controller/DepartmentController';

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

routes.post("/registerDepartment",  verifyToken, verifyRole("ADMIN"), registerDepartment);

routes.post("/registerUser", verifyToken, verifyRole("ADMIN"), registerUser);

routes.get("/findUserByEnterpriseId/:id", verifyToken, verifyRole("ADMIN", "EMPLOYEE"), findUserByEnterpriseId);

routes.get("/findUserByDepartment/:id", verifyToken, verifyRole("ADMIN", "EMPLOYEE"), findUserByDepartment);

routes.get("/findDepartmentByEnterpriseId/:id", verifyToken, verifyRole("ADMIN", "EMPLOYEE"), findDepartmentByEnterpriseId);

routes.put("/changeUserInfo/:id", verifyToken, verifyRole("ADMIN"), changeUserInfo);

routes.delete("/deleteUser/:id", verifyToken, verifyRole("ADMIN"), deleteUser);

routes.delete("/deleteDepartment/:id", verifyToken, verifyRole("ADMIN"), deleteDepartment);

routes.post("/login", authenticate);

routes.put("/changeDepartmentName/:id", verifyToken, verifyRole("ADMIN"), changeDepartmentName);

export default routes;