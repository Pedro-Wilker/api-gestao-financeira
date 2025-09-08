import { Request, Response } from 'express';
import Joi from 'joi';
import { createUserService } from '../../services/users/createUserService';
import { CreateUserAttributes } from '../../models/User';

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    password: Joi.string().min(6).required(),
    profession: Joi.string().optional(),
});

export const createUserController = async (req: Request, res: Response) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const data: CreateUserAttributes = {
            ...req.body,
            profile_photo: req.file?.filename,
        };
        const user = await createUserService(data);
        res.status(201).json(user);
    } catch (err: any) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};