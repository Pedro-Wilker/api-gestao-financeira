import { Request, Response } from 'express';
import Joi from 'joi';
import { patchIncomeDateService } from '../../services/incomes/patchIncomeDateService';

const schema = Joi.object({
    date: Joi.string().isoDate().required(),
});

export const patchIncomeDateController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { date } = value;
        const income = await patchIncomeDateService(req.params.id, req.user!.id, date);
        res.json(income);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};