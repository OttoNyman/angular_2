import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

export interface Todo {
  title: string;
  completed: boolean;
  id?: any
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
  }

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .pipe(delay(500),
        catchError(error => {
          console.log(error.message)
          return throwError(error)
        }))
  }

  removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }

  finishTodo(id: number): Observable<Todo> {
    return this.http.put<Todo>
      (`https://jsonplaceholder.typicode.com/todos/${id}`,
        { complited: true })

  }
}
