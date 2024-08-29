const { wip } = require("../../../db.js").default;
const response_format = require("../../helpers/response");
const crypto = require('crypto');

class RoleController {
  GetAll = async (req, res) => {
    try {
      const response = await wip.wip_mst_role.findMany({
        orderBy:{
          id:'desc'
        }
      });
      return res
        .status(200)
        .send(response_format.response2(200, true, "list data role", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const response = await wip.wip_mst_role.findMany({
        where: {
          uuid: uuid,
        }});

      return res
        .status(200)
        .send(response_format.response2(200, true, "single data role", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { role_name, description, user_id } = req.body;
    try {
      let roleCount = await wip.wip_mst_role.count({
        where: {
          role_name: role_name,
        },
      });

      if (roleCount > 0) {
        return res
          .status(409)
          .send(
            response_format.response2(
              409,
              false,
              "Role Name already exist",
              roleCount
            )
          );
      }

      const role = await wip.wip_mst_role.createMany({
        data: {
          uuid: crypto.randomUUID(),
          role_name: role_name,
          description: description,
          created_by: user_id,
        },
      });

      return res
        .status(201)
        .send(
          response_format.response2(
            200,
            true,
            "create data role successfully",
            role
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
      const update = await wip.wip_mst_role.updateMany({
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
          response_format.response2(
            200,
            true,
            "updated data role successfully",
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
      const roleCount = await wip.wip_mst_role.count({
        where: {
          uuid: uuid,
        },
      });

      if (roleCount > 0) {
        const deleted = await wip.wip_mst_role.deleteMany({
          where: {
            uuid: uuid,
          },
        });
        return res
          .status(200)
          .send(
            response_format.response2(
              200,
              true,
              "deleted data role successfully",
              deleted
            )
          );
      } else {
        return res
          .status(404)
          .send(
            response_format.response2(
              404,
              false,
              "data role not found",
              roleCount
            )
          );
      }
    } catch (error) {
      return res
          .status(404)
          .send(
            response_format.response2(
              404,
              false,
              "data role not found",
              0
            )
          );
    }
  };
}

module.exports = new RoleController();
