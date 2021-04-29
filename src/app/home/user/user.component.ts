import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UserState} from '../../shared/state/user.state';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {ListenForLogin} from '../../shared/state/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @Select(UserState.loggedInUser)
  loggedInUser$: Observable<User> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new ListenForLogin());
  }

  ngOnDestroy(): void {
  }

}
