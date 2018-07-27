import { ValidationError } from 'jsonschema';
import { Request, Response, NextFunction } from 'express';

export default function () {
    return function (err: any, req: Request, res: Response, next: NextFunction) {
        if (res.headersSent) {
            return next(err);
        }

        console.error(err.message);
        console.error(err.stack);

        if (!err.statusCode) {
            err.statusCode = getErrorCode(err);
        }

        res.status(err.statusCode).send(err.message);
    };
}

function getErrorCode(err: any): number {
    return err instanceof ValidationError ? 400 : 500;
}