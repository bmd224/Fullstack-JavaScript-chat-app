import {io as Client} from 'socket.io-client';
import {httpServer} from '../src/index.js';
import {messageService} from '../src/data/dataServices.js';

describe('Socket.IO Chat', () => {
    let clientSocket;

    beforeEach((done) => {

        clientSocket = new Client(`http://localhost:${httpServer.address().port}`, {
            auth: {
                reconnection: false
            }
        });
        clientSocket.on('connect', done);
    });

    afterEach(() => {
        clientSocket.close();
    });

    afterAll((done) => {
        httpServer.close(done);
    });

    describe('Messaging', () => {
        it('should broadcast messages to all clients', (done) => {
            const testMessage = {username: 'User', content: 'Hello, WebSocket!'};

            clientSocket.on('message', (message) => {
                try {
                    expect(message).toMatchObject({
                        content: 'Hello, WebSocket!',
                        username: 'User',
                        id: expect.any(String),
                    });
                    done(); // Called if the assertion passes
                } catch (err) {
                    done(err); // Mark the test as failed if the assertion fails
                }
            });

            clientSocket.emit('message', testMessage);
        });

        it('should store message in database', (done) => {
            const testMessage = {username: 'User', content: 'Test message for storage'};
            clientSocket.on('message', async (message) => {
                try {
                    const storedMessages = await messageService.getMessages();
                    expect(storedMessages.length).not.toBe(0);
                    expect(storedMessages.at(-1).content).toBe(testMessage.content);
                    expect(storedMessages.at(-1).username).toBe(testMessage.username);
                    done(); // Called if the assertion passes
                } catch (err) {
                    done(err); // Mark the test as failed if the assertion fails
                }
            });
            clientSocket.emit('message', testMessage);
        });

        it('should delete message and broadcast deletion to all clients', (done) => {
            const testMessage = {username: 'User', content: 'Temporary message'};

            messageService.addMessage(testMessage.username, testMessage.content).then(async (addedMessage) => {
                const messageIdToDelete = addedMessage.id;
                clientSocket.on('messageDeleted', async (data) => {
                    try {
                        expect(data).toMatchObject({
                            messageId: messageIdToDelete,
                        });
                        // Check that the message no longer exists in the store
                        const messages = await messageService.getMessages();
                        expect(messages.find(msg => msg.id === messageIdToDelete)).toBeUndefined();
                        done(); // Mark test as successful if assertions pass
                    } catch (err) {
                        done(err); // Mark test as failed if assertions fail
                    }
                });
                // Emit deleteMessage event
                clientSocket.emit('deleteMessage', {messageId: messageIdToDelete});
            });

        });

    });
});