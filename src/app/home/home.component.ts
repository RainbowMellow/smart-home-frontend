import { Component, OnInit } from '@angular/core';
import {SmartItemState} from '../shared/state/smartItem.state';
import {Observable} from 'rxjs';
import {SmartItem} from '../shared/models/smartItem.model';
import {Select, Store} from '@ngxs/store';
import {ListenForSmartItems, RequestSmartItems} from '../shared/state/smartItem.actions';
import {SmartItemService} from '../shared/services/smart-item.service';
import {Category} from '../shared/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(SmartItemState.smartItems)
  smartItems$: Observable<SmartItem[]> | undefined;
  selectedSmartItem?: SmartItem;

  constructor(private store: Store,
              private service: SmartItemService) { }

  ngOnInit(): void {
    this.store.dispatch([new ListenForSmartItems(), new RequestSmartItems()]);
/*
    const cate: Category = {
      name: 'Lamp'
    };

    this.selectedSmartItem = {
      name: 'Lamp',
      category: cate,
      xPos: 2,
      yPos: 1,
      on: true
    };
    */

  }

  onSelect(smartItem: SmartItem): void {
    // smartItem.on = !smartItem.on;
    this.selectedSmartItem = smartItem;
    console.log('smartItem name: ' + smartItem.name);
  }

  toggle(): void {
    // tell backend (state) to toggle
    // by using selectedItem id and on bool to create toggleDto?
    /*
    const toggleSmartItemDto: updateSmartItemDto = {
      id: this.stock.id,
      on: !smartItem.on
    };

    this.smartItemService.update(SmartItemUpdateDto);
    */
  }
}
