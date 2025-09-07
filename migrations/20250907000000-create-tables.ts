import { QueryInterface } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        // Models are synced via sequelize.sync() in code
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
    },
};