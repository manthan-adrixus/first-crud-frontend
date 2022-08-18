import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'socketio-angular';

  updateRow: boolean = false;
  updateId: any = '';

  updateForm: FormGroup;

  ngOnInit() {
    this.getTodoList();
  }

  constructor(public apiService: ApiService, public fb: FormBuilder) {
    this.updateForm = this.fb.group({
      taskName: [''],
      taskDate: [''],
    });
  }

  todoData: any = {
    taskName: '',
    taskDate: '',
  };

  submit() {
    this.apiService.insertData(this.todoData).subscribe((res: any) => {
      this.updateRow = false;
      this.getTodoList();
    });
  }

  todoList: any = [];

  getTodoList() {
    this.apiService.getTodoList().subscribe((res1: any) => {
      if (res1.success) {
        this.todoList = res1.data;
      }
    });
  }

  deleteTodo(id: any) {
    let data = {
      id: id,
    };
    this.apiService.deleteTodo(data).subscribe((res: any) => {
      this.updateRow = false;
      this.getTodoList();
    });
  }

  editTodo(id: any, action: any) {
    this.todoList.filter((e: any) => {
      if (e._id == id && action == 'edit') {
        var date = new Date(e.taskDate);

        this.updateForm.setValue({
          taskName: e.taskName,
          taskDate:
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1).toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) +
            '-' +
            date.getDate(),
        });
        e.isUpdate = true;
      } else {
        e.isUpdate = false;
      }
    });
  }

  updateTodo(e: any) {
    let data = {
      id: e._id,
      taskName: this.updateForm.value.taskName,
      taskDate: this.updateForm.value.taskDate,
    };

    this.apiService.updateTodo(data).subscribe((res: any) => {
      this.getTodoList();
    });
  }
}
