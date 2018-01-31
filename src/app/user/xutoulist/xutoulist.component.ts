import {Component, OnInit, Output} from '@angular/core';
import { Pagination } from "../../widgets/pagination/pageconfig";
import { HttpClient } from "@angular/common/http";
import {isNullOrUndefined} from "util";

declare var $: any;

@Component({
  selector: 'app-xutoulist',
  templateUrl: './xutoulist.component.html',
  styleUrls: ['./xutoulist.component.scss']
})
export class XutoulistComponent implements OnInit {

  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  userID = '';
  TJID = '';
  st = '';
  ed = '';

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    $(function () {
      $('.bsrp-time').datetimepicker({
        minView: 'month', // 选择日期后，不会再跳转去选择时分秒
        language: 'cn',
        format: 'yyyy-mm-dd',
        todayBtn: 1,
        autoclose: 1,
      }).on('changeDate', function (ev) {
        $(this).focus();
        $(this).blur();
      });
    });

    this.pagination.currentPage = 1;
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  }

  private initList(): void {
    var page = this.pagination.currentPage;
    let url = localStorage['http'] + '/manage/BaoDans/GetBaoDan?num=' + page;
    if (this.userID !== '') {
      url += '&n=' + this.userID;
    }
    if(this.TJID !== ''){
      url += '&t=' + this.TJID
    }
    if(this.st !== ''){
      url += '&sd=' + this.st
    }
    if(this.ed !== ''){
      url += '&ed=' + this.ed
    }
    this.http.get(url).subscribe( response => {
      this.model = JSON.parse(response['data']);
      this.pagination.totalItems = response['Total'];
    } )
  }

  setST(value){
    this.st = value;
  }

  setED(value){
    this.ed = value;
  }

  //报单列表搜索
  serach() {
    if (this.userID !== '' || this.TJID !== '' || this.st !== '' || this.ed !== '') {
      this.pagination.currentPage = 1;
      this.initList();
    }
  }

  getState(value){
    let State = '';
    switch (value){
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

  getReview(value){
    let Review = '';
    switch (value){
      case 0:
        Review = '待审';
        break;
      case 1:
        Review = '通过';
        break;
      case 2:
        Review = '拒绝';
        break;
    }
    return Review;
  }

  getTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0] + '-' + time.split('T')[1].split('.')[0];
      }
    } catch (e) {
      return time;
    }
  }

  //续投审核
  audit(ID, i, state){
    this.http.post(localStorage['http'] + '/Action/BaoDans/Review/'+ ID +'?state=' + state, {}).subscribe( respose =>{
      if (respose){
        alert(state == 1 ? '已通过' : '已拒绝');
        this.model[i]['Review'] = state
      }
    }, error => {
      alert(error['error']['Message']);
    } )
  }

}
