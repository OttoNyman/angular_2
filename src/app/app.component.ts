import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'

import { delay } from 'rxjs/operators'
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mytodos: Todo[] = [];
  todoTitle = ''
  loading: boolean = false
  error = ''

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.fetchTodos()
  }

  addTodo() {
    this.todosService.addTodo({
      title: this.todoTitle,
      completed: false
    }).subscribe(respTodo => {
      this.mytodos.push(respTodo)
      this.todoTitle = ''
    })
  }

  fetchTodos() {
    this.loading = true
    this.todosService.fetchTodos()
      .subscribe(gettedtodos => {
        this.mytodos = gettedtodos
        this.loading = false
      }, error => { this.error = error.message })
  }

  delItem(id: any) {
    this.todosService.removeTodo(id)
      .subscribe(() => this.mytodos = this.mytodos.filter(t => t.id !== id)
      )
  }

  completeTodo(id: number) {
    this.todosService.finishTodo(id).subscribe(todo => {
      this.mytodos.find(t => t.id === todo.id).completed = true
    })
  }

}
