import { User } from '../../models/User';

export const patchUserPhoneService = async (id: string, phone: string): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.update({ phone });
    return user;
};
