import {Component, Input, OnInit} from '@angular/core';
import {SmartItem} from '../../shared/models/smartItem.model';
import {FormControl} from '@angular/forms';
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
  nameDetail = new FormControl('');
  typeDetail = new FormControl('');
  xPosDetail = new FormControl('');
  yPosDetail = new FormControl('');

  @Input() selectedSmartItem: SmartItem | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    if (this.selectedSmartItem.name) {
      this.insertInfo();
    }
  }

  insertInfo(): void {
    this.nameDetail.setValue(this.selectedSmartItem.name);
    this.typeDetail.setValue(this.selectedSmartItem.category.name);
    this.xPosDetail.setValue(this.selectedSmartItem.xPos);
    this.yPosDetail.setValue(this.selectedSmartItem.yPos);
  }

  saveSmartItem(): void {
    const editDto: EditSmartItemDto = {
      id: this.selectedSmartItem.id,
      name: this.nameDetail.value,
      xPos: this.xPosDetail.value,
      yPos: this.yPosDetail.value
    };

    this.store.dispatch(new ListenForEditSmartItem());
    this.store.dispatch(new EditSmartItem(editDto));
  }

  deleteSmartItem(): void {
    this.store.dispatch(new ListenForDeletedSmartItem());
    this.store.dispatch(new DeleteSmartItem(this.selectedSmartItem.id));
  }
}
