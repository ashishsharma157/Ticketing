import  express  from "express";
import 'express-async-errors';
import { json} from 'body-parser';
import mongoose from "mongoose";

import { currentUserRouter } from './Routes/current-user';
import { signinRouter } from './Routes/signin';
import { signupRouter } from './Routes/signup'; 
import { singoutRouter } from './Routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found';
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);  
app.use(singoutRouter);
app.all('*', async (req, res)=>{
  throw new NotFoundError();
})
app.use(errorHandler);
const start = async () => {
  try{
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  console.log("Connected to MongoDB");
  }
  catch (err) {
    console.error(err);
  }
};
app.listen(3000, () => {
  console.log("Auth service is running on port 3000!!!");
});

start();