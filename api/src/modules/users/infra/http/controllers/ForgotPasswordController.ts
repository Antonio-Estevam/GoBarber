import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async creatr(request: Request, response: Response): Promise<Response>{
    const { email } = request.body;

    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService
      );

    sendForgotPasswordEmailService.execute({
      email,
    });
    //delete user.password;
    return response.status(204).json();
  }
}
