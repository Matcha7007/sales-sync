import db from '../../../db.js';
import response2 from "../../helpers/response.js";
import InvalidCredentialException from "../../exceptions/invalid-credential-exception.js";
import UnauthenticatedException from "../../exceptions/unauthenticated-exception.js";
import { generateTokens } from "../../helpers/auth.js";

class AuthController {
  async login(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await db.mst_user.findUnique({
        where: {
          username: username,
        },
      });


      if (user == null)
        throw new InvalidCredentialException("Invalid login credentials!", 401);

      // if (!(await AuthService.isPasswordAMatch(password, user.password)))
      //   throw new UnauthenticatedException(
      //     "You need to be authenticated to perform this action!",
      //     401
      //   );

      const payload = { id: user.id, username: user.username };
      const tokens = await generateTokens(payload);

      // var jsonArrayRole = user.role;
      // let roleResponse = []
      // for (var i = 0; i < jsonArrayRole.length; i++){
      //   var obj = jsonArrayRole[i];
      //   for (var key in obj){
      //       var attrName = key;
      //       var attrValue = obj[key];
      //       roleResponse.push(attrValue);
      //   }
      // }

      let roleResponse = []
      for (var role of user.role) 
      {
        roleResponse.push(role.role_name);
      }

      const employee = await db.mst_employee.findUnique({
        where: {
          id: user.employee_id,
        },
      });

      
     
      return res.status(200).send(
        response2(200, true, "Login successfully", {
          id: user.id,
          uuid: user.uuid,
          username: user.username,
          name: employee.name,
          nsk: employee.nsk,
          role : roleResponse,
          accessToken: tokens,
        })
      );
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

const controller = new AuthController();
export const { login } = controller;
