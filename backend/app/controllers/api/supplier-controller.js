import db from '../../../db.js';
import responseHelpers from "../../helpers/response.js";
const { response2 } = responseHelpers;
import { randomUUID } from 'crypto';

class SupplierController {
  GetAll = async (req, res) => {
    try {
      const response = await db.mst_supplier.findMany({
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
          response2(200, true, "list data supplier", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const response = await db.mst_supplier.findMany({
        where: {
          uuid: uuid,
        }});

      return res
        .status(200)
        .send(response2(200, true, "single data supplier", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { name, address, phone, user_id } = req.body;
    try {

      const supplier = await db.mst_supplier.createMany({
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
          response2(
            200,
            true,
            "create data supplier successfully",
            supplier
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
      const update = await db.mst_supplier.updateMany({
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
          response2(
            200,
            true,
            "updated data supplier successfully",
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

      const supplierCount = await db.mst_supplier.count({
        where: {
          uuid: uuid,
        },
      });

      if(supplierCount > 0) {
        const deleted = await db.mst_supplier.deleteMany({
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
              "deleted data supplier successfully",
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
              "data supplier not found",
              0
            )
          );
    }
  };
}

const controller = new SupplierController();
export const { GetAll, GetById, Create, Update, Delete } = controller;
