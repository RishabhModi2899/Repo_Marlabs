import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = {
    title: '',
    description: ''
  };

  constructor (private TodoService: TodoService) { }

  ngOnInit(): void {
      this.getTodos();
  }

  getTodos(): void {
    this.TodoService.getTodos().subscribe(
      (data: Todo[]) => this.todos = data,
      (err) => console.error(err)
    );
  }

  addTodo(): void {
    if (this.newTodo.title && this.newTodo.description) {
      this.TodoService.addTodo(this.newTodo).subscribe(
        (todo: Todo) => {
          this.todos.push(todo);
          this.newTodo = { title: '', description: '' };
        },
        (err) => console.error(err)
      );
    }
  }

  deleteTodo(id: string | undefined): void {
    if (id) {
      this.TodoService.deleteTodo(id).subscribe(
        () => this.todos = this.todos.filter(todo => todo._id !== id),
        (err) => console.error(err)
      );
    }
  }
}
