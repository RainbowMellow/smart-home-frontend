import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {SmartItem} from '../../shared/models/smartItem.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {EditSmartItemDto} from '../../shared/dtos/editSmartItem.dto';
import {Store} from '@ngxs/store';
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

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnChanges, OnDestroy {
  smartItemForm: FormGroup;
  categories = [
    { id: 1, name: 'Mock Category 1' },
    { id: 2, name: 'Mock Category 2' },
    { id: 3, name: 'Mock Category 3' },
  ];

  @Input() smartItem?: SmartItem;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch([
      new ListenForDeletedSmartItem(), // should maybe only be in home.component.ts?
      new ListenForEditedSmartItem(),
      new ListenForToggledSmartItem()
    ]);
    this.smartItemForm = this.fb.group({
      name: [''],
      category: this.fb.group({
        id: [''],
        name: ['']
      }),
      xPos: [''],
      yPos: [''],
      on: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.smartItemForm.patchValue(changes.smartItem.currentValue);
  }

  ngOnDestroy(): void {
    this.store.dispatch([
      new StopListeningForDeletedSmartItem(),
      new StopListeningForEditedSmartItem(),
      new StopListeningForToggledSmartItem()
    ]);
  }

  updateSmartItem(): void {
    // const editDto: EditSmartItemDto = this.smartItemForm.value;
    // editDto.id = this.smartItem.id;

    // this.store.dispatch(new ListenForEditSmartItem());
    // this.store.dispatch(new EditSmartItem(editDto));
    // console.warn(this.smartItemForm.value);
    this.smartItemForm.patchValue(this.smartItem); // ???
    const editDto: EditSmartItemDto = JSON.parse(JSON.stringify(this.smartItem));
    this.store.dispatch(new EditSmartItem(editDto));
  }

  deleteSmartItem(): void {
    this.store.dispatch(new DeleteSmartItem(this.smartItem.id));
  }

  toggleSmartItem(on: boolean): void {
    const toggleDto: ToggleDto = { id: this.smartItem.id, on};
    this.store.dispatch(new ToggleSmartItem(toggleDto));
  }

}
