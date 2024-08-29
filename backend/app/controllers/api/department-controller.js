const { wip } = require("../../../db.js").default;
const response_format = require("../../helpers/response");
const crypto = require('crypto');

class DepartmentController {
  GetAll = async (req, res) => {
    try {
      const response = await wip.wip_mst_department.findMany({
        orderBy:{
          id: 'desc'
        }
      });
      return res
        .status(200)
        .send(
          response_format.response2(200, true, "list data department", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { department_name, user_id } = req.body;
    try {
      const department = await wip.wip_mst_department.create({
        data: {
          uuid: crypto.randomUUID(),
          department_name: department_name,
          created_by: user_id,
        },
      });

      return res
        .status(201)
        .send(
          response_format.response2(
            200,
            true,
            "create data department successfully",
            department
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
      const update = await wip.wip_mst_department.update({
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
          response_format.response2(
            200,
            true,
            "updated data department successfully",
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
        const deleted = await wip.wip_mst_department.delete({
            where: {
                uuid: uuid
            }
        });
        return res.status(200)
                .send(
                    response_format.response2(
                    200,
                    true,
                    "deleted data department successfully",
                    deleted)
                );
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
  }

}

module.exports = new DepartmentController();
