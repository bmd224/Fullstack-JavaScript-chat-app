import {dbReset, userService, messageService} from '../src/data/dataServices.js';

describe('Test database-backed data layer', () => {
    beforeEach(async () => {
        await dbReset();
    });

    describe('Test userService', () => {
        it('Test new user creation', async () => {
            const newUser = await userService.createUser('Tom', 'password123');
            expect(newUser.username).toBe('Tom');
        });

        it('Test existing user creation', async () => {
            await userService.createUser('John', '1234567890');

            await expect(userService.createUser('John', 'newPassword'))
                .rejects
                .toThrow('Username already exists');
        });

        it('Test get existing user', async () => {
            const existingUser = await userService.createUser('Alice', 'mypassword');
            const fetchedUser = await userService.getUser('Alice');
            expect(fetchedUser.username).toEqual(existingUser.username);
        });

        it('Test get non-existing user', async () => {
            const nonExistentUser = await userService.getUser('NonExistentUser');
            expect(nonExistentUser).toBeUndefined();
        });
    });

    describe('Test messageService', () => {
        it('Test add new message', async () => {
            const message = await messageService.addMessage('Alice', 'Test message');
            expect(message.username).toBe('Alice');
            expect(message.content).toBe('Test message');
            expect(message.id).toBeDefined();
        });

        it('Test get messages', async () => {
            await messageService.addMessage('Tom', 'Message 1');
            await messageService.addMessage('John', 'Message 2');

            const messages = await messageService.getMessages();
            expect(messages.length).toBe(2);
            expect(messages[0].content).toBe('Message 1');
            expect(messages[1].content).toBe('Message 2');
        });

        it('Test delete the only message', async () => {
            const newMessage = await messageService.addMessage('Alice', 'Single message');
            const result = await messageService.deleteMessage(newMessage.id);
            expect(result).toBe(true);

            const messages = await messageService.getMessages();
            expect(messages.length).toBe(0);
        });

        it('Test delete message with others', async () => {
            await messageService.addMessage('Alice', 'Message A');
            const messageToDelete = await messageService.addMessage('Alice', 'Message B');
            await messageService.addMessage('Alice', 'Message C');

            const result = await messageService.deleteMessage(messageToDelete.id);
            expect(result).toBe(true);

            const messages = await messageService.getMessages();
            expect(messages.length).toBe(2);
            expect(messages[0].content).toBe('Message A');
            expect(messages[1].content).toBe('Message C');
        });

        it('Test delete non-existing message', async () => {
            const result = await messageService.deleteMessage(999999);
            expect(result).toBe(false);
        });
    });
});