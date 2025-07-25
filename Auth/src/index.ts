import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try{
  await mongoose.connect(process.env.MONGO_URI!);
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