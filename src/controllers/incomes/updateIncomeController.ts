import { Request, Response } from 'express';
import Joi from 'joi';
import { updateIncomeService } from '../../services/incomes/updateIncomeService';
import { CreateIncomeAttributes } from '../../models/Income';

const schema = Joi.object({
    description: Joi.string().optional(),
    amount: Joi.number().positive().optional(),
    date: Joi.string().isoDate().optional(),
    source: Joi.string().valid('salary', 'investment', 'freelance', 'gift', 'other').optional(),
    is_recurring: Joi.boolean().optional(),
    currency: Joi.string().length(3).optional(),
}).min(1);

export const updateIncomeController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const income = await updateIncomeService(req.params.id, req.user!.id, value as Partial<CreateIncomeAttributes>);
        res.json(income);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};