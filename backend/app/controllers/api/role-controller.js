import db from '../../../db.js';
import responseHelpers from "../../helpers/response.js";
const { response2, response3 } = responseHelpers;
import { randomUUID } from 'crypto';

class RoleController {
  GetAll = async (req, res) => {
    try {
      const response = await db.mst_role.findMany({
        where: {
          is_active: true
        },
        select: {
          id: true,
          uuid: true,
          role_name: true,
          description: true
        },
        orderBy:{
          id:'desc'
        }
      });
      return res
        .status(200)
        .send(response2(200, true, "list data role", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const response = await db.mst_role.findMany({
        where: {
          uuid: uuid,
        }});

      return res
        .status(200)
        .send(response2(200, true, "single data role", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { role_name, description, user_id } = req.body;
    try {
      let roleCount = await db.mst_role.count({
        where: {
          role_name: role_name,
        },
      });

      if (roleCount > 0) {
        return res
          .status(409)
          .send(
            response3(
              409,
              false,
              "Role Name already exist"
            )
          );
      }

      await db.mst_role.createMany({
        data: {
          uuid: randomUUID(),
          role_name: role_name,
          description: description,
          created_by: user_id,
        },
      });

      return res
        .status(201)
        .send(
          response3(
            200,
            true,
            "create data role successfully"
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Update = async (req, res) => {
    const { role_name, description, user_id } = req.body;
    const uuid = req.params.uuid;
    const date = new Date();
    try {
      await db.mst_role.updateMany({
        where: {
          uuid: uuid,
        },
        data: {
          role_name: role_name,
          description: description,
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
            "updated data role successfully"
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
      const roleCount = await db.mst_role.count({
        where: {
          uuid: uuid,
        },
      });

      if (roleCount > 0) {
        await db.mst_role.deleteMany({
          where: {
            uuid: uuid,
          },
          data: {
            is_active: false,
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
              "deleted data role successfully"
            )
          );
      } else {
        return res
          .status(404)
          .send(
            response3(
              404,
              false,
              "data role not found"
            )
          );
      }
    } catch (error) {
      return res
          .status(404)
          .send(
            response3(
              404,
              false,
              "data role not found"
            )
          );
    }
  };
}

const roleController = new RoleController();

export const { GetAll, GetById, Create, Update, Delete } = roleController;
