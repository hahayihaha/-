import { Component, OnInit, Output } from '@angular/core';
import {Pagination} from '../widgets/pagination/pageconfig';
import { HttpClient } from "@angular/common/http";
declare var $: any;

@Component({
  selector: 'app-tixian',
  templateUrl: './tixian.component.html',
  styleUrls: ['./tixian.component.scss']
})
export class TixianComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  un = '';
  bank = '';
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
    let url = localStorage['http'] + '/manage/tixian/GetList?num=' + page;
    if(this.un !== ''){
      url += '&n=' + this.un;
    }
    if(this.bank !== ''){
      url += '&bank=' + this.bank;
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

  serach(){
    if (this.un !== '' || this.bank !== '' || this.sd !== '' || this.ed !== '') {
      this.pagination.currentPage = 1;
      this.initList();
    }
  }

  // GetState(state){
  //   let State = '';
  //   switch (state){
  //     case 0 :
  //       State = '待审';
  //       break;
  //     case 1 :
  //       State = '通过';
  //       break;
  //     case  2 :
  //       State = '拒绝';
  //       break;
  //   }
  //   return State;
  // }

  //导出数据
  export(){
    let url = '';
    if(this.un !== ''){
      url += '&n=' + this.un;
    }
    if(this.bank !== ''){
      url += '&bank=' + this.bank;
    }
    if(this.sd !== ''){
      url += '&sd' + this.sd;
    }
    if(this.ed !== ''){
      url += '&ed' + this.ed
    }
    if (url !== ''){
      url = localStorage['http'] + '/manage/tixian/GetExcel?' + url.substring(1, url.length);
    }else {
      url = localStorage['http'] + '/manage/tixian/GetExcel';
    }
    location.href = url;
  }

}
