import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {SmartItem} from '../../shared/models/smartItem.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {EditSmartItemDto} from '../../shared/dtos/editSmartItem.dto';
import {Select, Store} from '@ngxs/store';
import {
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

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  @Select(SelectedSmartItemState.selectedSmartItem)
  selectedSmartItem$: Observable<SmartItem> | undefined;
  selectedSmartItemId: number;

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
      on: ['']
    });

    this.selectedSmartItem$.subscribe((smartItem) => {
      if (smartItem) {
        this.selectedSmartItemId = smartItem.id;
        this.smartItemForm.patchValue(smartItem);
        this.smartItemForm.get('category').patchValue(smartItem.category.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(
      new StopListeningForAllCategories(),
      // stop ListenForSelectedSmartItem
    );
  }

  updateSmartItem(): void {
    const editDto: EditSmartItemDto = this.smartItemForm.value;
    editDto.id = this.selectedSmartItemId;
    this.store.dispatch(new EditSmartItem(editDto));
  }

  deleteSmartItem(): void {
    this.store.dispatch(new DeleteSmartItem(this.selectedSmartItemId));
  }

  toggleSmartItem(): void {
    const toggleDto: ToggleDto = {
      id: this.selectedSmartItemId,
      on: !this.smartItemForm.value.on
    };
    this.store.dispatch(new ToggleSmartItem(toggleDto));
  }
}
