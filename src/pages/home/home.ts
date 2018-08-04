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
  color = ["#b50804","#85860F"];
  
  // constructor(public navCtrl: NavController) {

  // }
  constructor(private http: HttpClient) {
    this.URL = "http://192.168.4.2/";
    
}
 Right(){
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
  this.leftMove = !this.leftMove;  
  if(this.leftMove){
    console.log("Move left ? : ", this.leftMove)    
    const body = new HttpParams()
    var url  = this.URL + "left"
    console.log("url ? : ", url)  
    return this.http.post(url , decodeURIComponent(body.toString()))
  }
  console.log("Move Left ? : ", this.leftMove)
  }
  Up(){
    this.upMove = !this.upMove;  
    if(this.upMove){
      console.log("Move up ? : ", this.upMove)    
      const body = new HttpParams()
      var url  = this.URL + "forward"
      console.log("url ? : ", url)
      return this.http.post(url , decodeURIComponent(body.toString()))
    }  
    console.log("Move Up ? : ", this.upMove)
    }
    Back(){
      this.backMove = !this.backMove; 
      if(this.backMove){
        console.log("Move back ? : ", this.backMove)    
        const body = new HttpParams()
        var url  = this.URL + "backward"
        console.log("url ? : ", url)
        return this.http.post(url , decodeURIComponent(body.toString()))
      }     
      console.log("Move Back ? : ", this.backMove)
      }
}
