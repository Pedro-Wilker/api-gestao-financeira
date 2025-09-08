import { Request, Response } from 'express';
import Joi from 'joi';
import { patchIncomeRecurringService } from '../../services/incomes/patchIncomeRecurringService';

const schema = Joi.object({
    is_recurring: Joi.boolean().required(),
});

export const patchIncomeRecurringController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { is_recurring } = value;
        const income = await patchIncomeRecurringService(req.params.id, req.user!.id, is_recurring);
        res.json(income);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};