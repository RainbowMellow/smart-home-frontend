import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {SmartItem} from '../../shared/models/smartItem.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {SelectedSmartItemState} from '../../shared/state/selectedSmartItem.state';
import {Observable} from 'rxjs';
import {ListenForSelectedSmartItem} from '../../shared/state/selectedSmartItem.action';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Select(SelectedSmartItemState.selectedSmartItem)
  selectedSmartItem$: Observable<SmartItem> | undefined;

  smartItemForm: FormGroup;
  categories = [
    { id: 1, name: 'Mock Category 1' },
    { id: 2, name: 'Mock Category 2' },
    { id: 3, name: 'Mock Category 3' },
  ];

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.smartItemForm = this.fb.group({
      name: [''],
      xPos: [''],
      yPos: [''],
    });

    this.store.dispatch(new ListenForSelectedSmartItem());

    this.selectedSmartItem$.subscribe((smartItem) => {
      console.log('form updated!!');
      this.smartItemForm.patchValue(smartItem);
    });
  }

  updateSmartItem(): void {
    // const editDto: EditSmartItemDto = this.smartItemForm.value;
    // editDto.id = this.smartItem.id;

    // this.store.dispatch(new ListenForEditSmartItem());
    // this.store.dispatch(new EditSmartItem(editDto));
    // console.warn(this.smartItemForm.value);
  }

  deleteSmartItem(): void {
    // this.store.dispatch(new ListenForDeletedSmartItem());
    // this.store.dispatch(new DeleteSmartItem(this.smartItem));
  }
}
