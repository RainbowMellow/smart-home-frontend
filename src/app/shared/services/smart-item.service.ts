import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {SmartItem} from '../models/smartItem.model';
import {EditSmartItemDto} from '../../home/detail/dtos/editSmartItem.dto';

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
  }

  deleteSmartItem(id: number): void
  {
    this.socket.emit('deleteSmartItem', id);
  }

  listenForDeleteSmartItem(): Observable<SmartItem> {
    return this.socket.fromEvent<SmartItem>('deletedSmartItem');
  }

  editSmartItem(editDTO: EditSmartItemDto): void
  {
    this.socket.emit('editSmartItem', editDTO);
  }

  listenForEditSmartItem(): Observable<SmartItem[]>
  {
    return this.socket.fromEvent<SmartItem[]>('editedSmartItem');
  }
}
