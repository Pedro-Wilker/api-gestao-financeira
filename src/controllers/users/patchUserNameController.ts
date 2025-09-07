import { Request, Response } from 'express';
import { patchUserNameService } from '../../services/users/patchUserNameService';

export const patchUserNameController = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const user = await patchUserNameService(req.params.id, name);
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};