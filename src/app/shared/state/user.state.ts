import {User} from '../models/user.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';
import {ListenForLogin, RequestLogin, StopListeningForLogin} from './user.actions';

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

  constructor(private userService: UserService) {
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
      });
  }

  @Action(RequestLogin)
  requestLogin(action: RequestLogin): void {
    this.userService.requestLogin(action.user);
  }

  @Action(StopListeningForLogin)
  stopListeningForLogin(): void {
    if (this.loginUnsub) {
      this.loginUnsub.unsubscribe();
    }
  }
}

