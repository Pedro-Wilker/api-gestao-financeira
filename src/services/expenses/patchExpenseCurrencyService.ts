import { Expense } from '../../models/Expense';

export const patchExpenseCurrencyService = async (id: string, userId: string, currency: string): Promise<Expense> => {
    const expense = await Expense.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!expense) throw new Error('Expense not found');
    await expense.update({ currency });
    return expense;
};