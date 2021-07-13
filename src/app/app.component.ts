import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'

export interface Todo {
  title: string;
  completed: boolean;
  userId?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mytodos: Todo[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .subscribe(gettedtodos => {
        console.log('Ответ:', gettedtodos)
        this.mytodos = gettedtodos
      })
  }
}
