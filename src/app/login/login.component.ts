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
    this.formModel = fb.group({
      u: ['', Validators.required],
      p: ['', Validators.required]
    })
  }

  ngOnInit() {

  }

  signIn(event){
    event.target.disabled = true;
    this.http.post(localStorage['http'] + '/manage/Login/Login', this.formModel.value).subscribe( response => {
      if(response.json()){
        this.router.navigate(['/admin']);
        sessionStorage.setItem('ID', response.json());
        sessionStorage.setItem('UserID', this.formModel.get('u').value);
      }
    }, error => {
      event.target.disabled = false;
      alert(error.json()['Message']);
    } )
  }

}
