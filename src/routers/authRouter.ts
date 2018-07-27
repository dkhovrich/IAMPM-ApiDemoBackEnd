import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import jsonSchemaMiddleware from '../middleware/jsonSchemaMiddleware';
import UserService from '../services/userService';
import { IUserDto } from '../models/userModel';
import { loginModelJsonSchema } from '../models/loginModel';

const router: Router = express.Router();

router.post('/login', jsonSchemaMiddleware(loginModelJsonSchema), async (req: Request, res: Response) => {
    try {
        const user: IUserDto = await UserService.login(req.body.email);
        const token: string = jwt.sign({ id: user.id }, process.env.JWT_KEY);
        res.json({ token });
    } catch (err) {
        console.error('Login error', err);
        res.sendStatus(401);
    }
});

export default router;