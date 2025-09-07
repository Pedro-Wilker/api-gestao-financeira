import { Income } from '../../models/Income';

export const deleteIncomeService = async (id: string, userId: string): Promise<void> => {
    const income = await Income.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!income) throw new Error('Income not found');
    await income.destroy();
};