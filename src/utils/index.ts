import { ValidationError } from '../types/index.js';

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function validateTitle(title: any): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (!title) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (typeof title !== 'string') {
    errors.push({ field: 'title', message: 'Title must be a string' });
  } else if (title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title cannot be empty' });
  }
  
  return errors;
}