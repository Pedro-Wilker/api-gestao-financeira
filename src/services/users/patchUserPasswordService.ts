import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

export const patchUserPasswordService = async (id: string, password: string): Promise<User> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });
    return user;
};