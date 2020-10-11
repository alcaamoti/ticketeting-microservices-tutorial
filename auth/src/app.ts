import express from 'express';
import 'express-async-errors';//handles errors thrown in async functions automatically
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import {signoutRouter} from './routes/signout';
import {signupRouter} from './routes/signup';
import {errorHandler, NotFoundError} from '@alcaamoti-tut-micro-svr-tick/common';

const app = express();
app.set('trust proxy', true);//allows cookie to be seen as valid even though passing through proxy server
app.use(json());
app.use(
    cookieSession({
        signed: false,//disable encryption of cookie
        //secure: process.env.NODE_ENV !== 'test' //forces use over https
        secure: false
    })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.get('*', ()=>{
    throw new NotFoundError();
})

app.use(errorHandler);

export {app};