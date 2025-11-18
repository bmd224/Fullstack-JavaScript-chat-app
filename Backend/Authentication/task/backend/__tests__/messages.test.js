import request from 'supertest';
import {httpServer} from '../src/index.js';
import {store} from '../src/data/dataServices.js';

describe('Messages API', () => {
    let authToken;
    const testUser = {
        username: 'User',
        password: '1234'
    };
    beforeAll(() => {
    });

    afterAll((done) => {
        httpServer.close(done);
    });

    beforeEach(async () => {
        // Clear data
        store.users.clear();
        store.messages = [];

        // Register and login test user
        const registerResponse = await request(httpServer)
            .post('/api/auth/register')
            .send(testUser)
            .timeout(4000);

        authToken = registerResponse.body.token;
    });

    describe('Messages API - Unauthorized Access', () => {

        it('should return 401 for POST /api/messages without a token', async () => {
            const response = await request(httpServer)
                .post('/api/messages')
                .send({ username: 'User', content: 'Unauthorized message' })
                .timeout(4000);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message');
        });

        it('should return 401 for GET /api/messages without a token', async () => {
            const response = await request(httpServer)
                .get('/api/messages')
                .timeout(4000);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message');
        });

        it('should return 401 for DELETE /api/messages/:id without a token', async () => {
            const response = await request(httpServer)
                .delete('/api/messages/1')
                .timeout(4000);

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message');
        });
    });


    describe('POST /api/messages', () => {
        it('should create a new message with correct structure', async () => {
            const response = await request(httpServer)
                .post('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ content: 'Hello, World!' })
                .timeout(4000);

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({
                content: 'Hello, World!',
                username: 'User',
                id: expect.any(String),
            });
        });

        it('should fail without content', async () => {
            const response = await request(httpServer)
                .post('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .send()
                .timeout(4000);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Message content is required');
        });
    });

    describe('GET /api/messages', () => {
        it('should get empty message list initially', async () => {
            const response = await request(httpServer)
                .get('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .timeout(4000);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should get messages', async () => {
            // Add test messages
            for (let i = 0; i < 3; i++) {
                await request(httpServer)
                    .post('/api/messages')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send({ content: `Test message ${i}` })
                    .timeout(4000);
            }

            const response = await request(httpServer)
                .get('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .timeout(4000);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(3);
            expect(response.body[2].content).toBe('Test message 2');
        });
    });

    describe('DELETE /api/messages/:id', () => {
        it('should delete an existing message', async () => {
            // Create a message
            const createResponse = await request(httpServer)
                .post('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ content: 'Test message' })
                .timeout(4000);

            const messageId = createResponse.body.id;

            // Delete the message
            const deleteResponse = await request(httpServer)
                .delete(`/api/messages/${messageId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .timeout(4000);

            expect(deleteResponse.status).toBe(204);

            // Verify the message is deleted
            const getResponse = await request(httpServer)
                .get('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .timeout(4000);

            expect(getResponse.body).toHaveLength(0);
        });

        it('should return 404 for non-existent message', async () => {
            const response = await request(httpServer)
                .delete('/api/messages/999999')
                .set('Authorization', `Bearer ${authToken}`)
                .timeout(4000);

            expect(response.status).toBe(404);
        });

    });
});