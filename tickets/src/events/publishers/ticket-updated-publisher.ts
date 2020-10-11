import { Publisher, Subjects, TicketUpdatedEvent } from '@alcaamoti-tut-micro-svr-tick/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}