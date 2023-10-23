import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  title: string;

  constructor(private taskService: TaskService, private location: Location) { }

  addTask() {
    this.taskService.addTask(this.title.trim());
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
