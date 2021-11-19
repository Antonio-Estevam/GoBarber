import {  Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) =>{

  const { email, password } = request.body;

  const autenticateUser = new AuthenticateUserService();

  const { user, token } = await autenticateUser.execute({
    email,
    password
  });

  //delete user.password;

  return response.json({user, token});

});

export default sessionsRoutes;
