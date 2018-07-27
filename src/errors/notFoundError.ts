import BaseError from './baseError';

class NotFoundError extends BaseError {
    constructor(message?: string) {
        super(404, message);
    }
}

export default NotFoundError;