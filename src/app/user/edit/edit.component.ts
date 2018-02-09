import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
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
  uploader2: FileUploader = new FileUploader({url: localStorage['http'] + '/action/Users/UpFiles'});
  formModel: FormGroup;
  UserID;
  public show: boolean = false;
  btnOn: Boolean = false;
  imgList = { jpg: 0, jpeg: 0, bmp: 0, png: 0, gif: 0};
  imgErr1: Boolean = false;
  imgErr2: Boolean = false;
  public shangchuan1 = '';
  public shangchuan1bool: boolean = false;
  public shangchuan2 = '';
  public shangchuan2bool: boolean = false;
  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public routerinfo: ActivatedRoute) {
    const id = routerinfo.snapshot.params['id'];

    this.formModel = fb.group({
      ID: [id],
      Action: [1],
      UserID: ['', [Validators.required, Validators.pattern('^[A-z][0-9A-z]{3,15}$')]],
      PassWord: ['', [Validators.required, Validators.pattern('^[0-9A-z]{6,16}$')]],
      MingPass: [''],
      Name: ['', Validators.required],
      Balance: [''],
      ICE: [''],
      Moneys: [''],
      IDNumber: ['', [Validators.required, Validators.pattern('(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)')]],
      Phone: ['', [Validators.required, Validators.pattern('^1[0-9]{10}$')]],
      WX: ['', Validators.required],
      Bank: ['中国工商银行'],
      AccountName: ['', Validators.required],
      BankAccount: ['', [Validators.required]],
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

  ngOnInit() {

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };
    this.uploader2.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader2.onSuccessItem = (item, response, status, headers) => this.onSuccessItem2(item, response, status, headers);

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

  imgValid(img) {
    const arr = img.split('.');
    const exname = arr[arr.length - 1].toLowerCase();
    return this.imgList[exname];
  }

  file(e) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      let that = this;
      reader.onload = function(evt) {
        let target: any = evt.target;
        that.shangchuan1 = target.result;
        if (that.shangchuan1 !== ''){
          that.shangchuan1bool = true;
        }else {
          that.shangchuan1bool = false;
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
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
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      let that = this;
      reader.onload = function(evt) {
        let target: any = evt.target;
        that.shangchuan2 = target.result;
        if (that.shangchuan2 !== ''){
          that.shangchuan2bool = true;
        }else {
          that.shangchuan2bool = false;
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
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

  onSubmit(e) {
    this.show = true;
    //判断是否选择了上传图片
    if(this.uploader.queue.length ==0 && this.uploader2.queue.length ==0)
    {
      console.log(this.formModel.value);
      this.formModel.get('UserID').setValue(this.UserID);
      this.http.put(localStorage['http'] + '/action/Users/PutUsers/' + this.formModel.get('ID').value, this.formModel.value).subscribe(data => {
        this.show = false;
        this.router.navigate(['/users']);
      }, error2 => {
        this.show = false;
        alert(error2.error.Message);
      });
    }else {
      if(this.formModel.value.IDPhoto.length < 10)
      {
        this.uploader.queue[this.uploader.queue.length - 1].upload();
      }
      if(this.formModel.value.BankPhoto.length < 10)
      {
        this.uploader2.queue[this.uploader2.queue.length - 1].upload();
      }
    }
  }

  haha(){
      // 判断图片是否正确上传成功
      if(this.formModel.value.IDPhoto.indexOf('.') > 0 && this.formModel.value.BankPhoto.indexOf('.') > 0){
        this.show = true;
        this.formModel.get('UserID').setValue(this.UserID);
        this.http.put(localStorage['http'] + '/action/Users/PutUsers/' + this.formModel.get('ID').value, this.formModel.value).subscribe(data => {
          this.show = false;
          this.btnOn = true;
          this.router.navigate(['/users']);
        }, error2 => {
          this.show = false;
          this.btnOn = false;
          alert(error2.error.Message);
        });
      } else {
        this.show = false;
      }
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
        return time.split('T')[0] + ' ' + time.split('T')[1].split();
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
