import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../../shared/state/user.state';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {ListenForLogin, RequestLogin, StopListeningForLogin} from '../../shared/state/user.actions';
import {FormControl} from '@angular/forms';

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
    this.store.dispatch(new ListenForLogin());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopListeningForLogin());
  }

  requestLogin(): void {
    if  (this.nameFormControl.value) {
      const user: User = { name: this.nameFormControl.value };
      this.store.dispatch(new RequestLogin(user));
    }
  }
}
