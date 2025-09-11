import { Expense, CreateExpenseInput } from '../../models/Expense';

export const updateExpenseService = async (userId: string, expenseId: string, data: Partial<CreateExpenseInput>): Promise<Expense> => {
    const expense = await Expense.findOne({
        where: { id: expenseId, user_id: userId },
    });

    if (!expense) {
        throw new Error('Expense not found or not authorized');
    }

    await expense.update({
        description: data.description ?? expense.description,
        amount: data.amount ?? expense.amount,
        date: data.date ?? expense.date,
        category: data.category ?? expense.category,
        type: data.type ?? expense.type,
        is_recurring: data.is_recurring ?? expense.is_recurring,
        currency: data.currency ?? expense.currency,
    });

    return expense;
};