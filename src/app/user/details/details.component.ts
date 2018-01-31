import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {isNullOrUndefined} from "util";
declare var $: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public ID:number;
  public data: any = {};
  public info: any = {};
  public img1 = '';
  public img2 = '';
  public img3 = '';
  public infoBankBranch;
  public show: boolean;
  constructor(
    info: ActivatedRoute,
    public http: HttpClient
  ) {
    this.ID = info.snapshot.params['id'];

  }

  ngOnInit() {

    this.http.get(localStorage['http'] + '/manage/Users/GetView?id=' + this.ID).subscribe( response => {
      console.log(response)
      this.data = (JSON.parse(response['data']));
      this.info = (JSON.parse(response['info']));
      this.infoBankBranch = this.info['BankBranch'];
      if(this.infoBankBranch.length > 16){
        this.show = false;
      }else {
        this.show = true;
      };
      this.img1 = localStorage['http']+'/images/' + this.data['IDPhoto'];
      this.img2 = localStorage['http']+'/images/' + this.data['BankPhoto'];
      this.img3 = localStorage['http']+'/images/' + this.data['Receipt'];
      this.hehe();
    } );
  }

  getTimes(times){
    if(!isNullOrUndefined(times)){
      return times.split('T')[0] + ' ' + times.split('T')[1].split('.')[0];
    }else {
      return times
    }
  }

  print(){
    window.print();
  }

  hehe() {
    var i = 0;
    var time = window.setInterval(function(){
      i++;
      if(i > 100)
      {
        window.clearTimeout(time);
      }
      if($(".img:eq(0)").width() > 0 && $(".img:eq(1)").width() > 0 && $(".img:eq(2)").width() > 0)
      {
        $(".img").each(function () {
          if($(this).width() > 0)
          {
            var w = $(this).width();
            var h = $(this).height();
            if(w > h)
            {
              $(this).attr("width",'100%');
            }else
            {
              $(this).attr("height",'100%');
            }
          }
        });
        window.clearTimeout(time);
      }
    },1);
  }

  smalltoBIG(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
    var head = n < 0? '欠': '';
    n = Math.abs(n);

    var s = '';

    for (var i = 0; i < fraction.length; i++)
    {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);

    for (var i = 0; i < unit[0].length && n > 0; i++)
    {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++)
      {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  }

}
