import { Expense } from '../../models/Expense';

export const deleteExpenseService = async (id: string, userId: string): Promise<void> => {
    const expense = await Expense.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!expense) throw new Error('Expense not found');
    await expense.destroy();
};