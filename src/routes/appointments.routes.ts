import { Router} from 'express';
import {startOfHour, parseISO} from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );

    if(findAppointmentInSameDate){
        return response.status(400).json({ message: "This appointment is already booked"});
    }

    const newAppointment = appointmentsRepository.create({
        provider,
        date: parsedDate
    });

    return response.json(newAppointment);
});

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
})

export default appointmentsRouter;
