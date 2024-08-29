import db from '../../../db.js';
import responseHelpers from "../../helpers/response.js";
const { response2 } = responseHelpers;
import { randomUUID } from 'crypto';

class PaymentTypeController {
  GetAll = async (req, res) => {
    try {
      const response = await db.mst_payment_type.findMany({
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
          response2(200, true, "list data payment type", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const response = await db.mst_payment_type.findMany({
        where: {
          uuid: uuid,
        }});

      return res
        .status(200)
        .send(response2(200, true, "single data payment type", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { name, description, user_id } = req.body;
    try {

      const paymentType = await db.mst_payment_type.createMany({
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
          response2(
            200,
            true,
            "create data payment type successfully",
            paymentType
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
      const update = await db.mst_payment_type.updateMany({
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
          response2(
            200,
            true,
            "updated data payment type successfully",
            update
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Delete = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const paymentTypeCount = await db.mst_payment_type.count({
        where: {
          uuid: uuid,
        },
      });

      if(paymentTypeCount > 0) {
        const deleted = await db.mst_payment_type.deleteMany({
          where: {
            uuid: uuid,
          },
        });
        return res
          .status(200)
          .send(
            response2(
              200,
              true,
              "deleted data payment type successfully",
              deleted
            )
          );
      }
    } catch (error) {
      return res
          .status(404)
          .send(
            response2(
              404,
              false,
              "data payment type not found",
              0
            )
          );
    }
  };
}

const controller = new PaymentTypeController();
export const { GetAll, GetById, Create, Update, Delete } = controller;
