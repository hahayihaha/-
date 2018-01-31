import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
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
  uploader2: FileUploader = new FileUploader({url: localStorage['http'] + '/action/Users/UpFiles'});
  uploader3: FileUploader = new FileUploader({url: localStorage['http'] + '/action/Users/UpFiles'});
  formModel: FormGroup;
  public show: boolean = false;

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
      Bank: ['中国工商银行'],
      AccountName: ['', Validators.required],
      BankAccount: ['', [Validators.required]],
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

    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader2.onSuccessItem = (item, response, status, headers) => this.onSuccessItem2(item, response, status, headers);
    this.uploader3.onSuccessItem = (item, response, status, headers) => this.onSuccessItem3(item, response, status, headers);

    $(function () {
      $('.bsrp-time').datetimepicker({
        // minView: 'month', // 选择日期后，不会再跳转去选择时分秒
        language: 'cn',
        format: 'yyyy-mm-dd hh:ii:ss',
        todayBtn: 1,
        autoclose: 1,
      }).on('changeDate', function (ev) {
        $(this).focus();
        $(this).blur();
      });
    });
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.formModel.get('IDPhoto').setValue(response);
    this.haha();
  }
  onSuccessItem2(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.formModel.get('BankPhoto').setValue(response);
    this.haha();
  }
  onSuccessItem3(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.formModel.get('Receipt').setValue(response);
    this.haha();
  }


  file(e) {
    if(e.target.value == '')
    {
      this.uploader.removeFromQueue(this.uploader.queue[0]);
    }else {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    }

  }

  file2(e) {
    if(e.target.value == '')
    {
      this.uploader2.removeFromQueue(this.uploader2.queue[0]);
    }else {
      if (this.uploader2.queue.length > 1) {
        this.uploader2.removeFromQueue(this.uploader2.queue[0]);
      }
    }
  }

  file3(e) {
    if(e.target.value == '')
    {
      this.uploader3.removeFromQueue(this.uploader3.queue[0]);
    }else {
      if (this.uploader3.queue.length > 1) {
        this.uploader3.removeFromQueue(this.uploader3.queue[0]);
      }
    }
  }

  onSubmit(e) {
    // 判断是否选择了上传图片
    if(this.uploader.queue.length ==0)
    {
      alert('请上传身份证正面照片');
      return false;
    }
    if (this.uploader2.queue.length ==0){
      alert('请上传银行卡照片');
      return false;
    }
    if (this.uploader3.queue.length ==0){
      alert('请上传汇款小票照片');
      return false;
    }

    this.uploader.queue[this.uploader.queue.length - 1].upload();
    this.uploader2.queue[this.uploader2.queue.length - 1].upload();
    this.uploader3.queue[this.uploader3.queue.length - 1].upload();
  }

  setSD(e) {
    this.formModel.get('Times').setValue(e);
  }

  setED(e) {
    this.formModel.get('ActivTime').setValue(e);
  }

  haha() {
    if(this.formModel.value.IDPhoto != '' && this.formModel.value.BankPhoto != '' && this.formModel.value.Receipt != '')
    {
      // 判断图片是否正确上传成功
      if(this.formModel.value.IDPhoto == '')
      {
        alert('请上传身份证正面照片');
        return false;
      }
      if(this.formModel.value.BankPhoto == '')
      {
        alert('请上传银行卡照片');
        return false;
      }
      if(this.formModel.value.Receipt == '')
      {
        alert('请上传汇款小票照片');
        return false;
      }

      this.http.post(localStorage['http'] + '/action/Users/PostUsers?xp=' + this.formModel.get('Receipt').value, this.formModel.value).subscribe(data => {
        this.router.navigate(['/users']);
      }, error2 => {
        alert(error2.error.Message);
        this.show = false;
        // e.target.disabled = false;
      });
    }
  }

}
