import { Expense } from '../../models/Expense';
import { Op, WhereOptions } from 'sequelize';
import { ExpenseAttributes } from '../../models/Expense';

export const patchExpenseDateService = async (id: string, userId: string, date: string): Promise<Expense> => {
    const where: WhereOptions<ExpenseAttributes> = {
        id,
        user_id: userId,
        deleted_at: null,
    };
    const expense = await Expense.findOne({ where });
    if (!expense) throw new Error('Expense not found');
    await expense.update({ date });
    return expense;
};