import db from '../../../db.js';
import responseHelpers from "../../helpers/response.js";
const { response2, response3 } = responseHelpers;
import { randomUUID } from 'crypto';

class CustomerController {
  GetAll = async (req, res) => {
    try {
      const response = await db.mst_customer.findMany({
        where: {
          is_active: true
        },
        select: {
          id: true,
          uuid: true,
          name: true,
          address: true,
          phone: true,
        },
        orderBy:{
          id: "desc"
        }
      });
      return res
        .status(200)
        .send(
          response2(200, true, "list data customer", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const response = await db.mst_customer.findMany({
        where: {
          uuid: uuid,
        }});

      return res
        .status(200)
        .send(response2(200, true, "single data customer", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { name, address, phone, user_id } = req.body;
    try {

      await db.mst_customer.createMany({
        data: {
          uuid: randomUUID(),
          name: name,
          address: address,
          phone: phone,
          created_by: user_id,
        },
      });

      return res
        .status(201)
        .send(
          response3(
            200,
            true,
            "create data customer successfully"
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Update = async (req, res) => {
    const { name, address, phone, user_id } = req.body;
    const uuid = req.params.uuid;
    const date = new Date();
    try {
      await db.mst_customer.updateMany({
        where: {
          uuid: uuid,
        },
        data: {
          name: name,
          address: address,
          phone: phone,
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
            "updated data customer successfully"
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

      const customerCount = await db.mst_customer.count({
        where: {
          uuid: uuid,
        },
      });

      if(customerCount > 0) {
        await db.mst_customer.updateMany({
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
              "deleted data customer successfully"
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
              "data customer not found"
            )
          );
    }
  };
}

const controller = new CustomerController();
export const { GetAll, GetById, Create, Update, Delete } = controller;
