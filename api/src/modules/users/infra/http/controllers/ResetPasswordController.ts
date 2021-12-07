import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '../../../services/ResetPasswordService';

export default class ResetPasswordController {
  public async creatr(request: Request, response: Response): Promise<Response>{
    const { password, token } = request.body;

    const resetPassword = container.resolve(
      ResetPasswordService,
      );

      resetPassword.execute({
        token,
        password,
    });
    //delete user.password;
    return response.status(204).json();
  }
}
