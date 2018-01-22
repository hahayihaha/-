import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import 'rxjs/add/operator/debounceTime';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  uploader: FileUploader = new FileUploader({url: localStorage['http'] + '/action/Users/UpFiles'});
  formModel: FormGroup;

  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router) {
    this.formModel = fb.group({
      Moneys: [10000, [Validators.required, Validators.min(10000), Validators.pattern('^[1-9]\\d*00$')]],
      Action: [1],
      UserID: ['', [Validators.required, Validators.pattern('^[A-z][0-9A-z]{3,9}$')]],
      PassWord: ['', [Validators.required, Validators.pattern('^[0-9A-z]{6,16}$')]],
      Name: ['', Validators.required],
      IDNumber: ['', [Validators.required, Validators.pattern('(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)')]],
      Phone: ['', [Validators.required, Validators.pattern('^1[0-9]{10}$')]],
      WX: ['', Validators.required],
      Bank: ['工商银行'],
      AccountName: ['', Validators.required],
      BankAccount: ['', [Validators.required, Validators.pattern('^([1-9]{1})(\\d{14}|\\d{18})$')]],
      BankBranch: ['', Validators.required],
      IDPhoto: [''],
      BankPhoto: [''],
      Receipt: [''],
      TJID: ['', Validators.required],
      BaoDanCenter: ['0000', Validators.required],
      tjname: ['', Validators.required],
      Times: ['', Validators.required],
      ActivTime: [''],
      IsBaoDan: [0]
    });

    this.formModel.get('TJID').valueChanges.debounceTime(1000).subscribe(val => {
      this.http.get(localStorage['http'] + '/action/Users/GetName?un=' + val, {responseType: 'text'}).subscribe(res => {
        const tj = res.replace(/\"/g, '');
        this.formModel.get('tjname').setValue(tj);
      }, error => {
        this.formModel.get('tjname').setValue('');
      });
    });
  }

  ngOnInit() {

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

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
    if (this.formModel.get('Receipt').value == '') {
      alert('请上传汇款小票');
      return false;
    }

    e.target.disabled = true;
    this.http.post(localStorage['http'] + '/action/Users/PostUsers?xp=' + this.formModel.get('Receipt').value, this.formModel.value).subscribe(data => {
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
}
