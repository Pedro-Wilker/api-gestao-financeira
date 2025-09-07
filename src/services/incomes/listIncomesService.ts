import { Income } from '../../models/Income';

interface PaginationResult {
    data: Income[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const listIncomesService = async (userId: string, page: number = 1, limit: number = 10): Promise<PaginationResult> => {
    const offset = (page - 1) * limit;
    const { rows, count } = await Income.findAndCountAll({
        where: { user_id: userId, deleted_at: null },
        attributes: ['id', 'description', 'amount', 'date', 'source', 'is_recurring', 'currency'],
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