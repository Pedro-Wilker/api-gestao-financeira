import { Income, CreateIncomeInput } from '../../models/Income';
import { CreationAttributes } from 'sequelize';

export const createIncomeService = async (userId: string, data: CreateIncomeInput): Promise<Income> => {
    return Income.create({
        user_id: userId,
        description: data.description,
        amount: data.amount,
        date: data.date,
        source: data.source || 'other',
        is_recurring: data.is_recurring || false,
        currency: data.currency || 'BRL',
    });
};