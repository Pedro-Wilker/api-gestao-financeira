import { User } from '../../models/User';

export const patchUserPhotoService = async (id: string, profile_photo: string): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    await user.update({ profile_photo });
    return user;
};