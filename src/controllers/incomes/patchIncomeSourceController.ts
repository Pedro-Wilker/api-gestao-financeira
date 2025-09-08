import { Request, Response } from 'express';
import Joi from 'joi';
import { patchIncomeSourceService } from '../../services/incomes/patchIncomeSourceService';

const schema = Joi.object({
    source: Joi.string().valid('salary', 'investment', 'freelance', 'gift', 'other').required(),
});

export const patchIncomeSourceController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { source } = value;
        const income = await patchIncomeSourceService(req.params.id, req.user!.id, source);
        res.json(income);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};