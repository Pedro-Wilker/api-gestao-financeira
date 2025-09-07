import { User } from '../../models/User';

export const patchUserNameService = async (id: string, name: string): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.update({ name });
    return user;
};