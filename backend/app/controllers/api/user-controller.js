import db from '../../../db.js';
import responseHelpers from "../../helpers/response.js";
const { response2 } = responseHelpers;
import { hashSync } from "bcrypt";
import { randomUUID } from 'crypto';
import { isPasswordAMatch } from "../../helpers/auth.js";

class UserController {
  GetAll = async (req, res) => {
    try {
      const response = await db.$queryRaw`
                               SELECT 
                                    a.id,
                                    a.uuid, 
                                    a.username, 
                                    a.employee_id,
                                    b.name,
                                    c.department_name,
                                    d.section_name,
                                    a.role
                                FROM mst_user a 
                                    INNER JOIN mst_employee b ON a.employee_id= b.id
                                    INNER JOIN mst_department c ON b.department_id= c.id
                                    INNER JOIN mst_section d ON b.section_id= d.id
                                    order by a.id desc`;
      return res
        .status(200)
        .send(response2(200, true, "list data user", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  GetById = async (req, res) => {
    const uuid = req.params.uuid;
    try {

      const response = await db.$queryRaw`
                               SELECT 
                                    a.id,
                                    a.uuid, 
                                    a.username, 
                                    a.employee_id,
                                    b.name,
                                    c.id as department_id,
                                    c.department_name,
                                    d.section_name,
                                    a.role
                                FROM mst_user a 
                                    INNER JOIN mst_employee b ON a.employee_id= b.id
                                    INNER JOIN mst_department c ON b.department_id= c.id
                                    INNER JOIN mst_section d ON b.section_id= d.id
                                    WHERE a.uuid::varchar  = ${uuid}`;
      return res
        .status(200)
        .send(response2(200, true, "list data user", response));

      // const response = await wip.wip_mst_user.findMany({
      //   where: {
      //     uuid: uuid,
      //   }});

      // return res
      //   .status(200)
      //   .send(response_format.response2(200, true, "single data user", response));
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


  Create = async (req, res) => {
    const { username, password, employee_id, role, user_id } = req.body;

    try {

      
      let userCount = await db.mst_user.count({
        // where: {
        //   username: username,
        // },
        where: {
          OR: [
            { username: username },
            { employee_id: employee_id },
          ],
        },
      });

      if (userCount > 0) {
        return res
          .status(409)
          .send(
            response2(
              409,
              false,
              "Username  or employee id already exist",
              userCount
            )
          );
      }

      const response = await db.mst_user.createMany({
        data: {
          uuid: randomUUID(),
          username: username,
          password: hashSync(password, 10),
          employee_id: employee_id,
          role: role,
          created_by: user_id,
        },
      });

      return res
        .status(201)
        .send(
          response2(
            200,
            true,
            "create data user successfully",
            response
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

  Update = async (req, res) => {
    const { username, employee_id, role, user_id } = req.body;
    const uuid = req.params.uuid;
    const date = new Date();
    try {
      const update = await db.mst_user.updateMany({
        where: {
          uuid: uuid,
        },
        data: {
          username: username,
          employee_id: employee_id,
          role: role,
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
            "updated data user successfully",
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
      const deleted = await db.mst_user.deleteMany({
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
            "deleted data user successfully",
            deleted
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


  UpdatePassword = async (req, res) => {
    // const { username, password, employee_id, role, user_id } = req.body;
    const { username, old_password, new_password } = req.body;
    try {

        let isSpacesOldPass = this.containsWhitespace(old_password);
        let isSpacesNewPass = this.containsWhitespace(new_password);
        

        if(isSpacesOldPass){
          return res
          .status(200)
          .send(
            response2(
              200,
              false,
              "cannot input old password with spaces",
              ""
            )
          );
        }

        if(isSpacesNewPass){
          return res
          .status(200)
          .send(
            response2(
              200,
              false,
              "cannot input new password with spaces",
              ""
            )
          );
        }


        const user = await db.mst_user.findUnique({
          where: {
            username: username,
          },
        });


        if (user == null){
          return res
          .status(409)
          .send(
            response2(
              409,
              false,
              "username " + username + " not found!",
              ""
            )
          );
        }

        if (!(await isPasswordAMatch(old_password, user.password))){
          return res
          .status(409)
          .send(
            response2(
              409,
              false,
              "Old password not match or wrong!",
              ""
            )
          );
        }

        const date = new Date();
        const update = await db.mst_user.updateMany({
          where: {
            uuid: user.uuid,
          },
          data: {
            password: hashSync(new_password, 10),
            modified_by: user.id,
            modified_on: date,
          },
        });
        
    
      return res
        .status(201)
        .send(
          response2(
            200,
            true,
            "update password user successfully",
            ""
          )
        );
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

 containsWhitespace = (str) => {
    return /\s/.test(str);
  }

}

const controller = new UserController();
export const { GetAll, GetById, Create, Update, Delete, UpdatePassword } = controller;
