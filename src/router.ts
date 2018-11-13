import * as Router from 'koa-router';
import indexController from './controller/index/indexController';
import authController from './controller/auth/authController';
import { registerValidator, loginValidator } from './controller/auth/authValidator';

const router = new Router();

router.get('/', indexController.index);
router.post('/auth/login', loginValidator, authController.login);
router.post('/auth/register', registerValidator, authController.register);

export default router;