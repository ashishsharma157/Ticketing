import  express  from "express";
import 'express-async-errors';
import { json} from 'body-parser';

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
app.listen(3000, () => {
  console.log("Auth service is running on port 3000!!!");
});