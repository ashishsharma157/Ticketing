import  express  from "express";
import 'express-async-errors';
import { json} from 'body-parser';
import cookieSession from "cookie-session";

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';
import { errorHandler, NotFoundError, currentUser } from '@minttickets/common';
// If the error persists, you can use the following workaround:
// const errorHandler: any = require('@minttickets/common').errorHandler;

const app = express();
app.set('trust proxy', true); // trust first proxy
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.all('*', async (req, res)=>{
  throw new NotFoundError();
})
app.use(errorHandler);

export { app };