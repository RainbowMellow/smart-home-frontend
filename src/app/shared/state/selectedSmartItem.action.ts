import {SmartItem} from '../models/smartItem.model';

export class ListenForSelectedSmartItem {
  static readonly type = '[SelectedSmartItem] Listen For Selected SmartItem';
}

export class UpdateSelectedSmartItem {
  constructor(public smartItem: SmartItem) {}
  static readonly type = '[SelectedSmartItem] Update Selected SmartItem';
}

export class UpdateSelectedSmartItemState {
  constructor(public smartItem: SmartItem) {}
  static readonly type = '[SelectedSmartItem] Update Selected State';
}

export class StopListeningForSelectedSmartItem {
  static readonly type = '[SelectedSmartItem] Stop Listening For Selected SmartItem';
}
