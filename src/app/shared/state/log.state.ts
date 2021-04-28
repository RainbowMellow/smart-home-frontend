import {LogMessage} from '../models/log-message.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {LogService} from '../services/log.service';
import {
  ListenForAllLogMessages,
  ListenForNewLogMessage, RequestAllLogMessages,
  StopListeningForAllLogMessages,
  StopListeningForNewLogMessage,
  UpdateLogMessages
} from './log.actions';

export interface LogMessageStateModel {
  logMessages: LogMessage[];
}

@State<LogMessageStateModel>({
  name: 'log',
  defaults: {
    logMessages: []
  }
})

@Injectable()
export class LogMessageState {

  private allLogMessagesUnsub: Subscription | undefined;
  private newLogMessageUnsub: Subscription | undefined;

  constructor(private logService: LogService) {
  }

  @Selector()
  static logMessages(state: LogMessageStateModel): LogMessage[] {
    return state.logMessages;
  }

  @Action(ListenForAllLogMessages)
  ListenForAllLogMessages(ctx: StateContext<LogMessageStateModel>): void {
    this.allLogMessagesUnsub = this.logService.listenForAllLogMessages()
      .subscribe(messages => {
        ctx.dispatch(new UpdateLogMessages(messages));
      });
  }

  @Action(RequestAllLogMessages)
  RequestAllLogMessages(): void {
    this.logService.requestAllLogMessages();
  }

  @Action(ListenForNewLogMessage)
  ListenForNewLogMessage(ctx: StateContext<LogMessageStateModel>): void {
    this.newLogMessageUnsub = this.logService.listenForNewLogMessage()
      .subscribe(message => {
        const state = ctx.getState();
        const messages = [...state.logMessages];
        messages.push(message);
        ctx.dispatch(new UpdateLogMessages(messages));
      });
  }

  @Action(UpdateLogMessages)
  UpdateLogMessages(ctx: StateContext<LogMessageStateModel>, updatedMessages): void {
    const state = ctx.getState();
    const newState: LogMessageStateModel = {
      ...state,
      logMessages: updatedMessages
    };
    ctx.setState(newState);
  }

  @Action(StopListeningForAllLogMessages)
  StopListeningForAllLogMessages(): void {
    if (this.allLogMessagesUnsub) {
      this.allLogMessagesUnsub.unsubscribe();
    }
  }

  @Action(StopListeningForNewLogMessage)
  StopListeningForNewLogMessage(): void {
    if (this.allLogMessagesUnsub) {
      this.allLogMessagesUnsub.unsubscribe();
    }
  }

}


