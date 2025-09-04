import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError } from '@minttickets/common';
import { Order, OrderStatus } from '../models/order';
import mongoose from 'mongoose';

const router = express.Router();
router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return new NotFoundError();
  } 
  const order = await Order.findById(orderId);
  if (!order) {
    throw new NotFoundError();
  } 
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();
  // add event publishing here
  res.status(204).send(order);
});

export { router as deleteOrderRouter };