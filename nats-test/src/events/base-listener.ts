import  {Message, Stan} from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data:T['data'], msg: Message): void;
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