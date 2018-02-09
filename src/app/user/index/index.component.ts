import {Component, OnInit, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Pagination} from '../../widgets/pagination/pageconfig';
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  model: Array<any> = [];
  // 传出分页总数
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;
  userID = '';
  TJID = '';
  BAC = '';
  st = '';
  ed = '';
  public QX: number;
  public params: Array<any> = [];
  constructor(public http: HttpClient) {

  }

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

    this.QX = sessionStorage['Qx'];

  }

  private initList(): void {
    const page = this.pagination.currentPage;
    let url = localStorage['http'] + '/manage/Users?un=' + sessionStorage['UserID'] + '&num=' + page;
    if (this.userID !== '') {
      url += '&n=' + this.userID;
    }
    if(this.TJID !== ''){
      url += '&tj=' + this.TJID
    }
    if(this.BAC !== ''){
      url += '&bsc=' + this.BAC
    }
    if(this.st !== ''){
      url += '&sd=' + this.st
    }
    if(this.ed !== ''){
      url += '&ed=' + this.ed
    }

    this.http.get(url)
      .subscribe(v => {
        this.model = JSON.parse(v['data']);
        this.pagination.totalItems = v['Total'];
      });
  }

  checkBox(event, ID, i){
    if(event){
      let params = {
        checked: event,
        ID: ID,
        index: i
      }
      this.params.push(params);
    }
    if(!event){
      let params = {
        checked: event,
        ID: ID,
        index: i
      }
      for(var s = 0; s < this.params.length; s++){
        if(!isNullOrUndefined(params['ID'])){
          if(params['ID'] == this.params[s]['ID']){
            this.params.splice(s, 1);
          }
        }
      }
    }
  }

  GetTimes(time) {
    try {
      if (time != null) {
        return time.split('T')[0];
      }
    } catch (e) {
      return time;
    }
  }

  //导出表格
  export(){
    let url = '';
    if (this.userID !== '') {
      url += '&u=' + this.userID;
    }
    if(this.BAC !== ''){
      url += '&b=' + this.BAC
    }
    if(this.st !== ''){
      url += '&sd=' + this.st
    }
    if(this.ed !== ''){
      url += '&ed=' + this.ed
    }
    if(url != '')
    {
      url = localStorage['http'] + '/manage/Users/GetExcel?' +url.substring(1,url.length);
    }else {
      url = localStorage['http'] + '/manage/Users/GetExcel';
    }
    location.href = url;
  }

  // 会员账号搜索
  serach() {
    if (this.userID !== '' || this.TJID !== '' || this.BAC !== '' || this.st !== '' || this.ed !== '') {
      this.pagination.currentPage = 1;
      this.initList();
    }
  }

  //冻结会员
  freeze(){
    if(this.params.length){
      let con = window.confirm('是否确认冻结会员');
      if (con) {
        for (var i = 0; i < this.params.length; i++) {
          let Index = [];
          Index.push(this.params[i]['index'])
          this.http.get(localStorage['http'] + '/manage/Users/Freeze?id=' + this.params[i]['ID']).subscribe(response => {
            if (response) {
              alert('冻结成功');
              for (var j = 0; j < Index.length; j++){
                if (!isNullOrUndefined(Index[j])){
                  this.model[Index[j]]['IsFreeze'] = 1;
                }
              }
            }
          }, error => {
            alert(error['error']['Message'])
          });
        }
      }
    }else {
      alert('请选择会员！');
    }
  }

  //设为办事处
  setupBsc(){
    if(this.params.length){
      let con = window.confirm('是否确认设置为办事处');
      if (con) {
        for (var i = 0; i < this.params.length; i++) {
          this.http.post(localStorage['http'] + '/manage/Users/SetBansc/' + this.params[i]['ID'], {}).subscribe( response => {
            if(response){
              alert('设置成功');
            }
          }, error => {
            alert(error['error']['Message']);
          } )
        }
      }
    }else {
      alert('请选择会员！')
    }
  }

  //取消办事处
  cancelBsc(){
    if(this.params.length){
      let con = window.confirm('是否确认取消办事处');
      if (con) {
        for (var i = 0; i < this.params.length; i++) {
          this.http.post(localStorage['http'] + '/manage/Users/DelBansc/' + this.params[i]['ID'], {}).subscribe( response => {
            if(response){
              alert('设置成功');
            }
          }, error => {
            alert(error['error']['Message'])
          } )
        }
      }
    }else {
      alert('请选择会员！')
    }
  }

  setST(value){
    this.st = value;
  }

  setED(value){
    this.ed = value;
  }

  //激活
  activation(ID, i){
    var con = window.confirm('是否确认激活？');
    if(con){
      this.http.post(localStorage['http'] + '/manage/Users/action?id=' + ID, {}).subscribe( response =>{
        if(response){
          alert('激活成功');
          this.model[i]['Action'] = 1;
        }
      }, error => {
        alert(error['error']['Message']);
      } )
    }else {
      return
    }
  }

}
