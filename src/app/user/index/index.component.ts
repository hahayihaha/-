import {Component, OnInit, Output} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Pagination} from '../../widgets/pagination/pageconfig';
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
        this.pagination.totalItems = v['total'];
      });
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
  freeze(ID, i){
    let con = window.confirm('是否确认冻结会员');
    if (con){
      this.http.get(localStorage['http'] + '/manage/Users/Freeze?id=' + ID).subscribe(response => {
        console.log(response);
        if (response){
          alert('冻结成功');
          this.model[i]['IsFreeze'] = 1;
        }
      }, error => {
        alert(error['error']['Message'])
      });
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
