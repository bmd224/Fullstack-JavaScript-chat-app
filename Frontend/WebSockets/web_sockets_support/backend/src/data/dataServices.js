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
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
        await Users.create({ username, password: hashedPassword });
        return {username};
    },

    getUser: async (username) => {
        const user = await Users.findByPk(username);
        return user ? user.get({ plain: true }) : undefined;
    },

};

export const messageService = {
    addMessage: async (username, content) => {
        const message = await Messages.create({
            username,
            content
        });
        return message.get({ plain: true });
    },

    getMessages: async () => {
        return await Messages.findAll({raw: true});
    },

    // Optional task
    deleteMessage: async (messageId) => {
        const deleted = await Messages.destroy({
            where: { id: messageId }
        });
        return deleted > 0;
    }
};

// It is used only for testing purposes:
export const dbReset = async () => {
    // Delete all records in Messages and Users tables
    await Messages.destroy({ where: {}, truncate: true });
    await Users.destroy({ where: {}, truncate: true });
};
