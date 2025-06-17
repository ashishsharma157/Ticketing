import  express  from "express";
import { json} from 'body-parser';

import { currentUserRouter } from './Routes/current-user';
import { signinRouter } from './Routes/signin';
import { signupRouter } from './Routes/signup'; 
import { singoutRouter } from './Routes/signout';
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);  
app.use(singoutRouter);
app.listen(3000, () => {
  console.log("Auth service is running on port 3000!!!");
});