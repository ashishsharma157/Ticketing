import request from 'supertest';
import { app } from '../../app';
it('clear the cookies after signging out', async () => {
    // await request(app)
    // .post('/api/users/signup')
    // .send({
    //     email: 'test1@test.com',
    //     password: 'password'
    // })
    // .expect(201);
    const cookie=await global.signup();
    const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
    //console.log(response.get('Set-Cookie'));
    const setCookie = response.get('Set-Cookie');
    if (!setCookie) {
        throw new Error('No Set-Cookie header found');
    }
    expect(setCookie[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');  
    
});