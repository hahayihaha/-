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
  btnOn: Boolean = false;
  imgList = { jpg: 0, jpeg: 0, bmp: 0, png: 0, gif: 0};
  imgErr1: Boolean = false;
  imgErr2: Boolean = false;
  imgErr3: Boolean = false;

  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router) {
    this.formModel = fb.group({
      Moneys: [10000, [Validators.required, Validators.min(10000), Validators.pattern('^[1-9]\\d*00$')]],
      Action: [1],
      UserID: ['', [Validators.required, Validators.pattern('^[A-z][0-9A-z]{3,15}$')]],
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
      tjname: [''],
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
    this.uploader2.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader3.onBeforeUploadItem = (item) => {
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
    const res = response.replace(/\"/g, '');
    this.formModel.get('IDPhoto').setValue(res);
    if (res == '' || res == 'null' || res == 'undefined') { // 上传错误
      this.imgErr1 = true;
      this.show = false;
    } else {
      this.imgErr1 = false;
      this.haha();
    }
  }
  onSuccessItem2(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const res = response.replace(/\"/g, '');
    this.formModel.get('BankPhoto').setValue(res);
    if (res == '' || res == 'null' || res == 'undefined') { // 上传错误
      this.imgErr2 = true;
      this.show = false;
    } else {
      this.imgErr2 = false;
      this.haha();
    }
  }
  onSuccessItem3(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const res = response.replace(/\"/g, '');
    this.formModel.get('Receipt').setValue(res);
    if (res == '' || res == 'null' || res == 'undefined') { // 上传错误
      this.imgErr3 = true;
      this.show = false;
    } else {
      this.imgErr3 = false;
      this.haha();
    }
  }

  imgValid(img) {
    const arr = img.split('.');
    const exname = arr[arr.length - 1].toLowerCase();
    return this.imgList[exname];
  }

  file(e) {
    this.formModel.get('IDPhoto').setValue('');
    if (e.target.value == '' && this.uploader.queue.length >= 1) {
      this.uploader.removeFromQueue(this.uploader.queue[0]);
    }

    if (this.uploader.queue.length > 1) {
      this.uploader.removeFromQueue(this.uploader.queue[0]);
    }
    if (this.imgValid(e.target.value) == undefined) {
      this.imgErr1 = true;
    } else {
      this.imgErr1 = false;
    }
  }

  file2(e) {
    this.formModel.get('BankPhoto').setValue('');
    if (e.target.value == '' && this.uploader2.queue.length >= 1) {
      this.uploader2.removeFromQueue(this.uploader2.queue[0]);
    }

    if (this.uploader2.queue.length > 1) {
      this.uploader2.removeFromQueue(this.uploader2.queue[0]);
    }

    if (this.imgValid(e.target.value) == undefined) {
      this.imgErr2 = true;
    } else {
      this.imgErr2 = false;
    }
  }

  file3(e) {
    this.formModel.get('Receipt').setValue('');
    if (e.target.value == '' && this.uploader3.queue.length >= 1) {
      this.uploader3.removeFromQueue(this.uploader3.queue[0]);
    }

    if (this.uploader3.queue.length > 1) {
      this.uploader3.removeFromQueue(this.uploader3.queue[0]);
    }

    if (this.imgValid(e.target.value) == undefined) {
      this.imgErr3 = true;
    } else {
      this.imgErr3 = false;
    }
  }

  onSubmit(e) {
    if (this.formModel.value.IDPhoto.length > 9 && this.formModel.value.BankPhoto.length > 9 && this.formModel.value.Receipt.length > 9) {
      this.haha();
    } else {
      // 判断是否选择了上传图片
      if (this.uploader.queue.length == 0) {
        alert('请上传身份证正面照片');
        return false;
      } else if (this.formModel.value.IDPhoto.length < 10) {
        this.show = true;
        this.uploader.queue[this.uploader.queue.length - 1].upload();
      } else {
        this.show = false;
      }

      if (this.uploader2.queue.length == 0) {
        alert('请上传银行卡照片');
        return false;
      } else if (this.formModel.value.BankPhoto.length < 10) {
        this.show = true;
        this.uploader2.queue[this.uploader2.queue.length - 1].upload();
      } else {
        this.show = false;
      }

      if (this.uploader3.queue.length == 0) {
        alert('请上传汇款小票照片');
        return false;
      } else if (this.formModel.value.Receipt.length < 10) {
        this.show = true;
        this.uploader3.queue[this.uploader3.queue.length - 1].upload();
      } else {
        this.show = false;
      }
    }
  }

  setSD(e) {
    this.formModel.get('Times').setValue(e);
  }

  setED(e) {
    this.formModel.get('ActivTime').setValue(e);
  }

  haha() {
    if(this.formModel.value.IDPhoto.indexOf('.') > 0 && this.formModel.value.BankPhoto.indexOf('.') > 0 && this.formModel.value.Receipt.indexOf('.') > 0)
    {
      this.show = true;
      this.btnOn = true;

      this.http.post(localStorage['http'] + '/action/Users/PostUsers?xp=' + this.formModel.get('Receipt').value, this.formModel.value).subscribe(data => {
        this.show = false;
        this.router.navigate(['/users']);
      }, error2 => {
        alert(error2.error.Message);
        this.show = false;
        this.btnOn = false;
      });
    } else {
      this.show = false;
    }
  }

}
