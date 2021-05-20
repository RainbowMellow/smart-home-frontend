import {Category} from '../models/category.model';

export interface CreateSmartItemDto {
  name: string;
  category?: Category;
  xPos: number;
  yPos: number;
}
