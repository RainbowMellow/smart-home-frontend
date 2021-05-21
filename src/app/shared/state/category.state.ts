import {Category} from '../models/category.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Subscription} from 'rxjs';
import {ListenForAllCategories, RequestAllCategories, StopListeningForAllCategories, UpdateCategories} from './category.actions';

export interface CategoryStateModel {
  categories: Category[];
}

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    categories: []
  }
})

@Injectable()
export class CategoryState {

  private allCategoriesUnsub: Subscription | undefined;

  constructor(private categoryService: CategoryService) {}

  @Selector()
  static categories(state: CategoryStateModel): Category[] {
    return state.categories;
  }

  @Action(RequestAllCategories)
  requestAllCategories(): void {
    this.categoryService.requestAllCategories();
  }

  @Action(ListenForAllCategories)
  listenForAllCategories(ctx: StateContext<CategoryStateModel>): void {
    this.allCategoriesUnsub = this.categoryService.listenForAllCategories()
      .subscribe(categories => {
        ctx.dispatch(new UpdateCategories(categories));
      });
  }

  @Action(UpdateCategories)
  updateCategories(ctx: StateContext<CategoryStateModel>, action: UpdateCategories): void {
    const state = ctx.getState();
    const newState: CategoryStateModel = {
      ...state,
      categories: action.categories
    };
    ctx.setState(newState);
  }

  @Action(StopListeningForAllCategories)
  stopListeningForAllCategories(): void {
    if (this.allCategoriesUnsub) {
      this.allCategoriesUnsub.unsubscribe();
    }
  }
}
