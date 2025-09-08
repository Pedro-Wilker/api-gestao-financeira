import { Request, Response } from 'express';
import Joi from 'joi';
import { patchExpenseDescriptionService } from '../../services/expenses/patchExpenseDescriptionService';

const schema = Joi.object({
    description: Joi.string().required(),
});

export const patchExpenseDescriptionController = async (req: Request & { user?: { id: string } }, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { description } = value;
        const expense = await patchExpenseDescriptionService(req.params.id, req.user!.id, description);
        res.json(expense);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};