import { Todo } from '../types/index.js';

export class TodoStore {
  private todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  create(todo: Todo): Todo {
    this.todos.push(todo);
    return todo;
  }

  update(id: string, updates: Partial<Todo>): Todo | null {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    this.todos[index] = { ...this.todos[index], ...updates };
    return this.todos[index];
  }

  delete(id: string): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    
    this.todos.splice(index, 1);
    return true;
  }
}

export const todoStore = new TodoStore();