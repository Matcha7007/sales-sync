import db from '../../../db.js';
import responseHelpers from "../../helpers/response.js";
const { response2, response3 } = responseHelpers;
import { randomUUID } from 'crypto';

class CategoryController {
  GetAll = async (req, res) => {
    try {
      const response = await db.mst_category.findMany({
        where: {
          is_active: true
        },
        select: {
          id: true,
          uuid: true,
          name: true,
          description: true
        },
        orderBy:{
          id: "desc"
        }
      });
      return res
        .status(200)
        .send(
          response2(200, true, "list data category", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const response = await db.mst_category.findMany({
        where: {
          uuid: uuid,
        }});

      return res
        .status(200)
        .send(response2(200, true, "single data category", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { name, description, user_id } = req.body;
    try {

      await db.mst_category.createMany({
        data: {
          uuid: randomUUID(),
          name: name,
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
            "create data category successfully"
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Update = async (req, res) => {
    const { name, description, user_id } = req.body;
    const uuid = req.params.uuid;
    const date = new Date();
    try {
      await db.mst_category.updateMany({
        where: {
          uuid: uuid,
        },
        data: {
          name: name,
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
            "updated data category successfully"
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

      const categoryCount = await db.mst_category.count({
        where: {
          uuid: uuid,
        },
      });

      if(categoryCount > 0) {
        await db.mst_category.updateMany({
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
              "deleted data category successfully"
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
              "data category not found"
            )
          );
    }
  };
}

const controller = new CategoryController();
export const { GetAll, GetById, Create, Update, Delete } = controller;
