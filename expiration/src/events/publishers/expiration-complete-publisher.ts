import {Subjects, Publisher, ExpirationCompleteEvent} from '@alcaamoti-tut-micro-svr-tick/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}