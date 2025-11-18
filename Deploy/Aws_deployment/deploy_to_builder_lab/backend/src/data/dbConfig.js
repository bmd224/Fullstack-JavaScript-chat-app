// Database configuration
// This file provides configuration for both real and test databases

import { Sequelize } from 'sequelize';

// Determine if we're in test mode
const isTest = process.env.NODE_ENV === 'test';

// Create the appropriate Sequelize instance based on the environment
const sequelize = isTest
  ? new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:', // Use in-memory SQLite for tests
      logging: false
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './data/database.sqlite', // Use file-based SQLite for production
      logging: false
    });

export default sequelize;