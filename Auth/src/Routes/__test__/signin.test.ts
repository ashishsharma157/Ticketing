import request from 'supertest';
import { app } from '../../app';
it('fails when a email that does not exist is supplied', async () => {
    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400);
});
it('fails when an incorrect password is supplied', async () => {
    const cookie= signup();
    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'wrongpassword'
    })
    .expect(400);
});
it('responds with a cookie when given valid credentials', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test1@test.com',
        password: 'password'
    })
    .expect(201);
    //const cookie= signup();
    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test1@test.com',
        password: 'password'
    })
    .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
});