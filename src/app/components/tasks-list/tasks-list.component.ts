import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, tap } from 'rxjs';
import { Task } from 'src/app/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Task>;
  tasks: Task[];
  currentPage = 0;
  pageSize = 5;
  totalRows = 0;
  displayedColumns = ['title', 'createdAt', 'updatedAt', 'actions'];
  pageOptions = [5, 10, 25, 100];
  searchTerm: string;
  
  constructor(private taskService: TaskService) {}
  
  ngAfterViewInit() {
    this.fetchTasks(this.sort.active, this.sort.direction);

    this.sort.sortChange.subscribe(() => this.currentPage = 0);
    merge(this.sort.sortChange, this.paginator.page)
          .pipe(
              tap(() => this.fetchTasks(this.sort.active, this.sort.direction))
          )
          .subscribe();
  }

  fetchTasks(sortBy: string, order: string, title?: string) {
    this.taskService.getTasks(this.currentPage, this.pageSize, sortBy, order, title).subscribe(taskPage => {
      this.dataSource = new MatTableDataSource(taskPage.content);
      this.totalRows = taskPage.totalElements;
     });
  }

  filterTasks() {
    this.currentPage = 0;
    this.fetchTasks(this.sort.active, this.sort.direction, this.searchTerm.trim());
  }

  delete(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(result=>
      this.fetchTasks(this.sort.active, this.sort.direction)
    );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

}


