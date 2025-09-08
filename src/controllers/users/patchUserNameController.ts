import { Request, Response } from 'express';
import Joi from 'joi';
import { patchUserNameService } from '../../services/users/patchUserNameService';

const schema = Joi.object({
    name: Joi.string().required(),
});

export const patchUserNameController = async (req: Request, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { name } = value;
        const user = await patchUserNameService(req.params.id, name);
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};