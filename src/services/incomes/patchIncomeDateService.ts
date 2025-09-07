import { Income } from '../../models/Income';

export const patchIncomeDateService = async (id: string, userId: string, date: string): Promise<Income> => {
    const income = await Income.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!income) throw new Error('Income not found');
    await income.update({ date });
    return income;
};