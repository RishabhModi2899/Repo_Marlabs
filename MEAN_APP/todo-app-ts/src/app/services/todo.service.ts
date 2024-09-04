import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo {
  _id?: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUri = 'http://localhost:5000/todos';
  
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUri);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUri, todo);
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUri}/${id}`);
  }
}
