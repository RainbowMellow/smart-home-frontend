import {SmartItem} from '../models/smartItem.model';


export class UpdateSelectedSmartItemState {
  constructor(public smartItem: SmartItem) {}
  static readonly type = '[SelectedSmartItem] Update Selected State';
}
