import {OrderCancelledEvent, Subjects, Publisher} from '@alcaamoti-tut-micro-svr-tick/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}