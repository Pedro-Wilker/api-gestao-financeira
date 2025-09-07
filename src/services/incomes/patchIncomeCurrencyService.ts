import { Income } from '../../models/Income';

export const patchIncomeCurrencyService = async (id: string, userId: string, currency: string): Promise<Income> => {
    const income = await Income.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!income) throw new Error('Income not found');
    await income.update({ currency });
    return income;
};