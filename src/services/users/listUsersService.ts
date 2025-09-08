import { User } from '../../models/User';
import { Op, WhereOptions } from 'sequelize';
import { UserAttributes } from '../../models/User';

interface PaginationResult {
    data: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const listUsersService = async (page: number = 1, limit: number = 10): Promise<PaginationResult> => {
    const offset = (page - 1) * limit;
    const where: WhereOptions<UserAttributes> = {
        deleted_at: null,
    };
    const { rows, count } = await User.findAndCountAll({
        where,
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