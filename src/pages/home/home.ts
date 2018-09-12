import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import nipplejs from 'nipplejs';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  URL: String;
  httpOptions;
  rightMove: Boolean = false;
  leftMove: Boolean = false;
  upMove: Boolean = false;
  backMove: Boolean = false;
  enableRight: Boolean = false;
  enableLeft: Boolean = false;
  enableUp: Boolean = false;
  enableBack: Boolean = false;
  y = this;
  color = ["#b50804", "#85860F"];

  // constructor(public navCtrl: NavController) {

  // }
  constructor(private http: HttpClient) {
    this.URL = "192.168.4.1";
    // let options = {
    //   zone: document.getElementById('zone_joystick')
    // };

  }

  ngAfterViewInit() {

    var k = this.y;
    var move = function (moveType) {
      k.Stop();
      if (moveType == 'dir:right')
        k.Right();
      else if (moveType == 'dir:left')
        k.Left()
      else if (moveType == 'dir:up')
        k.Up()
      else if (moveType == 'dir:down')
        k.Back()
    }
    var s = function (sel) {
      return document.querySelector(sel);
    };
    var sId = function (sel) {
      return document.getElementById(sel);
    };
    var removeClass = function (el, clss) {
      el.className = el.className.replace(new RegExp('\\b' + clss + ' ?\\b', 'g'), '');
    }
    var joysticks = {
      dynamic: {
        zone: s('.zone.dynamic'),
        color: 'blue',
        multitouch: true
      },
      semi: {
        zone: s('.zone.semi'),
        mode: 'semi',
        catchDistance: 150,
        color: 'white'
      },
      static: {
        zone: s('.zone.static'),
        mode: 'static',
        position: {
          left: '50%',
          top: '50%'
        },
        color: 'red'
      }
    };
    var joystick;

    // Get debug elements and map them
    // var elDebug = sId('debug');
    // var elDump = elDebug.querySelector('.dump');
    // var els = {
    //   position: {
    //     x: elDebug.querySelector('.position .x .data'),
    //     y: elDebug.querySelector('.position .y .data')
    //   },
    //   force: elDebug.querySelector('.force .data'),
    //   pressure: elDebug.querySelector('.pressure .data'),
    //   distance: elDebug.querySelector('.distance .data'),
    //   angle: {
    //     radian: elDebug.querySelector('.angle .radian .data'),
    //     degree: elDebug.querySelector('.angle .degree .data')
    //   },
    //   direction: {
    //     x: elDebug.querySelector('.direction .x .data'),
    //     y: elDebug.querySelector('.direction .y .data'),
    //     angle: elDebug.querySelector('.direction .angle .data')
    //   }
    // };

    // sId('buttons').onclick = createNipple;
    createNipple('dynamic');

    function bindNipple() {
      joystick.on('start', function (evt, data) {
        //dump(evt.type);
        //debug(data);
      }).on('move', function (evt, data) {
        //debug(data);
      }).on('end', function (evt, data) {
        k.Stop();
      })
        .on('dir:up  dir:left  dir:down ' +
          'dir:right ',
          function (evt, data) {
            move(evt.type)
            // dump(evt.type);
          }
        ).on('pressure', function (evt, data) {
          // debug({
          //   pressure: data
          // });
        }); 
    }

    function createNipple(evt) {
      var type = 'static'
      if (joystick) {
        joystick.destroy();
      } 
      removeClass(s('.zone.active'), 'active');
     // removeClass(s('.button.active'), 'active');
      //removeClass(s('.highlight.active'), 'active');
    //  s('.highlight.' + type).className += ' active';
     // s('.button.' + type).className += ' active';
      s('.zone.' + type).className += ' active';
      joystick = nipplejs.create(joysticks[type]);
      bindNipple();
    }

    // Print data into elements
    function debug(obj) {
      function parseObj(sub, el) {
        for (var i in sub) {
          if (typeof sub[i] === 'object' && el) {
            parseObj(sub[i], el[i]);
          } else if (el && el[i]) {
            el[i].innerHTML = sub[i];
          }
        }
      }
      setTimeout(function () {
        // parseObj(obj, els);
      }, 0);
    }

    var nbEvents = 0;

    // Dump data
    function dump(evt) {
      setTimeout(function () {
        // if (elDump.children.length > 4) {
        //   elDump.removeChild(elDump.firstChild);
        // }
        var newEvent = document.createElement('div');
        newEvent.innerHTML = '#' + nbEvents + ' : <span class="data">' +
          evt + '</span>';
        // elDump.appendChild(newEvent);
        nbEvents += 1;
      }, 0);
    }
    var options2 = {
      // zone: document.getElementById('semi'),                  // active zone
      color: String,
      size: 100,
      mode: "static",                   // 'dynamic', 'static' or 'semi'
      restJoystick: false,
      restOpacity: 0.5,            // opacity when not 'dynamic' and rested
      catchDistance: 200           // distance to recycle previous joystick in
      // 'semi' mode
    };
    // let manager = nipplejs.create(joysticks["static"]);

    // manager.on('added', function (evt, nipple) {
    //   nipple.on('start move end dir plain', function (evt) {
    //     // DO EVERYTHING
    //     console.log(evt)
    //   });
    // }).on('removed', function (evt, nipple) {
    //   nipple.off('start move end dir plain');
    // });
  }
  Stop() {
     
    this.rightMove = false;
    this.leftMove = false;
    this.upMove = false;
    this.backMove = false;
    console.log("Stop");
    this.initHeader()
    const body = new HttpParams()
    var url = 'http://' + this.URL + "/stop"
    console.log("url ? : ", url)
    return this.http.get(url).subscribe(datav => {
    }, err => {
      console.log(err)
    })
  }
  Right() {
    this.initHeader()
    this.enableRight = true;
    this.rightMove = !this.rightMove;
    this.leftMove = false;
    this.upMove = false;
    this.backMove = false;
    if (this.rightMove) {
      console.log("Move Right ? : ", this.rightMove)
      const body = new HttpParams()
      var url = 'http://' + this.URL + "/right"
      console.log("url ? : ", url)
      return this.http.get(url).subscribe(datav => {
        console.log(datav)
      }, err => {
        console.log(err)
      })
    }
    else {
      this.initHeader()
      console.log("Move Right ? : ", this.rightMove)
      const body = new HttpParams()
      url = 'http://' + this.URL + "/stop"
      console.log("url ? : ", url)
      return this.http.get(url).subscribe(datav => {
      }, err => {
        console.log(err)
      })
    }
  }
  Left() {
    this.initHeader()
    this.enableLeft = true;
    this.leftMove = !this.leftMove;
    this.rightMove = false;
    this.upMove = false;
    this.backMove = false
    if (this.leftMove) {
      console.log("Move left ? : ", this.leftMove)
      const body = new HttpParams()
      var url = 'http://' + this.URL + "/left"
      console.log("url ? : ", url)
      return this.http.get(url).subscribe(datav => {
      }, err => {
        console.log(err)
      })
    }
  }
  Up() {
    this.initHeader()
    this.enableUp = true;
    this.upMove = !this.upMove;
    this.leftMove = false;
    this.rightMove = false;
    this.backMove = false
    if (this.upMove) {
      console.log("Move up ? : ", this.upMove)
      const body = new HttpParams()
      var url = 'http://' + this.URL + "/forward"
      console.log("url ? : ", url)
      return this.http.get(url).subscribe(datav => {
      }, err => {
        console.log(err)
      })


    }
  }
  Back() {
    this.initHeader()
    this.enableBack = true;
    this.backMove = !this.backMove;
    this.leftMove = false;
    this.upMove = false;
    this.rightMove = false
    if (this.backMove) {
      console.log("Move back ? : ", this.backMove)
      const body = new HttpParams()
      var url = 'http://' + this.URL + "/backward"
      console.log("url ? : ", url)
      return this.http.get(url).subscribe(datav => {
      }, err => {
        console.log(err)
      })

    }
  }
  initHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Accept': 'application/json',
        'content-type': 'application/json'
      }),
    }
    // var headers = new Headers();
    // headers.append('Access-Control-Allow-Origin' , '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers.append('Accept','application/json');
    // headers.append('content-type','application/json');
    // this.httpOptions = new RequestOptions({ headers:headers});
  }
}
