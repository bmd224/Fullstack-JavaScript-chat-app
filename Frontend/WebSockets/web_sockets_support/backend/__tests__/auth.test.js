import request from 'supertest';
import { httpServer } from '../src/index.js';
import {dbReset} from "../src/data/dataServices.js";

describe('Authentication API', () => {

    afterAll((done) => {
        httpServer.close(done);
    });

    describe('POST /api/auth/register', () => {
        beforeEach(async() => {
            await dbReset();

        });

        it('should register a new user successfully', async () => {
            const response = await request(httpServer)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .timeout(4000);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('username', 'testuser');
        });

        it('should not allow duplicate usernames', async () => {
            // Register first user
            await request(httpServer)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .timeout(4000);

            // Try to register the same username
            const response = await request(httpServer)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    password: 'differentpassword'
                })
                .timeout(4000);

            expect(response.status).toBe(409);
            expect(response.body).toHaveProperty('message', 'Username already exists');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeAll(async () => {
            await dbReset();
            // Create a test user before login test
            await request(httpServer)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .timeout(4000);
        });

        it('should log in successfully with correct credentials', async () => {
            const response = await request(httpServer)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'password123'
                })
                .timeout(4000);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('username', 'testuser');
            expect(response.body).toHaveProperty('token');
        });

        it('should fail with incorrect password', async () => {
            const response = await request(httpServer)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'wrongpassword'
                })
                .timeout(4000);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Invalid username or password');
        });

        it('should fail with non-existent username', async () => {
            const response = await request(httpServer)
                .post('/api/auth/login')
                .send({
                    username: 'nonexistent',
                    password: 'password123'
                })
                .timeout(4000);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Invalid username or password');
        });
    });
});