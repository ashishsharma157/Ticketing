import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";


const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  await natsWrapper.connect(('ticketing'), 'random', 'http://nats-srv:4222');
  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });
  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());

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