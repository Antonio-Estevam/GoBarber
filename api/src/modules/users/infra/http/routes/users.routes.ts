import Router from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../../../../appointmant/infra/http/middlewares/ensureAuthenticated';


const usersRoutes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const uoload = multer(uploadConfig);

usersRoutes.post('/', celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}), usersController.create);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uoload.single('avatar'),
  userAvatarController.update,
  );

export default usersRoutes;
