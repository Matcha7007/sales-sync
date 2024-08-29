import { sign } from 'jsonwebtoken'
import appConfig from '../../../config/app'
import { randomBytes } from 'crypto'

class Tokenizer {
    constructor(appConfig) {
        this.config = appConfig
    }

    generateAccessToken(user) {
        return sign(user, this.config.appKey, { expiresIn: this.config.tokenExpiresIn })
    }

    generateRefreshToken(length = 40) {
        return randomBytes(length).toString('hex')
    }
}

export default new Tokenizer(appConfig)