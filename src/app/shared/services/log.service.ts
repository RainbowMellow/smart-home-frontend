import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {LogMessage} from '../models/log-message.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private socket: Socket) { }

  listenForAllLogMessages(): Observable<LogMessage[]> {
    return this.socket.fromEvent<LogMessage[]>('allLogMessages');
  }

  listenForNewLogMessage(): Observable<LogMessage> {
    return this.socket.fromEvent<LogMessage>('newLogMessage');
  }

  requestAllLogMessages(): void {
    this.socket.emit('requestLog');
  }

  triggerLogMessage(logMessage: LogMessage): void {
    this.socket.emit('triggerLogMessage', logMessage);
  }
}
