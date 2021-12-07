import { container } from 'tsyringe';

import '../../modules/users/providers';
import './providers';

import IAppointmentsRepository from '../../modules/appointmant/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointmant/infra/typeorm/repositories/AppointmentRepositories';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '../../modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokensRepository.ts';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
  );

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
  );

container.registerSingleton<IUserTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository
  );
