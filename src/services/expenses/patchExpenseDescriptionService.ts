import { Expense } from '../../models/Expense';

export const patchExpenseDescriptionService = async (id: string, userId: string, description: string): Promise<Expense> => {
    const expense = await Expense.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!expense) throw new Error('Expense not found');
    await expense.update({ description });
    return expense;
};