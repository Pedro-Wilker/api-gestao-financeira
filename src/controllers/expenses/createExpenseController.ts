import { Request, Response } from 'express';
import Joi from 'joi';
import { createExpenseService } from '../../services/expenses/createExpenseService';
import { CreateExpenseAttributes } from '../../models/Expense';

const schema = Joi.object({
    description: Joi.string().required(),
    amount: Joi.number().positive().required(),
    date: Joi.string().isoDate().required(),
    category: Joi.string().valid('food', 'transport', 'housing', 'entertainment', 'health', 'other').optional(),
    is_recurring: Joi.boolean().optional(),
    currency: Joi.string().length(3).optional(),
});

export const createExpenseController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const userId = req.user!.id;
        const expense = await createExpenseService(userId, value as CreateExpenseAttributes);
        res.status(201).json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};