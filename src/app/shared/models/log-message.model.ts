import {SmartItem} from './smartItem.model';

export interface LogMessage {
  id?: number;
  message: string;
  item: SmartItem;
  user: string;
  timeStamp: Date;
}
