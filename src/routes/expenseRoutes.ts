import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createExpenseController } from '../controllers/expenses/createExpenseController';
import {listExpensesController } from '../controllers/expenses/listExpensesController';
import {deleteExpenseController } from '../controllers/expenses/deleteExpenseController';
import {updateExpenseController} from '../controllers/expenses/updateExpenseController';
import {patchExpenseDescriptionController} from '../controllers/expenses/patchExpenseDescriptionController';
import {patchExpenseAmountController} from '../controllers/expenses/patchExpenseAmountController';
import {patchExpenseDateController} from '../controllers/expenses/patchExpenseDateController';
import {patchExpenseCategoryController} from '../controllers/expenses/patchExpenseCategoryController';
import {patchExpenseRecurringController} from '../controllers/expenses/patchExpenseRecurringController';
import {patchExpenseCurrencyController} from '../controllers/expenses/patchExpenseCurrencyController';


const router = Router();

router.post('/expenses', authMiddleware, createExpenseController);
router.get('/expenses', authMiddleware, listExpensesController);
router.delete('/expenses/:id', authMiddleware, deleteExpenseController);
router.put('/expenses/:id', authMiddleware, updateExpenseController);
router.patch('/expenses/:id/description', authMiddleware, patchExpenseDescriptionController);
router.patch('/expenses/:id/amount', authMiddleware, patchExpenseAmountController);
router.patch('/expenses/:id/date', authMiddleware, patchExpenseDateController);
router.patch('/expenses/:id/category', authMiddleware, patchExpenseCategoryController);
router.patch('/expenses/:id/is_recurring', authMiddleware, patchExpenseRecurringController);
router.patch('/expenses/:id/currency', authMiddleware, patchExpenseCurrencyController);

export default router;