import sign from 'jsonwebtoken';
import appConfig from '../../../config/app.js';
import { randomBytes } from 'crypto';

class Tokenizer {
    constructor(appConfig) {
        this.config = appConfig;
    }

    generateAccessToken(user) {
        return sign(user, this.config.appKey, { expiresIn: this.config.tokenExpiresIn });
    }

    generateRefreshToken(length = 40) {
        return randomBytes(length).toString('hex');
    }
}

const tokenizer = new Tokenizer(appConfig);

export const { generateAccessToken, generateRefreshToken } = tokenizer;
