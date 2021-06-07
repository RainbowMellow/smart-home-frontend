import {Category} from '../models/category.model';

export interface EditSmartItemDto {
  id: number;
  name: string;
  category: Category;
  xPos: number;
  yPos: number;
  userName?: string;
}
