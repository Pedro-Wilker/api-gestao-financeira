import { Request, Response } from 'express';
import { deleteIncomeService } from '../../services/incomes/deleteIncomeService';

export const deleteIncomeController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        await deleteIncomeService(req.params.id, req.user!.id);
        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};