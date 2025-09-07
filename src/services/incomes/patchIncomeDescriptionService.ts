import { Income } from '../../models/Income';

export const patchIncomeDescriptionService = async (id: string, userId: string, description: string): Promise<Income> => {
    const income = await Income.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!income) throw new Error('Income not found');
    await income.update({ description });
    return income;
};