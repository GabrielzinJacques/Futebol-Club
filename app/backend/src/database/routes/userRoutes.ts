import { Router } from 'express';
import UserController from '../controllers/userController';
import validateLogin from '../middlewares/validateLogin';
import UserService from '../services/userService';

const router = Router();

const user = new UserController(new UserService());

router.post('/login', validateLogin, user.login);

router.get('/login/validate', user.loginValidate);

export default router;
