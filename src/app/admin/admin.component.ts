import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public adminArr = [];

  constructor(
    private http: Http,
  ) { }

  ngOnInit() {
    this.http.get(localStorage['http'] + '/Action/Admins/GetAdmin').subscribe( response =>{
      this.adminArr = response.json();
    } )
  }

  getTimes(times){
    return times.split('T')[0] + '-' + times.split('T')[1].split('.')[0]
  }

  delete(ID, i){
    var result = confirm('确认删除吗？');
    if (result){
      this.http.delete(localStorage['http'] + '/Action/Admins/DeleteAdmin/' + ID).subscribe(respose => {
        // if(respose.json()['ID'] == ID){
        this.adminArr.splice(i,1);
        // }
      }, error => {
        alert(error.json()['Message']);
      });
    }
  }

}
