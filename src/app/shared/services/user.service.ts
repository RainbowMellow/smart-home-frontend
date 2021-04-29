import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser: User;

  constructor(private socket: Socket) {}

  listenForLogin(): Observable<User> {
    return this.socket.fromEvent<User>('loggedIn');
  }

  requestLogin(user: User): void {
    this.socket.emit('requestLogin', user);
  }
}
