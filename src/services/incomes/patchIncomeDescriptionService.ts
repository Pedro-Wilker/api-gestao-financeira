import { Income } from '../../models/Income';
import { Op, WhereOptions } from 'sequelize';
import { IncomeAttributes } from '../../models/Income';

export const patchIncomeDescriptionService = async (id: string, userId: string, description: string): Promise<Income> => {
    const where: WhereOptions<IncomeAttributes> = {
        id,
        user_id: userId,
        deleted_at: null,
    };
    const income = await Income.findOne({ where });
    if (!income) throw new Error('Income not found');
    await income.update({ description });
    return income;
};