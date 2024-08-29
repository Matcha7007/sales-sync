const { sics, wip } = require("../../db.js").default;
import { response2 } from "../../helpers/response";
import InvalidCredentialException from "../../exceptions/invalid-credential-exception";
import UnauthenticatedException from "../../exceptions/unauthenticated-exception";
import { generateTokens } from "../../helpers/auth";

class AuthController {
  async login(req, res, next) {
    const { username, password } = req.body;

    try {
      const user = await wip.wip_mst_user.findUnique({
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

      const employee = await wip.wip_mst_employee.findUnique({
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

export default new AuthController();
