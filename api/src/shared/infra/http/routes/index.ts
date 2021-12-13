import { Router } from 'express';
import appointmentsRouter  from '../../../../modules/appointmant/infra/http/routes/appointments.routes';
import providersRoutes  from '../../../../modules/appointmant/infra/http/routes/providers.routes';
import usersRoutes  from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRoutes  from '../../../../modules/users/infra/http/routes/sessions.routes';
import passwordRoutes  from '../../../../modules/users/infra/http/routes/password.routes';
import profileRouter  from '../../../../modules/users/infra/http/routes/profile.router';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRouter);

export default routes;
