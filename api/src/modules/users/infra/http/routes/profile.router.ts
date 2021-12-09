import Router from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../../../../appointmant/infra/http/middlewares/ensureAuthenticated';

const ProfileRouter = Router();
const profileController = new ProfileController();

ProfileRouter.use(ensureAuthenticated);

ProfileRouter.get('/', profileController.show);
ProfileRouter.put('/', profileController.update);

export default ProfileRouter;
