import { Request, Response } from 'express';
import { patchUserPasswordService } from '../../services/users/patchUserPasswordService';

export const patchUserPasswordController = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const user = await patchUserPasswordService(req.params.id, password);
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};