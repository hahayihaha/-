import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import 'rxjs/add/operator/debounceTime';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  uploader: FileUploader = new FileUploader({url: localStorage['http'] + '/action/Users/UpFiles'});
  formModel: FormGroup;
  UserID;
  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public routerinfo: ActivatedRoute) {
    const id = routerinfo.snapshot.params['id'];

    this.formModel = fb.group({
      ID: [id],
      Action: [1],
      UserID: ['', [Validators.required, Validators.pattern('^[A-z][0-9A-z]{3,9}$')]],
      PassWord: ['', [Validators.required, Validators.pattern('^[0-9A-z]{6,16}$')]],
      MingPass: [''],
      Name: ['', Validators.required],
      Balance: [''],
      ICE: [''],
      Moneys: [''],
      IDNumber: ['', [Validators.required, Validators.pattern('(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)')]],
      Phone: ['', [Validators.required, Validators.pattern('^1[0-9]{10}$')]],
      WX: ['', Validators.required],
      Bank: ['工商银行'],
      AccountName: ['', Validators.required],
      BankAccount: ['', [Validators.required, Validators.pattern('^([1-9]{1})(\\d{14}|\\d{18})$')]],
      BankBranch: ['', Validators.required],
      IDPhoto: [''],
      BankPhoto: [''],
      BaoDanCenter: ['', Validators.required],
      Times: [''],
      ActivTime: [''],
      IsBaoDan: [0],
      IsFreeze: [0],
      YeJi: [0],
      SanYeJi: [0],
      FreezeTime: [0]
    });

    this.http.get(localStorage['http'] + '/manage/Users/GetInfo/' + id).subscribe(data => {
      this.UserID = data['UserID'];
      this.formModel.get('Action').setValue(data['Action']);
      this.formModel.get('UserID').setValue(data['UserID']);
      this.formModel.get('PassWord').setValue(data['MingPass']);
      this.formModel.get('MingPass').setValue(data['MingPass']);
      this.formModel.get('Name').setValue(data['Name']);
      this.formModel.get('Balance').setValue(data['Balance']);
      this.formModel.get('ICE').setValue(data['ICE']);
      this.formModel.get('Moneys').setValue(data['Moneys']);
      this.formModel.get('IDNumber').setValue(data['IDNumber']);
      this.formModel.get('Phone').setValue(data['Phone']);
      this.formModel.get('WX').setValue(data['WX']);
      this.formModel.get('Bank').setValue(data['Bank']);
      this.formModel.get('AccountName').setValue(data['AccountName']);
      this.formModel.get('BankAccount').setValue(data['BankAccount']);
      this.formModel.get('BankBranch').setValue(data['BankBranch']);
      this.formModel.get('IDPhoto').setValue(data['IDPhoto']);
      this.formModel.get('BankPhoto').setValue(data['BankPhoto']);
      this.formModel.get('BaoDanCenter').setValue(data['BaoDanCenter']);
      this.formModel.get('Times').setValue(this.GetTimes(data['Times']));
      this.formModel.get('ActivTime').setValue(this.GetTimes(data['ActivTime']));
      this.formModel.get('IsBaoDan').setValue(data['IsBaoDan']);
      this.formModel.get('IsFreeze').setValue(data['IsFreeze']);
      this.formModel.get('YeJi').setValue(data['YeJi']);
      this.formModel.get('SanYeJi').setValue(data['SanYeJi']);
      this.formModel.get('FreezeTime').setValue(data['FreezeTime']);
    }, error2 => {
      this.router.navigate(['/users']);
    });

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
  }

  ngOnInit() {

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

  }

  file() {
    let img1 = '';
    const that = this;
    if (this.uploader.queue.length > 0) {
      // 上传
      this.uploader.queue[this.uploader.queue.length - 1].onSuccess = function (response, status, headers) {
        img1 = response;
        that.formModel.get('IDPhoto').setValue(img1.replace(/\"/g, ''));
        this.uploader.clearQueue(); // 清除队列，如果不清除的话，还会继续上传第一个队列的图片
      };
      this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
    }
  }

  file2() {
    let img2 = '';
    const that = this;
    if (this.uploader.queue.length > 0) {
      // 上传
      this.uploader.queue[this.uploader.queue.length - 1].onSuccess = function (response, status, headers) {
        img2 = response;
        that.formModel.get('BankPhoto').setValue(img2.replace(/\"/g, ''));
        this.uploader.clearQueue(); // 清除队列，如果不清除的话，还会继续上传第一个队列的图片
      };
      this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
    }
  }

  file3() {
    let img3 = '';
    const that = this;
    if (this.uploader.queue.length > 0) {
      // 上传
      this.uploader.queue[this.uploader.queue.length - 1].onSuccess = function (response, status, headers) {
        img3 = response;
        that.formModel.get('Receipt').setValue(img3.replace(/\"/g, ''));
        this.uploader.clearQueue(); // 清除队列，如果不清除的话，还会继续上传第一个队列的图片
      };
      this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
    }
  }

  onSubmit(e) {
    if (this.formModel.get('IDPhoto').value == '') {
      alert('请上传身份证正面');
      return false;
    }

    if (this.formModel.get('BankPhoto').value == '') {
      alert('请上传银行卡');
      return false;
    }

    e.target.disabled = true;
    this.formModel.get('UserID').setValue(this.UserID);
    this.http.put(localStorage['http'] + '/action/Users/PutUsers/' + this.formModel.get('ID').value, this.formModel.value).subscribe(data => {
      this.router.navigate(['/users']);
    }, error2 => {
      alert(error2.error.Message);
      e.target.disabled = false;
    });
  }

  setSD(e) {
    this.formModel.get('Times').setValue(e);
  }

  setED(e) {
    this.formModel.get('ActivTime').setValue(e);
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

  getImg(img) {
    if(img == null || img == '')
    {
      return '';
    }
    return localStorage['http'] + '/Images/' +img;
  }
}
