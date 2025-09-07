import { Expense } from '../../models/Expense';

export const patchExpenseCategoryService = async (id: string, userId: string, category: 'food' | 'transport' | 'housing' | 'entertainment' | 'health' | 'other'): Promise<Expense> => {
    const expense = await Expense.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!expense) throw new Error('Expense not found');
    await expense.update({ category });
    return expense;
};