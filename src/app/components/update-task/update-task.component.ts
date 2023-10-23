import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/task.model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  title: string;

  constructor(private taskService: TaskService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskService.getTask(this.route.snapshot.params['id']).subscribe((task: Task)=>{
      this.title = task.title;  
    });
  }

  editTask() {
    this.taskService.editTask(this.route.snapshot.params['id'], this.title.trim());
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
