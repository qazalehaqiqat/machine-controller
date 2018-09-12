import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

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

  color = ["#b50804", "#85860F"];

  // constructor(public navCtrl: NavController) {

  // }
  constructor(private http: HttpClient) {
    this.URL = "192.168.4.1";
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
    else {
      console.log("Move Left ? : ", this.leftMove)
      const body = new HttpParams()
      url = 'http://' + this.URL + "/stop"
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
    else {
      console.log("Move Up ? : ", this.upMove)
      const body = new HttpParams()
      url = 'http://' + this.URL + "/stop"
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
    else {
      console.log("Move Back ? : ", this.backMove)
      const body = new HttpParams()
       url = 'http://' + this.URL + "/stop"
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
        'Access-Control-Allow-Origin':'*',
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
