'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('users', {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            name: { type: DataTypes.STRING(255), allowNull: false },
            email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
            phone: { type: DataTypes.STRING(20), allowNull: true },
            password: { type: DataTypes.STRING(255), allowNull: false },
            profession: { type: DataTypes.STRING(100), allowNull: true },
            profile_photo: { type: DataTypes.STRING(255), allowNull: true },
            reset_code: { type: DataTypes.INTEGER, allowNull: true },
            reset_expires: { type: DataTypes.DATE, allowNull: true },
            created_at: { type: DataTypes.DATE, allowNull: false },
            updated_at: { type: DataTypes.DATE, allowNull: false },
            deleted_at: { type: DataTypes.DATE, allowNull: true },
        });

        await queryInterface.createTable('expenses', {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onDelete: 'CASCADE',
            },
            description: { type: DataTypes.STRING(255), allowNull: false },
            amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            date: { type: DataTypes.DATEONLY, allowNull: false },
            category: {
                type: DataTypes.ENUM('food', 'transport', 'housing', 'entertainment', 'health', 'other'),
                defaultValue: 'other',
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('academia', 'alimentacao_basica', 'passagens', 'besteiras', 'lazer', 'hobbie', 'educacao', 'saude', 'vestuario', 'moradia', 'transporte', 'investimentos', 'outros'),
                defaultValue: 'outros',
                allowNull: false,
            },
            is_recurring: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
            currency: { type: DataTypes.STRING(3), defaultValue: 'BRL', allowNull: false },
            created_at: { type: DataTypes.DATE, allowNull: false },
            updated_at: { type: DataTypes.DATE, allowNull: false },
            deleted_at: { type: DataTypes.DATE, allowNull: true },
        });

        await queryInterface.createTable('incomes', {
            id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onDelete: 'CASCADE',
            },
            description: { type: DataTypes.STRING(255), allowNull: false },
            amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
            date: { type: DataTypes.DATEONLY, allowNull: false },
            source: {
                type: DataTypes.ENUM('salary', 'investment', 'freelance', 'gift', 'other'),
                defaultValue: 'other',
                allowNull: false,
            },
            is_recurring: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
            currency: { type: DataTypes.STRING(3), defaultValue: 'BRL', allowNull: false },
            created_at: { type: DataTypes.DATE, allowNull: false },
            updated_at: { type: DataTypes.DATE, allowNull: false },
            deleted_at: { type: DataTypes.DATE, allowNull: true },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('incomes');
        await queryInterface.dropTable('expenses');
        await queryInterface.dropTable('users');
    },
};