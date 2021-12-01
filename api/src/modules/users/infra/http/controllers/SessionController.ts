import { Request, Response } from 'express';
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import { container } from 'tsyringe';

export default class SessionController {
  public async creatr(request: Request, response: Response): Promise<Response>{
    const { email, password } = request.body;
    const autenticateUser = container.resolve(AuthenticateUserService);
    const { user, token } = await autenticateUser.execute({
      email,
      password
    });
    //delete user.password;
    return response.json({user, token});
  }
}
