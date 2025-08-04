import mongoose, { Schema } from 'mongoose';
import { ITodo } from '../types/todo.types';

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true, trim: true },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => Date.now() },
}, {
  toJSON: {
    transform: function(doc: any, ret: any) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    transform: function(doc: any, ret: any) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export default mongoose.model<ITodo>('Todo', todoSchema);
