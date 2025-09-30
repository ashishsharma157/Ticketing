import { Subjects, Publisher, PaymentCreatedEvent } from "@minttickets/common"

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}