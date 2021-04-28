import {LogMessage} from '../models/log-message.model';

export class ListenForAllLogMessages {
  static readonly type = '[LogMessage] Listen for all log messages';
}

export class RequestAllLogMessages {
  static readonly type = '[LogMessage] Request all log messages';
}

export class ListenForNewLogMessage {
  static readonly type = '[LogMessage] Listen for new log message';
}

export class UpdateLogMessages {
  constructor(public logMessages: LogMessage[]) {
  }

  static readonly type = '[LogMessage] Update collection of log messages';
}

export class StopListeningForAllLogMessages {
  static readonly type = '[LogMessage] Stop listening for all log messages';
}

export class StopListeningForNewLogMessage {
  static readonly type = '[LogMessage] Stop listening for new log message';
}
