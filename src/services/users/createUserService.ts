import { User, CreateUserInput } from '../../models/User';
import bcrypt from 'bcryptjs';
import { CreationAttributes } from 'sequelize';

export const createUserService = async (data: CreateUserInput): Promise<Pick<User, 'id' | 'email'>> => {
    const { name, email, phone, password, profession, profile_photo } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createData: CreationAttributes<User> = {
        name,
        email,
        phone,
        password: hashedPassword,
        profession,
        profile_photo,
    };

    const user = await User.create(createData);
    return { id: user.id, email: user.email };
};