import { Request, Response } from 'express';
import Joi from 'joi';
import { patchIncomeDescriptionService } from '../../services/incomes/patchIncomeDescriptionService';

const schema = Joi.object({
    description: Joi.string().required(),
});

export const patchIncomeDescriptionController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { description } = value;
        const income = await patchIncomeDescriptionService(req.params.id, req.user!.id, description);
        res.json(income);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};