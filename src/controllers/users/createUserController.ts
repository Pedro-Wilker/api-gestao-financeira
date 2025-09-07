import { Request, Response } from 'express';
import { createUserService } from '../../services/users/createUserService';
import { CreateUserInput } from '../../models/User';

export const createUserController = async (req: Request, res: Response) => {
    try {
        const data: CreateUserInput = {
            ...req.body,
            profile_photo: req.file?.filename,
        };
        const user = await createUserService(data);
        res.status(201).json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};