import { Expense, CreateExpenseInput } from '../../models/Expense';

export const updateExpenseService = async (id: string, userId: string, data: Partial<CreateExpenseInput>): Promise<Expense> => {
    const expense = await Expense.findOne({ where: { id, user_id: userId, deleted_at: null } });
    if (!expense) throw new Error('Expense not found');

    const updates: Partial<CreateExpenseInput> = {};
    if (data.description) updates.description = data.description;
    if (data.amount) updates.amount = data.amount;
    if (data.date) updates.date = data.date;
    if (data.category) updates.category = data.category;
    if (data.is_recurring !== undefined) updates.is_recurring = data.is_recurring;
    if (data.currency) updates.currency = data.currency;

    if (Object.keys(updates).length === 0) throw new Error('No fields to update');

    await expense.update(updates);
    return expense;
};