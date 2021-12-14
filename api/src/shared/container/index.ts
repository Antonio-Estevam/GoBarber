import { container } from 'tsyringe';

import '../../modules/users/providers';
import './providers';

import IAppointmentsRepository from '../../modules/appointmant/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointmant/infra/typeorm/repositories/AppointmentRepositories';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '../../modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/UserTokensRepository.ts';

import INotificationsRepository from '../../modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '../../modules/notifications/infra/typeorm/repositories/NotificationsRepository';

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

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
  );
