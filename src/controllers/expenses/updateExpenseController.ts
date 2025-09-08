import { Request, Response } from 'express';
import Joi from 'joi';
import { updateExpenseService } from '../../services/expenses/updateExpenseService';
import { CreateExpenseAttributes } from '../../models/Expense';

const schema = Joi.object({
    description: Joi.string().optional(),
    amount: Joi.number().positive().optional(),
    date: Joi.string().isoDate().optional(),
    category: Joi.string().valid('food', 'transport', 'housing', 'entertainment', 'health', 'other').optional(),
    is_recurring: Joi.boolean().optional(),
    currency: Joi.string().length(3).optional(),
}).min(1);

export const updateExpenseController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const expense = await updateExpenseService(req.params.id, req.user!.id, value as Partial<CreateExpenseAttributes>);
        res.json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};