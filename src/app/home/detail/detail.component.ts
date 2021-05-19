import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {SmartItem} from '../../shared/models/smartItem.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {EditSmartItemDto} from './dtos/editSmartItem.dto';
import {Store} from '@ngxs/store';
import {DeleteSmartItem, EditSmartItem, ListenForDeletedSmartItem, ListenForEditSmartItem} from '../../shared/state/smartItem.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  smartItemForm: FormGroup;

  @Input() smartItem?: SmartItem;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
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

  updateSmartItem(): void {
    // const editDto: EditSmartItemDto = this.smartItemForm.value;
    // editDto.id = this.smartItem.id;

    // this.store.dispatch(new ListenForEditSmartItem());
    // this.store.dispatch(new EditSmartItem(editDto));
    // console.warn(this.smartItemForm.value);
    this.smartItemForm.patchValue(this.smartItem);
  }

  deleteSmartItem(): void {
    // this.store.dispatch(new ListenForDeletedSmartItem());
    this.store.dispatch(new DeleteSmartItem(this.smartItem));
  }
}
