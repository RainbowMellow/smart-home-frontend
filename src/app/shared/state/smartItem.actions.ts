import {SmartItem} from '../models/smartItem.model';

export class ListenForSmartItems {
  static readonly type = '[SmartItem] Listen For SmartItems';
}

export class StopListeningForSmartItems {
  static readonly type = '[SmartItem] Stop Listening For SmartItems';
}

export class RequestSmartItems {
  static readonly type = '[SmartItem] Request SmartItems';
}

export class UpdateSmartItems {
constructor(public smartItems: SmartItem[]) {}
  static readonly type = '[SmartItem] Update SmartItems';
}

