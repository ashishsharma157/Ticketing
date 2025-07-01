import  express  from "express";
import 'express-async-errors';
import { json} from 'body-parser';

import cookieSession from "cookie-session";


import { errorHandler, NotFoundError } from '@minttickets/common';
// If the error persists, you can use the following workaround:
// const errorHandler: any = require('@minttickets/common').errorHandler;

const app = express();
app.set('trust proxy', true); // trust first proxy
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}));


app.all('*', async (req, res)=>{
  throw new NotFoundError();
})
app.use(errorHandler);

export { app };