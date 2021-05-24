import {User} from '../models/user.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';
import {
  ExitApplication,
  ListenForLogin,
  ListenForLogout,
  RequestLogin,
  RequestLogout,
  StopListeningForLogin,
  StopListeningForLogout
} from './user.actions';
import {LogService} from '../services/log.service';
import {LogMessage} from '../models/log-message.model';

export interface UserStateModel {
  loggedInUser: User;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    loggedInUser: undefined
  }
})

@Injectable()
export class UserState {
  private loginUnsub: Subscription | undefined;
  private logoutUnsub: Subscription | undefined;

  constructor(private userService: UserService,
              private logService: LogService) {
  }

  @Selector()
  static loggedInUser(state: UserStateModel): User {
    return state.loggedInUser;
  }

  @Action(ListenForLogin)
  listenForLogin(ctx: StateContext<UserStateModel>): void {
    this.loginUnsub = this.userService.listenForLogin()
      .subscribe(user => {
        const state = ctx.getState();
        const newState: UserStateModel = {
          ...state,
          loggedInUser: user
        };
        ctx.setState(newState);
        this.logService.triggerLogMessage({
          userString: user.name,
          message: 'User has logged in',
          timeStamp: new Date()});
      });
  }

  @Action(RequestLogin)
  requestLogin(ctx: StateContext<UserStateModel>, action: RequestLogin): void {
    const user: User = action.user;
    this.userService.requestLogin(user);
  }

  @Action(StopListeningForLogin)
  stopListeningForLogin(): void {
    if (this.loginUnsub) {
      this.loginUnsub.unsubscribe();
    }
  }

  @Action(ListenForLogout)
  listenForLogout(ctx: StateContext<UserStateModel>): void {
    this.logoutUnsub = this.userService.listenForLogout()
      .subscribe(user => {
        const state = ctx.getState();
        const newState: UserStateModel = {
          ...state,
          loggedInUser: null
        };
        ctx.setState(newState);
        this.logService.triggerLogMessage({
          userString: user.name,
          message: 'User has logged out',
          timeStamp: new Date()});
      });
  }

  @Action(RequestLogout)
  requestLogout(ctx: StateContext<UserStateModel>): void {
    const user: User = ctx.getState().loggedInUser;
    if (user) {
      this.userService.requestLogout(user);
    }
  }

  @Action(StopListeningForLogout)
  stopListeningForLogout(): void {
    if (this.logoutUnsub) {
      this.logoutUnsub.unsubscribe();
    }
  }

  @Action(ExitApplication) // doesn't seem to work when called from ngOnDestroy?
  exitApplication(ctx: StateContext<UserStateModel>): void {
      const msg: LogMessage = {
        userString: 'none', // use loggedInUser later, and add call to backend to logout user
        message: 'User has exited application',
        timeStamp: new Date()};
      this.logService.triggerLogMessage(msg);
  }
}

