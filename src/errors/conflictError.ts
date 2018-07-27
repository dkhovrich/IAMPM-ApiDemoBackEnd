import BaseError from './BaseError';

class ConflictError extends BaseError {
    constructor(message?: string) {
        super(409, message);
    }
}

export default ConflictError;