import BaseException from './base-exception'

class ModelNotFoundException extends BaseException {

    constructor(model) {
        super(`Requested ${model} was not found!`, 404)
    }
}

export default ModelNotFoundException