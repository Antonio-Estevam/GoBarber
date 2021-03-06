import Router from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../../../../appointmant/infra/http/middlewares/ensureAuthenticated';

const ProfileRouter = Router();
const profileController = new ProfileController();

ProfileRouter.use(ensureAuthenticated);

ProfileRouter.get('/', profileController.show);
ProfileRouter.put('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  }
}), profileController.update);

export default ProfileRouter;
