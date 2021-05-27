import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {SmartItem} from '../../shared/models/smartItem.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {EditSmartItemDto} from '../../shared/dtos/editSmartItem.dto';
import {Select, Store} from '@ngxs/store';
import {
  CreateSmartItem,
  DeleteSmartItem,
  EditSmartItem,
  ListenForDeletedSmartItem,
  ListenForEditedSmartItem,
  ListenForToggledSmartItem,
  StopListeningForDeletedSmartItem,
  StopListeningForEditedSmartItem,
  StopListeningForToggledSmartItem,
  ToggleSmartItem
} from '../../shared/state/smartItem.actions';
import {ToggleDto} from '../../shared/dtos/toggle.dto';
import {CategoryState} from '../../shared/state/category.state';
import {Observable} from 'rxjs';
import {ListenForAllCategories, RequestAllCategories, StopListeningForAllCategories} from '../../shared/state/category.actions';
import {SelectedSmartItemState} from '../../shared/state/selectedSmartItem.state';
import {ListenForSelectedSmartItem} from '../../shared/state/selectedSmartItem.action';
import {CreateSmartItemDto} from '../../shared/dtos/createSmartItem.dto';
import {HomeComponent} from '../home.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  @Select(CategoryState.categories)
  categories$: Observable<Category[]> | undefined;

  smartItemForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([
      new ListenForAllCategories(),
      new RequestAllCategories(),
      new ListenForSelectedSmartItem()
    ]);

    this.smartItemForm = this.fb.group({
      name: [''],
      category: {
        id: [''],
        name: ['']
      },
      xPos: [''],
      yPos: [''],
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      new StopListeningForAllCategories(),
      // stop ListenForSelectedSmartItem
    );
  }

  createSmartItem(): void {
    const createDto: CreateSmartItemDto = this.smartItemForm.value;
    this.store.dispatch(new CreateSmartItem(createDto));
    this.smartItemForm.reset();
  }
}
