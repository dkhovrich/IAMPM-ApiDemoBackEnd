import BaseError from './baseError';

class ConflictError extends BaseError {
    constructor(message?: string) {
        super(409, message);
    }
}

export default ConflictError;