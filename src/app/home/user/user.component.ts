import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../../shared/state/user.state';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {
  ExitApplication,
  ListenForLogin,
  ListenForLogout,
  RequestLogin,
  RequestLogout,
  StopListeningForLogin,
  StopListeningForLogout
} from '../../shared/state/user.actions';
import {FormControl} from '@angular/forms';
import {isNewLine} from '@angular/compiler/src/chars';
import {LogMessage} from '../../shared/models/log-message.model';
import {TriggerNewLogMessage} from '../../shared/state/log.actions';
import {UpdateSelectedSmartItem} from '../../shared/state/selectedSmartItem.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  nameFormControl = new FormControl('');
  @Select(UserState.loggedInUser)
  loggedInUser$: Observable<User> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([new ListenForLogin(), new ListenForLogout()]);
  }

  ngOnDestroy(): void {
    this.store.dispatch([new StopListeningForLogin(), new StopListeningForLogout()]);
  }

  requestLogin(): void {
    if  (this.nameFormControl.value) {
      const user: User = { name: this.nameFormControl.value };
      this.store.dispatch(new RequestLogin(user));
    }
  }
}
