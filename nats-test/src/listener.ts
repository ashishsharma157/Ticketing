import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();
const stan=nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', ()=> {
    console.log('Listener connected to NATS');
    stan.on('close', () => {
        console.log('NATS connection closed');
        process.exit();
    });
    const options = stan.subscriptionOptions();
    options.setManualAckMode(true);
    const subscription = stan.subscribe('ticket:created', 'listener-queue-group', options);
    subscription.on('message', (msg) => {
        console.log(`Message received: ${msg.getSequence()}, ${msg.getData()}`);
        const data = msg.getData();
        if (typeof data === 'string') {
            console.log(`Data: ${data}`);
        } else {
            console.log('Received non-string data');
        }
        msg.ack(); // Acknowledge the message
    });
});

// Handle process termination gracefully
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());