import { Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  done: boolean;
  createdAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  done?: boolean;
}

export interface UpdateTodoRequest {
  title?: string;
  done?: boolean;
}
