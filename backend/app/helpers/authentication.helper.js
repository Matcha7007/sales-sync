import { verify, decode, sign } from 'jsonwebtoken';
require('dotenv').config();
import { randomBytes, pbkdf2Sync } from 'crypto';
import moment from 'moment';
import { generate } from "randomstring";


export function AuthenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader &&  authHeader.split(' ')[1];
    if(token == null) return res.status(401).send({
      message:"Unauthorized"
    });
  
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
      if(err) return res.status(403).send({
        message:"Forbiden"
      });
      req.validatedUser = user;
      req.token = token;
      next()
    })
}

export function getAuth (req) {
  return decode(req?.headers?.authorization?.split(' ')[1])
}

export function getBearerToken (req) {
  return req?.headers?.authorization.split(' ')[1] ? req?.headers?.authorization.split(' ')[1] :null;
}

// Method to set salt and hash the password for a user 
export function setPassword(password) { 
  let result = {};
  // Creating a unique salt for a particular user 
     let salt = randomBytes(16).toString('hex'); 
   
     // Hashing user's salt and password with 1000 iterations, 
      
     let hash = pbkdf2Sync(password, salt,  
     1000, 64, `sha512`).toString(`hex`); 

    result['hash'] = hash;
    result['salt'] = salt;
    
     return result;
} 
   
 // Method to check the entered password is correct or not 
 export function cekValidPassword(password,hash,salt) { 
     var hashnew = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`); 
     return hashnew === hash; 
}

export function generateToken(user){  
  var now = moment(Date.now()).locale('id');
  var future = moment(now).add(1, 'days').toDate();
  var server = '0.0.0.0';
  var jti = generate();
  const payload = { 
    username :user?.dataValues?.username ? user?.dataValues?.username :"",
    exp : future.getTime() / 1000,
    jti : jti,
    sub : server,
    uuid : user?.dataValues?.uuid ? user?.dataValues?.uuid : "",
    kd_kotama : user?.satuan?.dataValues?.kotama ? user?.satuan?.dataValues?.kotama : "",
    kd_satpor : user?.satuan?.dataValues?.kd_satpor ? user?.satuan?.dataValues?.kd_satpor : "",
    nm_satpor : user?.satuan?.dataValues?.satuan ? user?.satuan?.dataValues?.satuan : "",
    level : user?.dataValues?.level ? user?.dataValues?.level:"satuan"
  }

  token = sign(payload,process.env.ACCESS_TOKEN_SECRET);
  const data = {
    accessToken : token,
    tokenType : "Bearer",
    expiresIn :  future.getTime() / 1000,
    issued : now,
    expires : future
  }
  return data;
}