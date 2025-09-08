import { Expense } from '../../models/Expense';
import { Op, WhereOptions } from 'sequelize';
import { ExpenseAttributes } from '../../models/Expense';

export const patchExpenseRecurringService = async (id: string, userId: string, is_recurring: boolean): Promise<Expense> => {
    const where: WhereOptions<ExpenseAttributes> = {
        id,
        user_id: userId,
        deleted_at: null,
    };
    const expense = await Expense.findOne({ where });
    if (!expense) throw new Error('Expense not found');
    await expense.update({ is_recurring });
    return expense;
};