import Router from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRoutes = Router();

const uoload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) =>{
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    });

    //delete user.password;

    return response.json(user);
  } catch (error:any) {
    return response.status(400).json({ error: error.message })
  }
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uoload.single('avatar'),
  async(request, response) =>{

  try {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user_id = request.user.id;
    const avatarFilename = request.file?.filename as string;

    console.log(user_id, avatarFilename);
    const user = await updateUserAvatar.execute({user_id, avatarFilename});

    return response.json(user)
  } catch (error:any) {
    return response.status(400).json({ error: error.message })
  }
});

export default usersRoutes;
