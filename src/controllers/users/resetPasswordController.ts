import { Request, Response } from 'express';
import Joi from 'joi';
import { sendResetCodeService } from '../../services/users/sendResetCodeService';

const schema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { email } = value;
        const message = await sendResetCodeService(email);
        res.json({ message });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};