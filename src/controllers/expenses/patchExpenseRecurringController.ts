import { Request, Response } from 'express';
import Joi from 'joi';
import { patchExpenseRecurringService } from '../../services/expenses/patchExpenseRecurringService';

const schema = Joi.object({
    is_recurring: Joi.boolean().required(),
});

export const patchExpenseRecurringController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { is_recurring } = value;
        const expense = await patchExpenseRecurringService(req.params.id, req.user!.id, is_recurring);
        res.json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};