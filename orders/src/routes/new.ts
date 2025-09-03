import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@minttickets/common';
import { body } from 'express-validator';
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';
const router = express.Router();
router.post('/api/orders', requireAuth,[
    body('ticketId')
    .not()
    .isEmpty()
    .custom((input:string)=> mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if(!ticket){
        throw new NotFoundError();
    }

    const exitingOrder = await Order.findOne(
    { 
        ticket: ticket, 
        status: { $in: 
            [
                OrderStatus.Created, OrderStatus.AwaitingPayment, OrderStatus.Complete
            ] 
        }
    });

    if(exitingOrder){
        throw new BadRequestError('Ticket is already reserved');
    }

    

  res.send({});
});

export { router as newOrderRouter };