import {SmartItem} from './smartItem.model';

export interface LogMessage {
  id?: number;
  message: string;
  item?: SmartItem;
  userString?: string;
  timeStamp: Date;
}
