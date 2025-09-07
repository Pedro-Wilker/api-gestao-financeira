import { Income } from '../../models/Income';

export const patchIncomeSourceService = async (id: string, userId: string, source: 'salary' | 'investment' | 'freelance' | 'gift' | 'other'): Promise<Income> => {
    const income = await Income.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!income) throw new Error('Income not found');
    await income.update({ source });
    return income;
};