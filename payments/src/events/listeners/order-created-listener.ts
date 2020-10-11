import {Message} from 'node-nats-streaming'
import {Listener, OrderCreatedEvent, Subjects} from '@alcaamoti-tut-micro-svr-tick/common';
import {queueGroupeName} from './queue-group-name';
import {Order} from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

    queueGroupName = queueGroupeName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        console.log('Firsed order created listener for some reason');
        const order = Order.build({
            id: data.id,
            price: data.ticket.price,
            status: data.status,
            userId: data.userId,
            version: data.version
        });

        await order.save();

        msg.ack();
    }
}