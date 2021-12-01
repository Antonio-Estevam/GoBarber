import { compare } from 'bcryptjs'
import User from '../infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authCongig from '../../../config/auth';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}
interface Response{
  user: User;
  token:string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
     private usersRepository: IUsersRepository
     ){
  }
  public async execute({ email, password}: Request): Promise<Response>{

    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn} = authCongig.jwt;

    const token = sign({  }, secret,{
      subject: user.id,
      expiresIn:expiresIn,
    });

    return {
      user,
      token
    }
  };
};

export default AuthenticateUserService;
