import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  URL: String;
  rightMove : Boolean = false;
  leftMove: Boolean = false;
  upMove: Boolean = false;
  backMove: Boolean = false;
  enableRight: Boolean = false;
  enableLeft: Boolean = false;
  enableUp: Boolean = false;
  enableBack: Boolean = false;
  
  color = ["#b50804","#85860F"];
  
  // constructor(public navCtrl: NavController) {

  // }
  constructor(private http: HttpClient) {
    this.URL = "http://192.168.4.2/";
}
 Right(){
  this.enableRight = true;
  this.rightMove = !this.rightMove; 
  this.leftMove = false;
  this.upMove = false;
  this.backMove = false; 
  if(this.rightMove){
    console.log("Move Right ? : ", this.rightMove)    
    const body = new HttpParams()
    var url  = this.URL + "right"
    console.log("url ? : ", url)    
    return this.http.post(url , decodeURIComponent(body.toString()))
  }
  else{
    console.log("Move Right ? : ", this.rightMove)
    const body = new HttpParams()
    url  = this.URL + "stop"
    console.log("url ? : ", url)    
    return this.http.post(url , decodeURIComponent(body.toString()))
  }
}
Left(){
  this.enableLeft = true;
  this.leftMove = !this.leftMove; 
  this.rightMove = false;
  this.upMove = false;
  this.backMove = false 
  if(this.leftMove){
    console.log("Move left ? : ", this.leftMove)    
    const body = new HttpParams()
    var url  = this.URL + "left"
    console.log("url ? : ", url)  
    return this.http.post(url , decodeURIComponent(body.toString()))
  }
  else{
    console.log("Move Left ? : ", this.leftMove)
    const body = new HttpParams()
    url  = this.URL + "stop"
    console.log("url ? : ", url)    
    return this.http.post(url , decodeURIComponent(body.toString()))
  }
  }
  Up(){
    this.enableUp = true;
    this.upMove = !this.upMove; 
    this.leftMove = false;
    this.rightMove = false;
    this.backMove = false 
    if(this.upMove){
      console.log("Move up ? : ", this.upMove)    
      const body = new HttpParams()
      var url  = this.URL + "forward"
      console.log("url ? : ", url)
      return this.http.post(url , decodeURIComponent(body.toString()))
    }  
    else{
      console.log("Move Up ? : ", this.upMove)
      const body = new HttpParams()
      url  = this.URL + "stop"
      console.log("url ? : ", url)    
      return this.http.post(url , decodeURIComponent(body.toString()))
    }
    }
    Back(){
      this.enableBack = true;
      this.backMove = !this.backMove; 
      this.leftMove = false;
      this.upMove = false;
      this.rightMove = false
      if(this.backMove){
        console.log("Move back ? : ", this.backMove)    
        const body = new HttpParams()
        var url  = this.URL + "backward"
        console.log("url ? : ", url)
        return this.http.post(url , decodeURIComponent(body.toString()))
      }  
      else{
        console.log("Move Back ? : ", this.backMove)
        const body = new HttpParams()
        url  = this.URL + "stop"
        console.log("url ? : ", url)    
        return this.http.post(url , decodeURIComponent(body.toString()))
      }   
      }
}
