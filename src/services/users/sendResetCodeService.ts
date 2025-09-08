import { User } from '../../models/User';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendResetCodeService = async (email: string): Promise<string> => {
    const code = Math.floor(100000 + Math.random() * 900000);
    const user = await User.findOne({ where: { email, deleted_at: null } });
    if (!user) throw new Error('User not found');

    await user.update({
        reset_code: code,
        reset_expires: new Date(Date.now() + 15 * 60 * 1000),
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de Reset de Senha',
        text: `Seu código é: ${code}. Expira em 15 minutos.`,
    });

    return 'Código enviado';
};