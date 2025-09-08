import { Request, Response } from 'express';
import { deleteExpenseService } from '../../services/expenses/deleteExpenseService';

export const deleteExpenseController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        await deleteExpenseService(req.params.id, req.user!.id);
        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};