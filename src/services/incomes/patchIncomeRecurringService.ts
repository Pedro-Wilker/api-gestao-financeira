import { Income } from '../../models/Income';

export const patchIncomeRecurringService = async (id: string, userId: string, is_recurring: boolean): Promise<Income> => {
    const income = await Income.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!income) throw new Error('Income not found');
    await income.update({ is_recurring });
    return income;
};