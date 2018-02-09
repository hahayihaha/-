import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-xutou',
  templateUrl: './xutou.component.html',
  styleUrls: ['./xutou.component.scss']
})
export class XutouComponent implements OnInit {
  uploader3: FileUploader = new FileUploader({url: localStorage['http'] + '/action/Users/UpFiles'});
  formModel: FormGroup;
  public show: boolean = false;

  constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public routerinfo: ActivatedRoute) {
    const id = routerinfo.snapshot.params['id'];
    this.formModel = fb.group({
      Moneys: [10000, [Validators.required, Validators.min(10000), Validators.pattern('^[1-9]\\d*00$')]],
      UID: [''],
      TJID: ['', Validators.required],
      tjname: ['', Validators.required],
      UserID: [id, Validators.required],
      Receipt: [''],
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

    this.uploader3.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    this.uploader3.onSuccessItem = (item, response, status, headers) => this.onSuccessItem3(item, response, status, headers);


  }

  onSuccessItem3(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    this.formModel.get('Receipt').setValue(response.replace(/\"/g, ''));
    this.haha();
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
    this.show = true;
    // 判断是否选择了上传图片
    if (this.uploader3.queue.length ==0){
      this.show = false;
      alert('请上传汇款小票照片');
      return false;
    }
    this.uploader3.queue[this.uploader3.queue.length - 1].upload();
  }

  haha(){
    if(this.formModel.value.Receipt != '')
    {
      // 判断图片是否正确上传成功

      if(this.formModel.value.Receipt == '')
      {
        this.show = false;
        alert('请上传汇款小票照片');
        return false;
      }

      this.http.post(localStorage['http'] + '/action/Baodans/PostBaoDan', this.formModel.value).subscribe(data => {
        this.show = false;
        this.router.navigate(['/users']);
      }, error2 => {
        this.show = false;
        alert(error2.error.Message);
      });
    }
  }

}
