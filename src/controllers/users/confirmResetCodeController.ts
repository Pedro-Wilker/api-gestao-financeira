import { Request, Response } from 'express';
import Joi from 'joi';
import { confirmResetCodeService } from '../../services/users/confirmResetCodeService';

const schema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.number().required(),
    newPassword: Joi.string().min(6).required(),
});

export const confirmResetPasswordController = async (req: Request, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { email, code, newPassword } = value;
        await confirmResetCodeService(email, code, newPassword);
        res.json({ message: 'Password reset successfully' });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};