import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogMessage} from '../../shared/models/log-message.model';
import {Select, Store} from '@ngxs/store';
import {
  ListenForAllLogMessages,
  ListenForNewLogMessage,
  StopListeningForAllLogMessages,
  StopListeningForNewLogMessage
} from '../../shared/state/log.actions';
import {LogMessageState} from '../../shared/state/log.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, OnDestroy {

  @Select(LogMessageState.logMessages)
  logMessages$: Observable<LogMessage[]> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([
      new ListenForAllLogMessages(),
      new StopListeningForAllLogMessages(),
      new ListenForNewLogMessage()
      ]
      );
  }

  ngOnDestroy(): void {
    this.store.dispatch([new StopListeningForNewLogMessage()]);
  }

}
