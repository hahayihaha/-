import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  public ID: number;
  public baodanList;
  UserID;

  constructor(
    private info: ActivatedRoute,
    public http: HttpClient
  ) {
    this.ID = info.snapshot.params['id'];
  }

  ngOnInit() {
    this.http.get(localStorage['http'] + '/Action/BaoDans/GetBaoDan/' + this.ID).subscribe( response => {
      this.baodanList = response;
      if(this.baodanList.length !== 0){
        this.UserID = this.baodanList[0]['UserID']
      }
    })
  }

  getTimes(times){
    if(isNullOrUndefined(times)){
      return '';
    }
    return times.split('T')[0] + '-' + times.split('T')[1].split('.')[0];
  }

  //审核
  Toexamine(ID, state, i){
    this.http.post(localStorage['http'] + '/Action/BaoDans/Review/' + ID + '?state=' + state, {}).subscribe( response => {
      if (response){
        alert( state == 1 ? '已通过' : '已拒绝');
        this.baodanList[i]['Review'] = state;
      }
    }, error => {
      alert(error['error'])
    } )
  }

  getState(state){
    let State = '';
    switch (state){
      case 0:
        State = '正常';
        break;
      case 1:
        State = '结束';
        break;
      case 2:
        State = '冻结';
        break;
    }
    return State;
  }

  getReview(s) {
    let result = '';
    switch (s)
    {
      case 0:
        result = '待审';
        break;
      case 1:
        result = '通过';
        break;
      case 2:
        result = '拒绝';
        break;
    }
    return result;
  }

}
