import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task, TaskPage } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private apiUrl = 'http://localhost:8080/task'; 

  constructor(
    private http: HttpClient) { }

  getTasks(page: number, pageSize: number, sort: string, order: string, title?: string): Observable<TaskPage> {
    title = title != null ? '&title=' + title : '';
    return this.http.get<TaskPage>(this.apiUrl + '?page=' + page + '&size=' + pageSize + '&sort=' + sort + ',' + order + title)
      .pipe(
        catchError(this.handleError<TaskPage>('getTasks'))
      );
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.apiUrl + '/' + id)
    .pipe(
      catchError(this.handleError<Task>('getTask'))
    );
  }

  addTask(taskTitle: string) {
    this.http.post(this.apiUrl, {title: taskTitle})   
    .pipe(
      catchError(this.handleError<Task>('addTask'))
    ).subscribe();
  }

  editTask(id: number, taskTitle: string) {
    this.http.patch(this.apiUrl + '/' + id, {title: taskTitle})   
    .pipe(
      catchError(this.handleError<Task>('editTask'))
    ).subscribe();
  }

  deleteTask(id: number): Observable<Object> {
    return this.http.delete(this.apiUrl + '/' + id)   
    .pipe(
      catchError(this.handleError<Task>('deleteTask'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}