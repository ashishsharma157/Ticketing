import mongoose from "mongoose";
import { Password } from '../Services/password';

interface UserAttrs {
  email: string;
  password: string;
}

// User model interface
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  _id: mongoose.Types.ObjectId;
  __v: number;
}

// Utility type for transformed user object in toJSON
type UserDocWithTransformed = Omit<UserDoc, '_id' | 'password' | '__v'> & {
  id: string;
  password?: string;
  __v?: number;
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    }
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id.toString(); // `toString()` for `id` as it's now a string
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };