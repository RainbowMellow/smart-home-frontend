import {Category} from '../models/category.model';

export class RequestAllCategories {
  static readonly type = '[Category] Request all categories';
}

export class ListenForAllCategories {
  static readonly type = '[Category] Listen for all categories';
}

export class UpdateCategories {
  constructor(public categories: Category[]) {}

  static readonly type = '[Category] Update categories';
}

export class StopListeningForAllCategories {
  static readonly type = '[Category] Stop listening for all categories';
}
