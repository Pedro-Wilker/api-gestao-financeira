import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import { Op, WhereOptions } from 'sequelize';
import { UserAttributes } from '../../models/User';

export const confirmResetCodeService = async (email: string, code: number, newPassword: string): Promise<void> => {
    const where: WhereOptions<UserAttributes> = {
        email,
        reset_code: code,
        deleted_at: null,
    };
    const user = await User.findOne({ where });
    if (!user || !user.reset_expires || user.reset_expires < new Date()) {
        throw new Error('Invalid or expired code');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword, reset_code: null, reset_expires: null });
};