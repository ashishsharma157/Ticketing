import {Message} from 'node-nats-streaming';
import {Listener} from './base-listener';
import { TicketCreatedEvent } from './ticket-created-events';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log(`Ticket created event data: ${JSON.stringify(data)}`);
        //console.log(data.id); // Access the ticket ID
        // Process the data as needed
        msg.ack(); // Acknowledge the message
    }
}