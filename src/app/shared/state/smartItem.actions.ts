import {SmartItem} from '../models/smartItem.model';
import {EditSmartItemDto} from '../../home/detail/dtos/editSmartItem.dto';

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

export class DeleteSmartItem {
  constructor(public id: number) {}
  static readonly type = '[SmartItem] Delete SmartItem';
}

export class ListenForDeletedSmartItem {
  static readonly type = '[SmartItem] Listen For Deleted SmartItem';
}

export class EditSmartItem {
  constructor(public editDTO: EditSmartItemDto) {}
  static readonly type = '[SmartItem] Edit SmartItem';
}

export class ListenForEditSmartItem {
  static readonly type = '[SmartItem] Listen For Edit SmartItem';
}
