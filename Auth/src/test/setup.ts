import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

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