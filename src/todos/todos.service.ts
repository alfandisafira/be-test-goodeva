import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  private todos = [
    {
      id: 1,
      title: "Balikin buku",
      status: "complete",
      problem_desc: null,
    },
    {
      id: 2,
      title: "Beli kopi",
      status: "on_going",
      problem_desc: null,
    }
  ]

  find(search?: string) {
    if (search) {
      return this.todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()))
    }
    
    return this.todos;
  }

  create(todo: { title: string }) {
    let indexLastTodo = this.todos.length - 1;

    let newId = this.todos[indexLastTodo].id;

    let newTodo = {
      id: ++newId,
      title: todo.title,
      status: 'created',
      problem_desc: null,
    }

    this.todos.push(newTodo);

    return this.todos;
  }

  update(id: string, todo: { title: string, status: string, problem_desc: string }) {
    const updatedTodos = this.todos.map(t => {
      if (t.id === Number(id)) return { id: t.id, ...todo };      
      return t;
    });

    return updatedTodos;
  }
}
