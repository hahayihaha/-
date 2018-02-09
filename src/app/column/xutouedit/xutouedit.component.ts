import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-xutouedit',
  templateUrl: './xutouedit.component.html',
  styleUrls: ['./xutouedit.component.scss']
})
export class XutoueditComponent implements OnInit {
  uploader: FileUploader = new FileUploader({url: localStorage['http'] + '/action/Users/UpFiles'});
  formModel: FormGroup;
  Imgs: string = '';
  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public routerinfo: ActivatedRoute) {
    const id = routerinfo.snapshot.params['id'];
    if(id == null || id == '')
    {
      this.router.navigate(['/users']);
    }
    this.formModel = fb.group({
      ID: [''],
      TJID: ['', Validators.required],
      UserID: ['', Validators.required],
      Moneys: [10000, [Validators.required, Validators.min(10000), Validators.pattern('^[1-9]\\d*00$')]],
      tjname: ['', Validators.required],
      Receipt: ['', Validators.required],
      Investment: [1],
      BounsNum:[0],
      State:[0],
      Review:[0],
      Times: [''],
      ATimes: ['']
    });

    this.http.get(localStorage['http']+'/manage/baodans/getview/'+id).subscribe(data => {
      this.formModel.get('ID').setValue(data['ID']);
      this.formModel.get('TJID').setValue(data['TJID']);
      this.formModel.get('UserID').setValue(data['UserID']);
      this.formModel.get('Moneys').setValue(data['Moneys']);
      this.formModel.get('Receipt').setValue(data['Receipt']);
      this.Imgs = localStorage['http'] +'/Images/'+data['Receipt'];
      this.formModel.get('Investment').setValue(data['Investment']);
      this.formModel.get('BounsNum').setValue(data['BounsNum']);
      this.formModel.get('State').setValue(data['State']);
      this.formModel.get('Review').setValue(data['Review']);
      this.formModel.get('Times').setValue(this.GetTimes(data['Times']));
      this.formModel.get('ATimes').setValue(this.GetTimes(data['ATimes']));
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
        if(img1 !== ''){
          that.formModel.get('Receipt').setValue(img1.replace(/\"/g, ''));
        }
        this.uploader.clearQueue(); // 清除队列，如果不清除的话，还会继续上传第一个队列的图片
      };
      this.uploader.queue[this.uploader.queue.length - 1].upload(); // 开始上传
    } else {
      this.formModel.get('Receipt').reset();
    }
  }

  onSubmit(e) {
    if (this.formModel.get('Receipt').value == '') {
      alert('请上传汇款小票');
      return false;
    }

    e.target.disabled = true;
    this.http.put(localStorage['http'] + '/manage/Baodans/PutBaoDan/'+this.formModel.value.ID, this.formModel.value).subscribe(data => {
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
    this.formModel.get('ATimes').setValue(e);
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
}
