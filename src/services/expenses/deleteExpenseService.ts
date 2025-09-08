import { Expense } from '../../models/Expense';
import { Op, WhereOptions } from 'sequelize';
import { ExpenseAttributes } from '../../models/Expense';

export const deleteExpenseService = async (id: string, userId: string): Promise<void> => {
    const where: WhereOptions<ExpenseAttributes> = {
        id,
        user_id: userId,
        deleted_at: null,
    };
    const expense = await Expense.findOne({ where });
    if (!expense) throw new Error('Expense not found');
    await expense.destroy();
};