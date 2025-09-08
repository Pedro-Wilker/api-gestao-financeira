import { Income, CreateIncomeInput } from '../../models/Income';

export const updateIncomeService = async (id: string, userId: string, data: Partial<CreateIncomeInput>): Promise<Income> => {
    const income = await Income.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!income) throw new Error('Income not found');

    const updates: Partial<CreateIncomeInput> = {};
    if (data.description) updates.description = data.description;
    if (data.amount) updates.amount = data.amount;
    if (data.date) updates.date = data.date;
    if (data.source) updates.source = data.source;
    if (data.is_recurring !== undefined) updates.is_recurring = data.is_recurring;
    if (data.currency) updates.currency = data.currency;

    if (Object.keys(updates).length === 0) throw new Error('No fields to update');

    await income.update(updates);
    return income;
};