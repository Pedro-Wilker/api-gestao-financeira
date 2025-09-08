import { Request, Response } from 'express';
import Joi from 'joi';
import { patchExpenseCurrencyService } from '../../services/expenses/patchExpenseCurrencyService';

const schema = Joi.object({
    currency: Joi.string().length(3).required(),
});

export const patchExpenseCurrencyController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { currency } = value;
        const expense = await patchExpenseCurrencyService(req.params.id, req.user!.id, currency);
        res.json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};