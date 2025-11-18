import {store, userService, messageService} from '../src/data/dataServices.js';

describe('Test data layer', () => {

    beforeEach(() => {
        store.users.clear();
        store.messages = [];
    })

    describe('Test userService', () => {
        it('Test new user creation', async () => {
            return userService.createUser('John', '1234567890')
                .then(user => {
                    console.log(user)
                    expect(user.username).toBe('John')
                })
        });

        it('Test existing user creation', async () => {
            await userService.createUser('John', '1234567890');
            return userService.createUser('John', '0987654321')
                .then(user => {
                    throw new Error('No error was thrown')
                })
                .catch(error => {
                    expect(error.message).toBe('Username already exists')
                })
        });

        it('Test get existing user', async () => {
            await userService.createUser('John', '1234567890');
            return userService.getUser('John')
                .then(user => {
                    expect(user.username).toBe('John')
                    expect(user.password).toBe('1234567890')
                })
        });

        it('Test get non-existing user', async () => {
            return userService.getUser('NonExistentUser')
                .then(user => {
                    expect(user).toBeUndefined()
                })
        });
    });

    describe('Test messageService', () => {
        it('Test add new message', async () => {
            return messageService.addMessage('John', 'Hello world')
                .then(message => {
                    console.log(message);

                    expect(store.messages.length).toBe(1)

                    expect(message.username).toBe('John');
                    expect(store.messages[0].username).toBe('John');

                    expect(message.content).toBe('Hello world')
                    expect(store.messages[0].content).toBe('Hello world')

                    expect(message.id).toBeDefined();
                    expect(store.messages[0].id).toBeDefined();
                })
        });

        it('Test get messages', async () => {
            await messageService.addMessage('John', 'Message 1');
            await messageService.addMessage('John', 'Message 2');
            return messageService.getMessages()
                .then(messages => {
                    expect(messages.length).toBe(2)
                    expect(messages[0].content).toBe('Message 1')
                    expect(messages[1].content).toBe('Message 2')
                })
        });

        it('Test delete the only message', async () => {
            const message = await messageService.addMessage('John', 'Test message');
            return messageService.deleteMessage(message.id)
                .then(result => {
                    expect(result).toBe(true)
                    return messageService.getMessages()
                })
                .then(messages => {
                    expect(messages.length).toBe(0)
                })
        });

        it('Test delete message with others', async () => {
            await messageService.addMessage('John', 'Message 1')
            const messageToDelete = await messageService.addMessage('John', 'Message 2')
            await messageService.addMessage('John', 'Message 3')

            return messageService.deleteMessage(messageToDelete.id)
                .then(result => {
                    expect(result).toBe(true)
                    return messageService.getMessages()
                })
                .then(messages => {
                    expect(messages.length).toBe(2)
                    expect(messages[0].content).toBe('Message 1')
                    expect(messages[1].content).toBe('Message 3')
                })
        });


        it('Test delete non-existing message', async () => {
            return messageService.deleteMessage(999999)
                .then(result => {
                    expect(result).toBe(false)
                })
        });
    });

});