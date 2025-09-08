import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';
import { Op } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginController = async (req: Request, res: Response) => {
    try {
        const { error, value } = schema.validate(req.body);
        if (error) throw new Error(error.details[0].message);
        const { email, password } = value;
        const user = await User.findOne({ where: { email, deleted_at: null } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};