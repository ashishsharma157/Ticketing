import mongoose from "mongoose";
import { OrderStatus } from "@minttickets/common";
import { TicketDoc } from "./ticket";

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  _id: mongoose.Types.ObjectId;
  __v: number;
}
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum:Object.values(OrderStatus),
      default: OrderStatus.Created
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret: Record<string, any>, options: any) {
        if (ret._id) {
          ret.id = ret._id.toString();
        }
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order, OrderAttrs, OrderDoc, OrderModel, OrderStatus };