import { Request, Response } from 'express';
import Joi from 'joi';
import { listUsersService } from '../../services/users/listUsersService';

const schema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
});

export const listUsersController = async (req: Request, res: Response) => {
    try {
        const { error, value } = schema.validate(req.query);
        if (error) throw new Error(error.details[0].message);
        const { page, limit } = value;
        const result = await listUsersService(page, limit);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};