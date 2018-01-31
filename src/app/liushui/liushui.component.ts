import { Component, OnInit, Output } from '@angular/core';
import {Pagination} from '../widgets/pagination/pageconfig';
import { HttpClient } from "@angular/common/http";
declare var $: any;

@Component({
  selector: 'app-liushui',
  templateUrl: './liushui.component.html',
  styleUrls: ['./liushui.component.scss']
})
export class LiushuiComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  un = '';
  t = '';
  sd = '';
  ed = '';

  constructor(
    public http: HttpClient
  ) { }

  public ngOnInit(): void {
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
    let page = this.pagination.currentPage;
    let url = localStorage['http'] + '/manage/Liushui/GetList?num=' + page;
    if(this.un !== ''){
      url += '&un=' + this.un;
    }
    if(this.t !== ''){
      url += '&t=' + this.t;
    }
    if(this.sd !== ''){
      url += '&sd=' + this.sd;
    }
    if(this.ed !== ''){
      url += '&ed=' + this.ed;
    }
    this.http.get(url).subscribe(response => {
      this.model = JSON.parse(response['data']);
      this.pagination.totalItems = response['Total']
    })
  }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0];
      }
    } catch (e) {
      return time;
    }
  }

  setSD(value){
    this.sd = value;
  }

  setED(value){
    this.ed = value;
  }

  changeT(value){
    this.t = value;
  }

  serach(){
    if (this.un !== '' || this.t !== '' || this.sd !== '' || this.ed !== '') {
      this.pagination.currentPage = 1;
      this.initList();
    }
  }

}
