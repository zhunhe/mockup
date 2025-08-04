import { Request, Response, NextFunction } from 'express';
import Todo from '../models/todo.model';
import { CreateTodoRequest, UpdateTodoRequest } from '../types/todo.types';

// MongoDB 문서를 JSON으로 변환하는 헬퍼 함수
const transformDocument = (doc: any) => {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    id: obj._id?.toString() || obj.id,
    title: obj.title,
    done: obj.done,
    createdAt: obj.createdAt
  };
};

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    const transformedTodos = todos.map(transformDocument);
    res.json(transformedTodos);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request<{}, {}, CreateTodoRequest>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todo = new Todo({ title: req.body.title });
    const saved = await todo.save();
    res.status(201).json(transformDocument(saved));
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.json(transformDocument(todo));
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request<{ id: string }, {}, UpdateTodoRequest>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, done: req.body.done },
      { new: true },
    );
    if (!updated) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.json(transformDocument(updated));
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
