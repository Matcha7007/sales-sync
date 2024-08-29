import db from '../../../db.js';
import responseHelpers from "../../helpers/response.js";
const { response2, response3 } = responseHelpers;
import { randomUUID } from 'crypto';

class DepartmentController {
  GetAll = async (req, res) => {
    try {
      const response = await db.mst_department.findMany({
        where: {
          is_active: true
        },
        orderBy:{
          id: 'desc'
        }
      });
      return res
        .status(200)
        .send(
          response2(200, true, "list data department", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { department_name, user_id } = req.body;
    try {
      await db.mst_department.create({
        data: {
          uuid: randomUUID(),
          department_name: department_name,
          created_by: user_id,
        },
      });

      return res
        .status(201)
        .send(
          response3(
            200,
            true,
            "create data department successfully"
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Update = async (req, res) => {
    const { department_name, user_id } = req.body;
    const uuid = req.params.uuid;
    const date = new Date();
    try {
      await db.mst_department.update({
        where: {
          uuid: uuid,
        },
        data: {
          department_name: department_name,
          modified_by: user_id,
          modified_on: date,
        },
      });
      return res
        .status(200)
        .send(
          response3(
            200,
            true,
            "updated data department successfully"
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Delete = async (req, res) => {
    const { user_id } = req.body;
    const uuid = req.params.uuid;
    const date = new Date();
    try {
        await db.mst_department.update({
          where: {
            uuid: uuid,
          },
          data: {
            is_active: false,
            modified_by: user_id,
            modified_on: date,
          },
        });
        return res.status(200)
                .send(
                    response3(
                    200,
                    true,
                    "deleted data department successfully")
                );
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  }

}

const departmentController = new DepartmentController();
export const { GetAll, Create, Update, Delete } = departmentController;
