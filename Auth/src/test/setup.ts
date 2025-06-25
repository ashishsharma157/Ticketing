import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
    // eslint-disable-next-line no-var
    var signup: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfghjkl'; // for testing purpose only
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as mongoose.ConnectOptions);
    });
beforeEach(async () => {
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Database connection is not established.');
    }
    const collections = await db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});
afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signup = async () => {
    const email = 'test@test.com';
    const password = 'password';
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email, password
    })
    .expect(201);
    const cookie = response.get('Set-Cookie') || [];
    return cookie;
}