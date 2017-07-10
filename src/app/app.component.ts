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
  // data: any;
  weatherLink: string;
  weather = false;
  inputValue;
  @Input() input: string;
  @Output() inputChange = new EventEmitter();

  http: Http;
  temp;
  weatherImag;

  data = {"coord":{"lon":13.41,"lat":52.52},
            "weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],
            "base":"stations",
            "main":{"temp":20.49,"pressure":1008,"humidity":64,"temp_min":20,"temp_max":21},
            "visibility":10000,
            "wind":{"speed":2.1,"deg":70},
            "clouds":{"all":0},
            "dt":1499671200,
            "sys":{"type":1,"id":4892,"message":0.0021,"country":"DE","sunrise":1499655377,"sunset":1499714801},
            "id":2950159,
            "name":"Berlin",
            "cod":200}
forecast: any;
showForecast = true;
fDay;
fDays = [];
forecustButton = 'Show Forecast';


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
  // getWeather(input: string) {
  //     if (input) {
  //         this.cityName = input;
  //         const options = new RequestOptions({withCredentials: true});
  //       //   this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9', options).subscribe( response => {
  //         this.http.get('http://ec2-52-59-160-108.eu-central-1.compute.amazonaws.com/api/single-weather?city=' + this.cityName, options).subscribe( response => {
  //           this.data = response.json();
  //           this.weatherImag = './src/app/images/'+ this.data.weather[0].icon + '.png';
  //           this.temp = this.data.main.temp;
  //       });
  //         this.weather = true;
  //         this.inputValue = input;
  //     } else if (input = ' ') {
  //         console.log('nothing choosen');
  //     }
//       this.getForecast();
  // }

  getWeather(input: string) {
      if (input) {
          this.cityName = input;
          this.weatherImag = './src/app/images/'+ this.data.weather[0].icon + '.png';
          this.temp = this.data.main.temp;
          console.log('data', this.data);
          this.weather = true;
          this.inputValue = input;
      } else if (input = ' ') {
          console.log('nothing choosen');
      }
      this.getForecast();
  }
  getForecast() {
      this.showForecast = !this.showForecast;
      if (this.showForecast == true) {
            this.fDays.length = 0;
            this.forecustButton = 'Hide Forecast';
      } else {
          this.forecustButton = 'Show Forecast';
      }

      var monthNames = [ " ", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Augt", "Sep", "Oct", "Nov", "Dec" ];

      this.http.get('./src/app/images/forecast.json')
        .subscribe(res => this.forecast = res.json());
        for (var i = 0; i < this.forecast.list.length; i+=8) {
            var date = this.forecast.list[i].dt_txt.slice(8, 11);
            var monthIndex = this.forecast.list[i].dt_txt.slice(5, 7);
            if (monthIndex < 10) {
                monthIndex = this.forecast.list[i].dt_txt.slice(6, 7);
            } else if (monthIndex >= 10) {
                monthIndex = this.forecast.list[i].dt_txt.slice(5, 7);
            }
            var day = {
                date: date + ' ' + monthNames[monthIndex],
                temp: this.forecast.list[i].main.temp.toFixed(0),
                icon: './src/app/images/' + this.forecast.list[i].weather[0].icon + '.png'
            }
            this.fDay = day;
            var days = this.fDays.push(day);
        }
            console.log('fDays', this.fDays);
  }

  closeWeather() {
      this.weather = false;
      this.fDays = [];
      this.showForecast = true;
      this.inputValue = '';
      this.input = '';
  }


}
