import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Department } from "../entity/Department.entity";
import { Enterprise } from "../entity/Enterprise.entity";

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
    }
  } catch (error) {
    throw new Error(`Internal server error : ${error}`);
  }
};
