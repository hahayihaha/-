import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss']
})
export class AddadminComponent implements OnInit {

  public formModel: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: Http,
    public router: Router
  ) {
    this.formModel = fb.group({
      UserID: ['', [Validators.required, Validators.pattern('^[A-z][0-9A-z]{3,9}$')]],
      PassWord: ['', Validators.required],
      confirm: ['', Validators.required],
      Qx: ['1', Validators.required],
    })
  }

  ngOnInit() {

    // $(function () {
    //   $('#datetimepicker').datetimepicker({
    //     minView: 'month', // 选择日期后，不会再跳转去选择时分秒
    //     language: 'cn',
    //     format: 'yyyy-mm-dd hh:ii',
    //     todayBtn: 1,
    //     autoclose: 1,
    //   }).on('changeDate', function (ev) {
    //     $(this).focus();
    //     $(this).blur();
    //   });
    // });

  }

  // setSD(value){
  //   this.formModel.get('Times').setValue(value);
  // }

  addAdmin(event){
    event.target.disabled = true;
    this.http.post(localStorage['http'] + '/Action/Admins/PostAdmin', this.formModel.value).subscribe( response => {
      if(response.json()){
        alert('添加成功');
        this.router.navigate(['/admin'])
      }
    }, error => {
      event.target.disabled = false;
      alert(error.json()['Message'])
    } )
  }

}
