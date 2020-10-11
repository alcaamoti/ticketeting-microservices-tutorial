import { Publisher, Subjects, TicketCreatedEvent } from '@alcaamoti-tut-micro-svr-tick/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}