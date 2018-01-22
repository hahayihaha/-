import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http } from "@angular/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {

  public ID: number;
  public formModel: FormGroup;
  public passwordtwo;

  constructor(
    public info: ActivatedRoute,
    public router: Router,
    public http: Http,
    public fb: FormBuilder
  ) {
    this.formModel = fb.group({
      oldpass: ['', Validators.required],
      password: ['', Validators.required],
      passwordtwo: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.ID = this.info.snapshot.params['id'];
  }

  change(event){
    alert(1)
  }

  modify(event){
    event.target.disabled = true;
    this.http.put(localStorage['http'] + '/Action/Admins/PutPass/' + this.ID, this.formModel.value).subscribe( response =>{
      if(response.json()){
        alert('修改成功');
        this.router.navigate(['/admin']);
      }
    }, error => {
      event.target.disabled = false;
      alert(error.json()['Message']);
    } )
  }

}
