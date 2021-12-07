import AppError from '../../../shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashPovider from '../providers/HashProvider/models/IHashProvider'

interface IRequest{
  token:string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokenRepository,

    @inject('HashPovider')
    private hashPovider: IHashPovider,
    ){}

 public async execute({ token, password }: IRequest):Promise<void>{
   const userToken = await this.userTokensRepository.findByToken(token);

   if(!userToken){
     throw new AppError('User token does not exists');
   }
   const user = await this.usersRepository.findById(userToken.user_id);

   if(!user){
    throw new AppError('User token does not exists');
   }

   const tokenCreatedAt = userToken.created_at;
   const compareDate = addHours(tokenCreatedAt, 2);

   if(isAfter(Date.now(), compareDate)){
     throw new AppError('Token Expired.');
   }

   user.password = await this.hashPovider.generateHash(password);

   await this.usersRepository.save(user);
 }
}

export default ResetPasswordService;
