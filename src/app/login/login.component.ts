import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http } from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public formModel: FormGroup;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public http: Http,
    public info: ActivatedRoute
  ) {
    if (sessionStorage['UserID'] !== null && sessionStorage['UserID'] != undefined) {
      this.router.navigate(['/users']);
    }
    this.formModel = fb.group({
      u: ['', Validators.required],
      p: ['', Validators.required]
    })
  }

  ngOnInit() {

    // document.onkeydown = (e) => {
    //   if (this.formModel.get('u').value !== '' && this.formModel.get('p').value !== ''){
    //     if (e.keyCode == 13){
    //       this.signIn(e);
    //     }
    //   }else {
    //     if (e.keyCode == 13){
    //       if(this.formModel.get('u').value == ''){
    //         alert('请填写用户名');
    //       }
    //       if(this.formModel.get('p').value == ''){
    //         alert('请填写密码');
    //       }
    //     }
    //   }
    // }

  }

  signIn(event){
    event.target.disabled = true;
    this.http.post(localStorage['http'] + '/manage/Login/Login', this.formModel.value).subscribe( response => {
      if(response.json()){
        this.router.navigate(['/users']);
        sessionStorage.setItem('ID', response.json()['ID']);
        sessionStorage.setItem('UserID', this.formModel.get('u').value);
        sessionStorage.setItem('Qx', response.json()['Qx'])
      }
    }, error => {
      event.target.disabled = false;
      alert(error.json()['Message']);
    } )
  }

}
