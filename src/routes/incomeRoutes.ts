import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createIncomeController } from '../controllers/incomes/createIncomeController';
import {listIncomesController } from '../controllers/incomes/listIncomesController';
import {deleteIncomeController } from '../controllers/incomes/deleteIncomeController';
import {updateIncomeController } from '../controllers/incomes/updateIncomeController';
import {patchIncomeDescriptionController } from '../controllers/incomes/patchIncomeDescriptionController';
import {patchIncomeAmountController } from '../controllers/incomes/patchIncomeAmountController';
import {patchIncomeDateController } from '../controllers/incomes/patchIncomeDateController';
import {patchIncomeSourceController } from '../controllers/incomes/patchIncomeSourceController';
import {patchIncomeRecurringController } from '../controllers/incomes/patchIncomeRecurringController';
import {patchIncomeCurrencyController } from '../controllers/incomes/patchIncomeCurrencyController';

const router = Router();

router.post('/incomes', authMiddleware, createIncomeController);
router.get('/incomes', authMiddleware, listIncomesController);
router.delete('/incomes/:id', authMiddleware, deleteIncomeController);
router.put('/incomes/:id', authMiddleware, updateIncomeController);
router.patch('/incomes/:id/description', authMiddleware, patchIncomeDescriptionController);
router.patch('/incomes/:id/amount', authMiddleware, patchIncomeAmountController);
router.patch('/incomes/:id/date', authMiddleware, patchIncomeDateController);
router.patch('/incomes/:id/source', authMiddleware, patchIncomeSourceController);
router.patch('/incomes/:id/is_recurring', authMiddleware, patchIncomeRecurringController);
router.patch('/incomes/:id/currency', authMiddleware, patchIncomeCurrencyController);

export default router;