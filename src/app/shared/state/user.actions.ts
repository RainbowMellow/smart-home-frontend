import {User} from '../models/user.model';

export class ListenForLogin {
  static readonly type = '[User] Listen for login';
}

export class RequestLogin {
  constructor(public user: User) {}

  static readonly type = '[User] Request login';
}

export class ListenForLogout {
  static readonly type = '[User] Listen for logout';
}

export class RequestLogout {
  static readonly type = '[User] Request logout';
}

export class ExitApplication {
  static readonly type = '[User] Exit application';
}

export class StopListeningForLogin {
  static readonly type = '[User] Stop listening for login';
}

export class StopListeningForLogout {
  static readonly type = '[User] Stop listening for logout';
}
