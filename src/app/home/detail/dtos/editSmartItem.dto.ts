import {Category} from '../../../shared/models/category.model';

export interface EditSmartItemDto {
  id: number;
  name: string;
  category?: Category;
  xPos: number;
  yPos: number;
}
