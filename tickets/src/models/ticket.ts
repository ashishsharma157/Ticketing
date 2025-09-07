import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// Ticket attributes interface (for creating new tickets)
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// Ticket document interface (from the database)
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  _id: mongoose.Types.ObjectId;
  __v: number;
}


// Ticket model interface (for the build method)
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// Define the schema for Ticket
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret: Record<string, any>, options: any) {
        if (ret._id) {
          ret.id = ret._id.toString(); // Transform _id to id as string
        }
        delete ret._id; // Remove _id field
        delete ret.__v; // Remove __v field
      }
    }
  }
);

ticketSchema.plugin(updateIfCurrentPlugin);
ticketSchema.set('versionKey', 'version');
// Add the static method to build a new ticket
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// Create the model for Ticket
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket, TicketAttrs, TicketDoc, TicketModel };
