import { Expense } from '../../models/Expense';

interface PaginationResult {
    data: Expense[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const listExpensesService = async (userId: string, page: number = 1, limit: number = 10): Promise<PaginationResult> => {
    const offset = (page - 1) * limit;
    const { rows, count } = await Expense.findAndCountAll({
        where: { user_id: userId, deleted_at: null },
        attributes: ['id', 'description', 'amount', 'date', 'category', 'is_recurring', 'currency'],
        limit,
        offset,
    });

    return {
        data: rows,
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
    };
};