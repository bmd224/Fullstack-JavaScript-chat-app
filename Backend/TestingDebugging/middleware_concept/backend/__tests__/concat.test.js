import request from 'supertest';
import {httpServer} from '../src/index.js';

describe('Concat tests', () => {

    afterAll((done) => {
        httpServer.close(done);
    });

    describe('GET /concat', () => {
        it('should return the concatenation of two strings', async () => {
            return request(httpServer).get('/concat?str1=Hello&str2=World')
                .timeout(4000)
                .then(response => {
                expect(response.status).toBe(200);
                expect(response.body).toEqual({result: 'HelloWorld'});
            });
        });

        it('should concatenate numbers as strings', async () => {
            return request(httpServer).get('/concat?str1=123&str2=456')
                .timeout(4000)
                .then(response => {
                expect(response.status).toBe(200);
                expect(response.body).toEqual({result: '123456'});
            });
        });

        it('should return an error if "str1" or "str2" is missing', async () => {
            return request(httpServer).get('/concat?str1=Hello')
                .timeout(4000)
                .then(response => {
                expect(response.status).toBe(400);
                expect(response.body).toEqual({
                    message: 'Invalid query parameters. Ensure "str1" and "str2" are provided.'
                });
            });
        });
    });
});