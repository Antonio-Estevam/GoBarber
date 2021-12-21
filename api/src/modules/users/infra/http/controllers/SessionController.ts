import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass} from 'class-transformer';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionController {
  public async creatr(request: Request, response: Response): Promise<Response>{
    const { email, password } = request.body;
    const autenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await autenticateUser.execute({
      email,
      password
    });

    return response.json({user: classToClass(user), token});
  }
}
