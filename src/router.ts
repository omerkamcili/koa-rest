import * as Router from 'koa-router';
import indexController from './controller/index/indexController';
import authController from './controller/auth/authController';
import { registerValidator, loginValidator } from './controller/auth/authValidator';
import userController from './controller/user/userController';

const router = new Router();

router.get('/', indexController.index);
router.post('/auth/login', loginValidator, authController.login);
router.post('/auth/register', registerValidator, authController.register);

router.get('/user/all', userController.getAllUsers);
router.get('/user/get/:user_id', userController.getUser);

export default router;