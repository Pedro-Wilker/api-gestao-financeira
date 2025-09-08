import { Request, Response } from 'express';
import { deleteUserService } from '../../services/users/deleteUserService';

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        await deleteUserService(req.params.id);
        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};