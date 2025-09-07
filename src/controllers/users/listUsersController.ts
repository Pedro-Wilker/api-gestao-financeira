import { Request, Response } from 'express';
import { listUsersService } from '../../services/users/listUsersService';

export const listUsersController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await listUsersService(page, limit);
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};