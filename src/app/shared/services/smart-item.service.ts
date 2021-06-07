import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {SmartItem} from '../models/smartItem.model';
import {EditSmartItemDto} from '../dtos/editSmartItem.dto';
import {CreateSmartItemDto} from '../dtos/createSmartItem.dto';
import {ToggleDto} from '../dtos/toggle.dto';
import {DeleteSmartItemDto} from '../dtos/deleteSmartItem.dto';

@Injectable({
  providedIn: 'root'
})
export class SmartItemService {

  constructor(private socket: Socket) { }

  listenForAllSmartItems(): Observable<SmartItem[]> {
    return this.socket.fromEvent<SmartItem[]>('smartItems');
  }

  requestAllSmartItems(): void {
    this.socket.emit('requestSmartItems');
  }

  deleteSmartItem(deleteDto: DeleteSmartItemDto): void {
    this.socket.emit('deleteSmartItem', deleteDto);
  }

  listenForDeletedSmartItem(): Observable<number> {
    return this.socket.fromEvent<number>('deletedSmartItem');
  }

  editSmartItem(editDto: EditSmartItemDto): void {
    this.socket.emit('editSmartItem', editDto);
  }

  listenForEditedSmartItem(): Observable<SmartItem> {
    return this.socket.fromEvent<SmartItem>('editedSmartItem');
  }

  createSmartItem(createDto: CreateSmartItemDto): void {
    this.socket.emit('createSmartItem', createDto);
  }

  listenForCreatedSmartItem(): Observable<SmartItem> {
    return this.socket.fromEvent<SmartItem>('createdSmartItem');
  }

  toggleSmartItem(toggleDto: ToggleDto): void {
    this.socket.emit('toggleSmartItem', toggleDto);
  }

  listenForToggledSmartItem(): Observable<ToggleDto> {
    return this.socket.fromEvent<ToggleDto>('toggledSmartItem');
  }

}
