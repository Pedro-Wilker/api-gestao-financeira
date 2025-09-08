import { Request, Response } from 'express';
import Joi from 'joi';
import { patchUserProfessionService } from '../../services/users/patchUserProfessionService';

const schema = Joi.object({
    profession: Joi.string().optional(),
});

export const patchUserProfessionController = async (req: Request, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { profession } = value;
        const user = await patchUserProfessionService(req.params.id, profession);
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};