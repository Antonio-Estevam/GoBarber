import {  Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

/*appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});*/

appointmentsRouter.post('/', appointmentsController.create)
export default appointmentsRouter;
