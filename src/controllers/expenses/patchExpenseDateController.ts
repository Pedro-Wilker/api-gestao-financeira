import { Request, Response } from 'express';
import Joi from 'joi';
import { patchExpenseDateService } from '../../services/expenses/patchExpenseDateService';

const schema = Joi.object({
    date: Joi.string().isoDate().required(),
});

export const patchExpenseDateController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { date } = value;
        const expense = await patchExpenseDateService(req.params.id, req.user!.id, date);
        res.json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};