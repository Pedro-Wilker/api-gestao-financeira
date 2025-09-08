import { User } from '../../models/User';
import { Op, WhereOptions } from 'sequelize';
import { UserAttributes } from '../../models/User';

export const patchUserNameService = async (id: string, name: string): Promise<User> => {
    const where: WhereOptions<UserAttributes> = {
        id,
        deleted_at: null,
    };
    const user = await User.findOne({ where });
    if (!user) throw new Error('User not found');
    await user.update({ name });
    return user;
};