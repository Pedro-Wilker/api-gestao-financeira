import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

export const updateUserService = async (id: string, data: Partial<User>): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');

    const updates: Partial<User> = {};
    if (data.name) updates.name = data.name;
    if (data.email) updates.email = data.email;
    if (data.phone) updates.phone = data.phone;
    if (data.password) updates.password = await bcrypt.hash(data.password, 10);
    if (data.profession) updates.profession = data.profession;
    if (data.profile_photo) updates.profile_photo = data.profile_photo;

    if (Object.keys(updates).length === 0) throw new Error('No fields to update');

    await user.update(updates);
    return user;
};