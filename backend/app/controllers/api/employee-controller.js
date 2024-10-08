import db from '../../../db.js';
import responseHelpers from "../../helpers/response.js";
const { response2, response3 } = responseHelpers;
import { randomUUID } from 'crypto';
import pkg from 'lodash';
const { uniqBy, filter, isEmpty } = pkg;

class EmployeeController {
  GetAll = async (req, res) => {
    try {
      const response = await db.mst_employee.findMany({
        where: {
          is_active: true
        },
        select: {
          id: true,
          uuid: true,
          name: true,
          address: true,
          phone: true,
          department: true,
          section: true,
          mst_department: {
            select : {
              department_name: true,
            }
          },
          mst_section: {
            select : {
              section_name: true,
            }
          },
        },
        orderBy:{
          id: "desc"
        }
      });
      return res
        .status(200)
        .send(
          response2(200, true, "list data employee", response)
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const response = await db.mst_employee.findMany({
        where: {
          uuid: uuid,
        }});

      return res
        .status(200)
        .send(response2(200, true, "single data employee", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Create = async (req, res) => {
    const { name, address, phone, department_id, section_id, user_id } = req.body;
    try {

      await db.mst_employee.createMany({
        data: {
          uuid: randomUUID(),
          name: name,
          address: address,
          phone: phone,
          department_id: department_id,
          section_id: section_id,
          created_by: user_id,
        },
      });

      return res
        .status(201)
        .send(
          response3(
            200,
            true,
            "create data employee successfully"
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Update = async (req, res) => {
    const { name, address, phone, section_id, user_id } = req.body;
    const uuid = req.params.uuid;
    const date = new Date();
    try {
      await db.mst_employee.updateMany({
        where: {
          uuid: uuid,
        },
        data: {
          name: name,
          address: address,
          phone: phone,
          section_id:section_id,
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
            "updated data employee successfully"
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

      const employeeCount = await db.mst_employee.count({
        where: {
          uuid: uuid,
        },
      });

      if(employeeCount > 0) {
        await db.mst_employee.deleteMany({
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
              "deleted data employee successfully"
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
              "data employee not found"
            )
          );
    }
  };

  GetByNsk = async (req, res) => {
    const nsk = req?.params?.nsk ? Number(req?.params?.nsk):0;
    try {

      let response = await db.mst_employee.findFirst({
        where: {
          nsk: nsk,
        },
        include:{
          mst_department:true,
          mst_section:true,
          mst_employee_shift:true
        }    
      });
      return res
        .status(200)
        .send(response2(200, true, "single data employee", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetListEmployeeWithRoleUser = async (req, res) => {
    try {

      const response = await db.mst_user.findMany({
        select:{
          employee_id:true,
          role:true
        }
      });

      let employee_id_operator =  response ? response?.reduce((acu,next)=>{
        next?.role ? next?.role?.reduce((acu2,next2)=>{
          if(next2?.role_name == 'Operator'){
            acu.push({
              employee_id:next?.employee_id,
              role:next2?.role_name
            });
          }
        },[]):[];
        return acu;
      },[]):[];

      let employee_id_operator_unique = uniqBy(employee_id_operator, (v) => [v.employee_id, v.role].join());

      let pegawais = await db.mst_employee.findMany({
        select: {
          id: true,
          uuid: true,
          nsk: true,
          name: true,
          department: true,
          section: true,
          mst_department: {
            select : {
              department_name: true,
            }
          },
          mst_section: {
            select : {
              section_name: true,
            }
          },
          created_on: true,
          modified_on: true,
          created_by: true,
          modified_by: true,
        },
        orderBy:{
          id: "desc"
        }
      });

      let pegawai_with_role = pegawais ? pegawais?.reduce((acu,next)=>{
        let roles = filter(employee_id_operator_unique,{employee_id:next?.id});
        if(isEmpty(roles)){
          roles = [];
          next.roles = roles;
        }else{
          next.roles = roles;
          acu.push(next);
        }
        return acu;
      },[]):[];


      return res
        .status(200)
        .send(response2(200, true, "get data pegawai operator role", pegawai_with_role));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
}

const controller = new EmployeeController();
export const { GetAll, 
  GetListEmployeeWithRoleUser, 
  GetByNsk, GetById, Create, Update, Delete } = controller;
