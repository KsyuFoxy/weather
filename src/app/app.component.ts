import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import axios from 'axios';
import { ColorSpectrumDirective } from './colors';
axios.defaults.withCredentials = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather in your City!';
  cityName: string;
  data: any;
  weatherLink: string;
  weather = false;
  inputValue;
  @Input() input: string;
  @Output() inputChange = new EventEmitter();

  http: Http;
  temp;
  weatherImag;

  // data = {"coord":{"lon":13.41,"lat":52.52},
  //           "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
  //           "base":"stations",
  //           "main":{"temp":20.49,"pressure":1008,"humidity":64,"temp_min":20,"temp_max":21},
  //           "visibility":10000,
  //           "wind":{"speed":2.1,"deg":70},
  //           "clouds":{"all":0},
  //           "dt":1499671200,
  //           "sys":{"type":1,"id":4892,"message":0.0021,"country":"DE","sunrise":1499655377,"sunset":1499714801},
  //           "id":2950159,
  //           "name":"Berlin",
  //           "cod":200}


constructor(http: Http) {
    this.http = http;
}

    changeInput(newInput) {
        this.input = newInput;
        this.inputChange.emit(newInput);
        if (newInput == '') {
            this.closeWeather();
        }
    }
  getWeather(input: string) {
      if (input) {
          this.cityName = input;
          const options = new RequestOptions({withCredentials: true});
        //   this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9', options).subscribe( response => {
          this.http.get('http://ec2-52-59-160-108.eu-central-1.compute.amazonaws.com/api/single-weather?city=' + this.cityName, options).subscribe( response => {
            this.data = response.json();
            console.log('data', this.data);
            this.weatherImag = './src/app/images/'+ this.data.weather[0].icon + '.png';
            this.temp = this.data.main.temp;
        });
          this.weather = true;
          this.inputValue = input;
      } else if (input = ' ') {
          console.log('nothing choosen');
      }
  }

  // getWeather(input: string) {
  //     if (input) {
  //         this.cityName = input;
  //         this.weatherImag = './src/app/images/'+ this.data.weather[0].icon + '.png';
  //         this.temp = this.data.main.temp;
  //         console.log('data', this.data);
  //         this.weather = true;
  //         this.inputValue = input;
  //     } else if (input = ' ') {
  //         console.log('nothing choosen');
  //     }
  // }

  closeWeather() {
      this.weather = false;
      this.inputValue = '';
  }


}
