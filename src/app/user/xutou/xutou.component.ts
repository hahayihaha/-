import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-xutou',
  templateUrl: './xutou.component.html',
  styleUrls: ['./xutou.component.scss']
})
export class XutouComponent implements OnInit {
  uploader: FileUploader = new FileUploader({url: localStorage['http'] + '/action/Users/UpFiles'});
  formModel: FormGroup;

  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public routerinfo: ActivatedRoute) {
    const id = routerinfo.snapshot.params['id'];
    this.formModel = fb.group({
      Moneys: [10000, [Validators.required, Validators.min(10000), Validators.pattern('^[1-9]\\d*00$')]],
      UID: [''],
      TJID: ['', Validators.required],
      tjname: ['', Validators.required],
      UserID: [id, Validators.required],
      Receipt: ['', Validators.required],
      Investment: [1],
    });

    this.formModel.get('TJID').valueChanges.debounceTime(1000).subscribe(val => {
      this.http.get(localStorage['http'] + '/action/Users/GetName?un=' + val, {responseType: 'text'}).subscribe(res => {
        const tj = res.replace(/\"/g, '');
        this.formModel.get('tjname').setValue(tj);
      }, error => {
        this.formModel.get('tjname').setValue('');
      });
    });

    this.http.get(localStorage['http'] + '/action/users/GetUserID?un=' + id).subscribe(data => {
      this.formModel.get('UID').setValue(data);
    }, error2 => {
      this.router.navigate(['/users']);
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
    console.log(this.formModel.get('Receipt').value)
    if (this.formModel.get('Receipt').value == '') {
      alert('请上传汇款小票');
      return false;
    }

    e.target.disabled = true;
    this.http.post(localStorage['http'] + '/action/Baodans/PostBaoDan', this.formModel.value).subscribe(data => {
      this.router.navigate(['/users']);
    }, error2 => {
      alert(error2.error.Message);
      e.target.disabled = false;
    });
  }

}
