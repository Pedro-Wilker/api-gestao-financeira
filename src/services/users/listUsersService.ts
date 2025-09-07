import { User } from '../../models/User';

interface PaginationResult {
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const listUsersService = async (page: number = 1, limit: number = 10): Promise<PaginationResult> => {
    const offset = (page - 1) * limit;
    const { rows, count } = await User.findAndCountAll({
        where: { deleted_at: null },
        attributes: ['id', 'name', 'email', 'phone', 'profession', 'profile_photo'],
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