import BaseException from './base-exception.js'

class InvalidCredentialException extends BaseException {

    constructor(message = 'Invalid login credentials!', status = 403) {
        super(message, status)
    }

}

export default InvalidCredentialException