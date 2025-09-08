import { Request, Response } from 'express';
import Joi from 'joi';
import { patchExpenseAmountService } from '../../services/expenses/patchExpenseAmountService';

const schema = Joi.object({
    amount: Joi.number().positive().required(),
});

export const patchExpenseAmountController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { amount } = value;
        const expense = await patchExpenseAmountService(req.params.id, req.user!.id, amount);
        res.json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};