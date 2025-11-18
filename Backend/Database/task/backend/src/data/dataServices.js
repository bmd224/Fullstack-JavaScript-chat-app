import { DataTypes } from 'sequelize';
import sequelize from './dbConfig.js';

const { Users, Messages } = await (async () => {

    // Define a Users table model
    const Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Define a Messages table model
    const Messages = sequelize.define('Messages', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        // username field definition
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // content field definition
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
        
    });

    await sequelize.sync();
    return { Users, Messages };
})();

export const userService = {
    createUser: async (username, hashedPassword) => {

        if (await Users.findByPk(username)) {
            throw new Error('Username already exists');
        }
        await Users.create({
            username,
            password: hashedPassword
        })
        return {username};
    },

    getUser: async (username) => {
        const user = await Users.findByPk(username) // Find a user by the username
        // Return the plain object or `undefined`
        return user ? user.get({ plain: true }) : undefined;
    },

};

export const messageService = {
    addMessage: async (username, content) => {
        // Add a new message to the database
        const message = await Messages.create({
            username,
            content
        });
        // Return added record as a plain JS object
        return message.get({plain: true});
    },

    getMessages: async () => {
        return await  Messages.findAll({raw: true});// Retrieve all messages from the database
    },

    // Optional task
    deleteMessage: async (messageId) => {
        // Delete the message with the id equals messageId
        const deletedCount = await Messages.destroy({
            where: {id: messageId}
        });
    }
};

// It is used only for testing purposes:
export const dbReset = async () => {
    // Delete all records in Messages and Users tables
    await Messages.destroy({ where: {}, truncate: true });
    await Users.destroy({ where: {}, truncate: true });
};
