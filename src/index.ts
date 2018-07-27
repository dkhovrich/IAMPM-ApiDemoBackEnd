import express, { Express } from 'express';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

import './middleware/passport';

import auth from './routers/authRouter';
import heroes from './routers/heroRouter';
import errorHandler from './middleware/errorHandler';

const port: number = parseInt(process.env.PORT, null);
const authOptions: passport.AuthenticateOptions = { session: false };
const app: Express = express();

app.use(passport.initialize());
app.use(express.json());
app.use(cors());

app.use('/auth', auth);
app.use('/heroes', passport.authenticate('jwt', authOptions), heroes);

app.use(errorHandler());
app.listen(port, () => console.log(`Server is listening on port ${port}`));