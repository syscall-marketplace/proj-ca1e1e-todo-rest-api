import { Request, Response } from 'express';
import { ApiResponse, Todo } from '../types/index.js';
import { todoStore } from '../storage/index.js';
import { generateId, validateTitle } from '../utils/index.js';

export function createTodo(req: Request, res: Response): void {
  const { title } = req.body;

  const errors = validateTitle(title);
  if (errors.length > 0) {
    const response: ApiResponse = {
      success: false,
      error: errors.map(e => e.message).join(', '),
    };
    res.status(400).json(response);
    return;
  }

  const todo: Todo = {
    id: generateId(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };

  todoStore.create(todo);

  const response: ApiResponse<Todo> = {
    success: true,
    data: todo,
  };
  res.status(201).json(response);
}

export function getAllTodos(_req: Request, res: Response): void {
  const todos = todoStore.findAll();

  const response: ApiResponse<Todo[]> = {
    success: true,
    data: todos,
  };
  res.status(200).json(response);
}

export function getTodoById(req: Request, res: Response): void {
  const { id } = req.params;
  const todo = todoStore.findById(id);

  if (!todo) {
    const response: ApiResponse = {
      success: false,
      error: `Todo with id '${id}' not found`,
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse<Todo> = {
    success: true,
    data: todo,
  };
  res.status(200).json(response);
}

export function updateTodo(req: Request, res: Response): void {
  const { id } = req.params;
  const { title, completed } = req.body;

  const existing = todoStore.findById(id);
  if (!existing) {
    const response: ApiResponse = {
      success: false,
      error: `Todo with id '${id}' not found`,
    };
    res.status(404).json(response);
    return;
  }

  if (title !== undefined) {
    const errors = validateTitle(title);
    if (errors.length > 0) {
      const response: ApiResponse = {
        success: false,
        error: errors.map(e => e.message).join(', '),
      };
      res.status(400).json(response);
      return;
    }
  }

  const updates: Partial<Todo> = {};
  if (title !== undefined) updates.title = title.trim();
  if (completed !== undefined) updates.completed = Boolean(completed);

  const updated = todoStore.update(id, updates);

  const response: ApiResponse<Todo> = {
    success: true,
    data: updated!,
  };
  res.status(200).json(response);
}

export function deleteTodo(req: Request, res: Response): void {
  const { id } = req.params;

  const deleted = todoStore.delete(id);
  if (!deleted) {
    const response: ApiResponse = {
      success: false,
      error: `Todo with id '${id}' not found`,
    };
    res.status(404).json(response);
    return;
  }

  const response: ApiResponse = {
    success: true,
  };
  res.status(200).json(response);
}
