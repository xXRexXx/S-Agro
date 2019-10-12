import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private websocket: any;
  private humidity:any;
  private moisture:any;
  private temp:any;
  constructor() { 
  }

  init(){

    this.websocket = new WebSocket('wss://damp-reaches-33149.herokuapp.com');

     this.websocket.onopen = function(evt) {
        console.log('CONNECTED');
     };

     this.websocket.onclose = function(evt) {
        console.log('DISCONNECTED');
        console.log('RECONNECT');
        setTimeout(function(){ scope.init(); }, 3000);
     };

     const scope = this;
     this.websocket.onmessage = function(evt) {
          const wsData = JSON.parse(evt.data);
          if (wsData.APP_ID === 'SAGS') {
            if(wsData.body.from == "arduino"){
              scope.sethumidity(wsData.body.data.humidity);
              scope.setmoisture(wsData.body.data.soilmoisture);
              scope.setTemp(wsData.body.data.temperature);
            }
          }
     };

     this.websocket.onerror = function(evt) {
          console.log(evt.data);
     };
  }

  send(data){
    let msg = {
      APP_ID: 'SACS',
      body: {
        from: "app",
        data:data
      }
    };
    console.log(msg);
    this.websocket.send(JSON.stringify(msg));
  }

  sethumidity(humidity){
    this.humidity = humidity;
  }

  gethumidity(){
    return this.humidity;
  }

  setmoisture(moisture){
    this.moisture = moisture;
  }

  getmoisture(){
    return this.moisture;
  }

  setTemp(temp){
    this.temp = temp;
  }

  getTemp(){
    return this.temp;
  }
}