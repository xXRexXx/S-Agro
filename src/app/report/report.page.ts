import { Component, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';

import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  temperature;
  moisture;
  hummidity;
  historyhumidity;
  historymoisture;
  historytemperature;
  constructor(private toastController: ToastController, private ws:WebsocketService) { 
    this.historyhumidity = [];
    this.historymoisture = [];
    this.historytemperature = [];
  }

  getTemp(){
    return this.ws.getTemp();
  }

  gethumidity(){
    return this.ws.gethumidity();
  }

  getmoisture(){
    return this.ws.getmoisture();
  }

  ngOnInit() {
    this.temperature = 7;
    // this.moisture = 7;
    this.addToHistory();
  }

  addToHistory(){
    let scope = this;
    setInterval(function(){
      let temperature = scope.ws.getTemp();
      let humidity = scope.ws.gethumidity();
      let moisture = scope.ws.getmoisture();
      if(temperature){
        let date = new Date();
        let time = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())  
          + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " 
          + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" 
          + (date.getMinutes() < 10 ? "0" + date.getMinutes(): date.getMinutes()) + ":" 
          + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()); 
        let data = {
          timestamp: time,
          level: temperature,
          level1: humidity,
          level2: moisture,
        }
        scope.historytemperature.push(data);
      }
    }, 1000);
  }

}
