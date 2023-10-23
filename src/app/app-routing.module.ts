import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';

const routes: Routes = [
  { path: '', component: TasksListComponent },
  { path: 'update/:id', component: UpdateTaskComponent },
  { path: 'details/:id', component: TaskDetailsComponent },
  { path: 'add', component: AddTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
