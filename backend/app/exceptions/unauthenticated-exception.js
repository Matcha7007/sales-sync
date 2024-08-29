import BaseException from './base-exception.js'

class UnauthenticatedException extends BaseException {

    constructor(message = 'You need to be authenticated to perform this action!', status = 401) {
        super(message, status)
    }
}

export default UnauthenticatedException