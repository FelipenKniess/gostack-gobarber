import { Router } from 'express';
import {getCustomRepository} from 'typeorm';

import {parseISO} from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';


const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const newAppointment = await createAppointment.Execute({ date: parsedDate, provider_id });

        return response.json(newAppointment);

    } catch(err){
        return response.status(400).json({ error: err.message })
    }
});

export default appointmentsRouter;