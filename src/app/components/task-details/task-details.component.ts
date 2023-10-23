import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TaskService } from '../../task.service';
import { Task } from '../../task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  task?: Task;
  constructor(private location: Location, private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTask(this.route.snapshot.params['id']).subscribe((task: Task)=>{
      this.task = task;  
    });
  }

  goBack(): void {
    this.location.back();
  }
}
