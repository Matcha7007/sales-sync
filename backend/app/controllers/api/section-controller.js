const { wip } = require("../../../db.js").default;
const response_format = require("../../helpers/response");
const crypto = require('crypto');

class SectionController {
  GetAll = async (req, res) => {
    try {
      const response = await wip.wip_mst_section.findMany({
        select: {
          id: true,
          uuid: true,
          section_name: true,
          department_id: true,
          created_on: true,
          modified_on: true,
          created_by: true,
          modified_by: true,
          wip_mst_department: {
            select: {
              department_name: true,
            },
          },
        },
        orderBy:{
          id: 'desc'
        }
      });
      return res
        .status(200)
        .send(
          response_format.response2(200, true, "list data section", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const response = await wip.wip_mst_section.findMany({
        where: {
          uuid: uuid,
        },
        select: {
          id: true,
          uuid: true,
          section_name: true,
          department_id: true,
          created_on: true,
          modified_on: true,
          created_by: true,
          modified_by: true,
          wip_mst_department: {
            select: {
              department_name: true,
            },
          },
        },
      });

      return res
        .status(200)
        .send(
          response_format.response2(200, true, "single data role", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { section_name, department_id, user_id } = req.body;
    try {
      const section = await wip.wip_mst_section.create({
        data: {
          uuid: crypto.randomUUID(),
          section_name: section_name,
          department_id: department_id,
          created_by: user_id,
        },
      });

      return res
        .status(201)
        .send(
          response_format.response2(
            200,
            true,
            "create data section successfully",
            section
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Update = async (req, res) => {
    const { section_name, department_id, user_id } = req.body;
    const uuid = req.params.uuid;
    const date = new Date();
    try {
      const update = await wip.wip_mst_section.update({
        where: {
          uuid: uuid,
        },
        data: {
          section_name: section_name,
          department_id: department_id,
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
            "updated data section successfully",
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
      const deleted = await wip.wip_mst_section.delete({
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
            "deleted data section successfully",
            deleted
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
}

module.exports = new SectionController();
