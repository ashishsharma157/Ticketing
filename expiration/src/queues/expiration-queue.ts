import  Queue  from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publish";
import { natsWrapper } from "../nats-wrapper";

interface Payload{
    orderId: string;
}

const expirationQueue = new Queue<Payload>("expiration",{
    redis:{
          host: process.env.REDIS_HOST,

    }
});

expirationQueue.process(async(job)=>{
    console.log("I want to expire the order", job.data.orderId);
    new ExpirationCompletePublisher(natsWrapper.client).publish({ orderId: job.data.orderId });
});

export { expirationQueue };