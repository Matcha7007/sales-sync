import { compare } from 'bcrypt'
import { generateAccessToken } from '../modules/tokenizer/index.js'
// const { RefreshToken } = require('../models')

class AuthService {

    async isPasswordAMatch(attempted, original) {
        return await compare(attempted, original)
    }

    async generateTokens(payload) {
        // return jwt.sign(payload, appKey, { expiresIn: tokenExpiresIn })

        //const refreshToken = Tokenizer.generateRefreshToken()

        // await RefreshToken.create({
        //     token: refreshToken,
        //     userId: payload.id
        // })

        return  generateAccessToken(payload)
        
    }

}

const auth = new AuthService();
export const { isPasswordAMatch, generateTokens } = auth;