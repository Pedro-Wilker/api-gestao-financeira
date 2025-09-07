import { Request, Response } from 'express';
import { updateUserService } from '../../services/users/updateUserService';
import { User } from '../../models/User';

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const data: Partial<User> = {
            ...req.body,
            profile_photo: req.file?.filename,
        };
        const user = await updateUserService(req.params.id, data);
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};