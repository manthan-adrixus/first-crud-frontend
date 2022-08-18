import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  insertData(data: any) {
    return this.http
      .post(environment.SOCKET_ENDPOINT + 'insertTodo', data)
      .pipe();
  }

  getTodoList() {
    return this.http.get(environment.SOCKET_ENDPOINT + 'getTodoList').pipe();
  }

  deleteTodo(id: any) {
    return this.http
      .post(environment.SOCKET_ENDPOINT + 'deleteTodo', id)
      .pipe();
  }

  updateTodo(data: any) {
    return this.http
      .post(environment.SOCKET_ENDPOINT + 'updateTodo', data)
      .pipe();
  }
}
