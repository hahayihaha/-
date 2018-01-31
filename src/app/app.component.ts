import { Component } from '@angular/core';
import { environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '俱乐部管理系统';

  public regStr_ie

  constructor() {
    localStorage['http'] = environment.ApiUrl;
  }

  ngOnInit(){

  }

  //当路由跳转之后
  onDeactivate(){
    scroll(0, 0);
  }

}
