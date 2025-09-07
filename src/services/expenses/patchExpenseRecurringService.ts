import { Expense } from '../../models/Expense';

export const patchExpenseRecurringService = async (id: string, userId: string, is_recurring: boolean): Promise<Expense> => {
    const expense = await Expense.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!expense) throw new Error('Expense not found');
    await expense.update({ is_recurring });
    return expense;
};