import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
});

it('return the ticket if the ticket is found', async () => {
    const title = 'concert';
    const price = 20;

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price
        })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});