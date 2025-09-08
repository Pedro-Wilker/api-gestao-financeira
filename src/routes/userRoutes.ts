import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import upload from '../middlewares/imageMiddleware';
import {createUserController} from '../controllers/users/createUserController';
import {listUsersController} from '../controllers/users/listUsersController';
import {deleteUserController} from '../controllers/users/deleteUserController';
import {updateUserController } from '../controllers/users/updateUserController';
import {patchUserNameController} from '../controllers/users/patchUserNameController';
import {patchUserEmailController } from '../controllers/users/patchUserEmailController';
import {patchUserPhoneController } from '../controllers/users/patchUserPhoneController';
import {patchUserPasswordController } from '../controllers/users/patchUserPasswordController';
import {patchUserProfessionController } from '../controllers/users/patchUserProfessionController';
import {patchUserPhotoController } from '../controllers/users/patchUserPhotoController';
import {loginController } from '../controllers/users/loginController';
import {resetPasswordController } from '../controllers/users/resetPasswordController';
import {confirmResetPasswordController } from '../controllers/users/confirmResetCodeController';

const router = Router();

router.post('/users', upload, createUserController);
router.get('/users', authMiddleware, listUsersController);
router.delete('/users/:id', authMiddleware, deleteUserController);
router.put('/users/:id', authMiddleware, upload, updateUserController);
router.patch('/users/:id/name', authMiddleware, patchUserNameController);
router.patch('/users/:id/email', authMiddleware, patchUserEmailController);
router.patch('/users/:id/phone', authMiddleware, patchUserPhoneController);
router.patch('/users/:id/password', authMiddleware, patchUserPasswordController);
router.patch('/users/:id/profession', authMiddleware, patchUserProfessionController);
router.patch('/users/:id/photo', authMiddleware, upload, patchUserPhotoController);
router.post('/login', loginController);
router.post('/reset-password', resetPasswordController);
router.post('/confirm-reset', confirmResetPasswordController);

export default router;