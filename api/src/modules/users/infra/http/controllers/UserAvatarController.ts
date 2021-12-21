import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass} from 'class-transformer';

import UpdateUserAvatarService from '../../../../users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response>{
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user_id = request.user.id;
    const avatarFilename = request.file?.filename as string;

    console.log(user_id, avatarFilename);
    const user = await updateUserAvatar.execute({user_id, avatarFilename});

    return response.json(classToClass(user))

  }
}
