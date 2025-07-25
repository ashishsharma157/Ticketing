import request from 'supertest';
import { app } from '../../app';

import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'concert',
      price: 20
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'concert',
      price: 20
    })
    .expect(401);
});

it('returns a 401 if the user does not owned the ticket', async () => {
    const response=await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'concert',
      price: 20
    });
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
        title: 'concert',
        price: 30
        })
    .expect(401);
});

it('returns a 400 if the user proviced the invalid title or price', async () => {
    const cookie=global.signin();
    const response=await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'concert',
      price: 20
    });
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: '',
        price: 30
    })
    .expect(400);
});

it('update the tickets provied valid input', async () => {
    const cookie=global.signin();
    let response=await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'concert',
      price: 20
    });
    response=await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: 'test',
        price: 30
    })
    .expect(200);
    expect(response.body.title).toEqual('test');
    expect(response.body.price).toEqual(30);
});