import { Request, Response } from 'express';
import Joi from 'joi';
import { updateExpenseService } from '../../services/expenses/updateExpenseService';
import { CreateExpenseAttributes } from '../../models/Expense';

const schema = Joi.object({
    description: Joi.string().optional(),
    amount: Joi.number().positive().optional(),
    date: Joi.string().isoDate().optional(),
    category: Joi.string().valid('food', 'transport', 'housing', 'entertainment', 'health', 'other').optional(),
    type: Joi.string().valid('academia', 'alimentacao_basica', 'passagens', 'besteiras', 'lazer', 'hobbie', 'educacao', 'saude', 'vestuario', 'moradia', 'transporte', 'investimentos', 'outros').optional(),
    is_recurring: Joi.boolean().optional(),
    currency: Joi.string().length(3).optional(),
});

export const updateExpenseController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const userId = req.user!.id;
        const expenseId = req.params.id;
        const expense = await updateExpenseService(userId, expenseId, value as Partial<CreateExpenseAttributes>);
        res.status(200).json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};