import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();
console.log('Publisher starting...');
const stan=nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect',() => {
    console.log('Publisher connected to NATS');
    const publisher = new TicketCreatedPublisher(stan);
    publisher.publish({
        id: '123',
        title: 'concert',
        price: 20,
    }).then(() => {
        console.log('Ticket created event published');
    }).catch((err) => {
        console.error('Error publishing ticket created event:', err);
    });
    // const data = JSON.stringify({
    //     id: '123',
    //     title: 'concert',
    //     price: 20,
    // });
    // stan.publish('ticket:created', data, () => {
    //     console.log('Event published');
    // });
});