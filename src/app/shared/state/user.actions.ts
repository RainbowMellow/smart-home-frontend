import {User} from '../models/user.model';

export class ListenForLogin {
  static readonly type = '[User] Listen for login';
}

export class RequestLogin {
  constructor(public user: User) {}

  static readonly type = '[User] Request login';
}

export class StopListeningForLogin {
  static readonly type = '[User] Stop listening for login';
}
