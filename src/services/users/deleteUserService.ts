import { User } from '../../models/User';

export const deleteUserService = async (id: string): Promise<void> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.destroy();
};