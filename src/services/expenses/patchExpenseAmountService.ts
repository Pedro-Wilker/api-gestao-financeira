import { Expense } from '../../models/Expense';

export const patchExpenseAmountService = async (id: string, userId: string, amount: number): Promise<Expense> => {
    const expense = await Expense.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!expense) throw new Error('Expense not found');
    await expense.update({ amount });
    return expense;
};