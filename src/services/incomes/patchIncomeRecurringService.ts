import { Income } from '../../models/Income';
import { Op, WhereOptions } from 'sequelize';
import { IncomeAttributes } from '../../models/Income';

export const patchIncomeRecurringService = async (id: string, userId: string, is_recurring: boolean): Promise<Income> => {
    const where: WhereOptions<IncomeAttributes> = {
        id,
        user_id: userId,
        deleted_at: null,
    };
    const income = await Income.findOne({ where });
    if (!income) throw new Error('Income not found');
    await income.update({ is_recurring });
    return income;
};