import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';


declare global {
    namespace NodeJS {
        interface Global {
            signin(id?: string): string[]
        }
    }
}

jest.mock('../nats-wrapper.ts');


process.env.STRIPE_KEY = 'sk_test_51HYuQUADDrfBAJev6UXU70FXqaurPeeE9x5AoZaTme7wNyXxDVWnjqv9prysNFSbj9lF0vn3J7dd6hht0nV9tiF800jHTKm3GX';

let mongo: any;

//hook function
beforeAll(async() => {
    
    process.env.JWT_KEY = 'adfs';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async ()=> {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async ()=>{
    await mongo.stop();
    await mongoose.connection.close();
});


//global function

global.signin = (id?: string) => {
    //build a jwt payload. {id, email}
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };
    //create the jwt
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    //build session object {jwt: MY_JWT}
    const session = {jwt: token};

    //turn session into JSON
    const sessionJSON = JSON.stringify(session);
    
    //take JSON and encode as base 64
    const base64 = Buffer.from(sessionJSON).toString('base64');
    
    //return a string thats the cooke with encoded data
    return [`express:sess=${base64}`];
};