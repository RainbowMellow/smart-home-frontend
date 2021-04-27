import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {SmartItem} from '../models/smartItem.model';

@Injectable({
  providedIn: 'root'
})
export class SmartItemService {

  constructor(private socket: Socket) { }

  listenForAllSmartItems(): Observable<SmartItem[]>
  {
    return this.socket.fromEvent<SmartItem[]>('smartItems');
  }

  requestAllSmartItems(): void
  {
    this.socket.emit('requestSmartItems');
    console.log('Items have been requested');
  }
}
