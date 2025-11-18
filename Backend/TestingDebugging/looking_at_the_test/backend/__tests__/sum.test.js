import request from 'supertest';
import {httpServer} from '../src/index.js';

describe('Sum demo tests', () => {

    beforeAll(() => {
        // Executed before starting the tests
    });

    afterAll((done) => {
        // Executed after all tests
        httpServer.close(done);
    });

    beforeEach(async () => {
        // Executed before running each test
    });

    describe('GET /sum', () => {
        it('should return the sum of two valid numbers', async () => {
            return request(httpServer).get('/sum?a=5&b=3')
                .timeout(4000)
                .then(response => {
                expect(response.status).toBe(200);
                expect(response.body).toEqual({sum: 8});
            });
        });

        it('should return an error if "a" or "b" is not a number', async () => {
            return request(httpServer).get('/sum?a=invalid&b=3')
                .timeout(4000)
                .then(response => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    message: 'Invalid query parameters. Ensure "a" and "b" are numbers.'
                });
            });
        });

        it('should return an error if "a" or "b" is missing', async () => {
            return request(httpServer).get('/sum?a=5')
                .timeout(4000)
                .then(response => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    message: 'Invalid query parameters. Ensure "a" and "b" are numbers.'
                });
            });
        });
    });
});