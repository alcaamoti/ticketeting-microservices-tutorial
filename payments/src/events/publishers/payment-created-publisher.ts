import {Subjects, Publisher, PaymentCreatedEvent} from '@alcaamoti-tut-micro-svr-tick/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}