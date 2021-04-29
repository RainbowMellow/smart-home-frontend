import {SmartItem} from './smartItem.model';
import {User} from './user.model';

export interface LogMessage {
  id?: number;
  message: string;
  item: SmartItem;
  user?: User;
  timeStamp: Date;
}
