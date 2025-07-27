import nats, {Message, Stan} from 'node-nats-streaming';
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
    new TicketCreatedListener(stan).listen();
});

// Handle process termination gracefully
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data:any, msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000; // Acknowledge wait time
    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client.subscriptionOptions()
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName)
            .setManualAckMode(true)
            .setAckWait(this.ackWait);
    }
    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${msg.getSequence()}, ${msg.getData()}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    
    parseMessage(msg: Message): any {
        const data = msg.getData();
        if (typeof data === 'string') {
            return JSON.parse(data);
        } else {
            return JSON.parse(data.toString('utf8'));
        }
    }
}

class TicketCreatedListener extends Listener {
    subject = 'ticket:created';
    queueGroupName = 'payments-service';

    onMessage(data: any, msg: Message) {
        console.log(`Ticket created event data: ${JSON.stringify(data)}`);
        // Process the data as needed
        msg.ack(); // Acknowledge the message
    }
}