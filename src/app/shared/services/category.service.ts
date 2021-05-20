import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private socket: Socket) { }

  requestAllCategories(): void {
    this.socket.emit('getAllCategories');
  }

  listenForAllCategories(): Observable<Category[]> {
    return this.socket.fromEvent<Category[]>('categories');
  }
}
