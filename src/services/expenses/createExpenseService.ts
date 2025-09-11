import { Expense, CreateExpenseInput } from '../../models/Expense';

export const createExpenseService = async (userId: string, data: CreateExpenseInput): Promise<Expense> => {
    return Expense.create({
        user_id: userId,
        description: data.description,
        amount: data.amount,
        date: data.date,
        category: data.category || 'other',
        type: data.type || 'outros',
        is_recurring: data.is_recurring || false,
        currency: data.currency || 'BRL',
    });
};