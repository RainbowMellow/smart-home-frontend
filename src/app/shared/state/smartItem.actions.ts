import {SmartItem} from '../models/smartItem.model';
import {EditSmartItemDto} from '../dtos/editSmartItem.dto';
import {CreateSmartItemDto} from '../dtos/createSmartItem.dto';
import {ToggleDto} from '../dtos/toggle.dto';

export class ListenForAllSmartItems {
  static readonly type = '[SmartItem] Listen For SmartItems';
}

export class StopListeningForAllSmartItems {
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

export class StopListeningForDeletedSmartItem {
  static readonly type = '[SmartItem] Stop listening for deleted SmartItem';
}

export class EditSmartItem {
  constructor(public editDto: EditSmartItemDto) {}
  static readonly type = '[SmartItem] Edit SmartItem';
}

export class ListenForEditedSmartItem {
  static readonly type = '[SmartItem] Listen For Edit SmartItem';
}

export class StopListeningForEditedSmartItem {
  static readonly type = '[SmartItem] Stop listening for edited SmartItem';
}

export class CreateSmartItem {
  constructor(public createDto: CreateSmartItemDto) {}
  static readonly type = '[SmartItem] Create SmartItem';
}

export class ListenForNewSmartItem {
  static readonly type = '[SmartItem] Listen for new SmartItem';
}

export class StopListeningForNewSmartItem {
  static readonly type = '[SmartItem] Stop listening for new SmartItem';
}

export class ToggleSmartItem {
  constructor(public toggleDto: ToggleDto) {}
  static readonly type = '[SmartItem] Toggle SmartItem';
}

export class ListenForToggledSmartItem {
  static readonly type = '[SmartItem] Listen for toggled SmartItem';
}

export class StopListeningForToggledSmartItem {
  static readonly type = '[SmartItem] Stop listening for toggled SmartItem';
}
