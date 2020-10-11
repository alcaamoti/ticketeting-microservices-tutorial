import { Publisher, OrderCreatedEvent, Subjects} from '@alcaamoti-tut-micro-svr-tick/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    
}