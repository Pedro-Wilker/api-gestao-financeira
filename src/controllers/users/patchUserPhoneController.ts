import { Request, Response } from 'express';
import Joi from 'joi';
import { patchUserPhoneService } from '../../services/users/patchUserPhoneService';

const schema = Joi.object({
    phone: Joi.string().optional(),
});

export const patchUserPhoneController = async (req: Request, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { phone } = value;
        const user = await patchUserPhoneService(req.params.id, phone);
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};