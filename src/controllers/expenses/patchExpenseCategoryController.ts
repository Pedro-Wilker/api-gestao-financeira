import { Request, Response } from 'express';
import Joi from 'joi';
import { patchExpenseCategoryService } from '../../services/expenses/patchExpenseCategoryService';

const schema = Joi.object({
    category: Joi.string().valid('food', 'transport', 'housing', 'entertainment', 'health', 'other').required(),
});

export const patchExpenseCategoryController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { category } = value;
        const expense = await patchExpenseCategoryService(req.params.id, req.user!.id, category);
        res.json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};