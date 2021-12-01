import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '../../../../users/repositories/IUsersRepository'
import ICreateUserDTO from '../../../../users/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor(){
    this.ormRepository = getRepository(User);
  }

  public async findById(id:string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email:string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({
      where: { email }
    });

    return user;
  }

  public async create(userData:ICreateUserDTO):Promise<User>{
    const appointmant = this.ormRepository.create(userData);
    await this.ormRepository.save(appointmant);

    return appointmant;
  };

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
