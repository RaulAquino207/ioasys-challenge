import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Department } from "../entity/Department.entity";
import { Enterprise } from "../entity/Enterprise.entity";

export const deleteDepartment = async (req: Request, res: Response) => {
  const departmentRepository = getRepository(Department);
  const { id } = req.params;

  try {
    const foundDepartment = await departmentRepository.find({
      where : {
        id : id
      }
    })

    if(foundDepartment.length == 0){
      return res.status(400).json({
        message: "Department not found",
      });
    } else {
      departmentRepository.delete(foundDepartment[0]);
      return res.status(200).json({
        message: `department ${foundDepartment[0].id} successfully deleted`,
      });
    }
  } catch (error) {
    throw new Error(`Internal server error : ${error}`);
  }
  
}

export const changeDepartmentName = async (req: Request, res: Response) => {
  const departmentRepository = getRepository(Department);
  const { id } = req.params;
  const { departmentName } = req.body;

  const foundDepartment = await departmentRepository.find({
      where : {
        id : id
      }
    })

    if(foundDepartment.length == 0){
      return res.status(400).json({
        message: "Department not found",
      });
    } else {
      await departmentRepository.merge(foundDepartment[0], {
        departmentName
      });
      await departmentRepository.save(foundDepartment[0]);

      return res.status(200).json({
        message: "Department successfully altered",
      });
    }
}

export const findDepartmentByEnterpriseId = async (req: Request, res: Response) => {
  const departmentRepository = getRepository(Department);
  const { id } = req.params;

  try {
    const departments = await departmentRepository.find({
      where : {
        enterprise : id
      }
    })

    if(departments.length == 0){
      return res.status(400).json({
        message: "Department not found",
      });
    } else {
      return res.send(departments);
    }
  } catch (error) {
    
  }
}

export const registerDepartment = async (req: Request, res: Response) => {
  const departmentRepository = getRepository(Department);
  const enterpriseRepository = getRepository(Enterprise);

  const { departmentName, enterpriseId } = req.body;

  try {
    const departments = await departmentRepository.find();
    const foundEnterprise = await enterpriseRepository.findOne({
      where: {
        id: enterpriseId,
      },
    });

    if (!foundEnterprise) {
      return res.status(400).send({
        message: "Enterprise not found",
      });
    } else if (departments.length != 0) {
      console.log('entrei no IF')
      const foundDepartment = {};
      departments.forEach(async (department) => {
        if (
          departmentName.toUpperCase() ==
          department.departmentName.toUpperCase()
        ) {
          Object.assign(foundDepartment, department);
        }
      });

      if (Object.keys(foundDepartment).length != 0) {
        return res.status(400).send({
          message: "Department already exists",
        });
      } else {
        const department = new Department({
          departmentName: departmentName,
          createAt: new Date(),
          enterprise: foundEnterprise,
        });

        await departmentRepository.save(department);
        return res.status(200).json({
          message: "Department successfully registered",
        });
      }
    } else {
      const department = new Department({
        departmentName: departmentName,
        createAt: new Date(),
        enterprise: foundEnterprise,
      });

      await departmentRepository.save(department);
      return res.status(200).json({
        message: "Department successfully registered",
      });
    }
  } catch (error) {
    throw new Error(`Internal server error : ${error}`);
  }
};
