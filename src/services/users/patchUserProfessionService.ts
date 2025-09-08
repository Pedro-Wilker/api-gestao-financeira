import { User } from '../../models/User';

export const patchUserProfessionService = async (id: string, profession: string): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.update({ profession });
    return user;
};