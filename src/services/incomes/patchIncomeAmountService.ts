import { Income } from '../../models/Income';

export const patchIncomeAmountService = async (id: string, userId: string, amount: number): Promise<Income> => {
    const income = await Income.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!income) throw new Error('Income not found');
    await income.update({ amount });
    return income;
};