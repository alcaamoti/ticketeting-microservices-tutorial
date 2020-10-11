import express from 'express';
import 'express-async-errors';//handles errors thrown in async functions automatically
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import {errorHandler, NotFoundError, currentUser} from '@alcaamoti-tut-micro-svr-tick/common';
import {createChargeRouter} from './routes/new';


const app = express();
app.set('trust proxy', true);//allows cookie to be seen as valid even though passing through proxy server
app.use(json());
app.use(
    cookieSession({
        signed: false,//disable encryption of cookie
        secure: process.env.NODE_ENV !== 'test' //forces use over https
    })
);

app.use(currentUser);
app.use(createChargeRouter);

app.all('*', async (req, res)=>{
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};