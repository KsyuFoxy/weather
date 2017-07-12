import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ColorSpectrumDirective } from './colors';
import { DragDropComponent } from './drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() input: string;
  @Output() inputChange = new EventEmitter();
  title = 'Weather in your City!';
  cityName: string;
  weatherLink: string;
  weather = false;
  emptyInput = false;
  showForecast = false;
  fDays = [];
  forecustButton = 'Show Forecast';
  forecast: any = {
      list: []
   };
  http: Http;
  inputValue;
  country;
  countryCode;
  temp;
  weatherImag;
  data: any;
  lon: number;
  lat: number;
  scroll: boolean = false;
  zoom = 5;
  mapMarker = './src/app/images/marker.png';
  j = 0;

  // data = { "coord":{"lon":13.41,"lat":52.52},
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
  //           "cod":200 }

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
    clearInput() {
        this.input = '';
        this.emptyInput = false;
    }
    closeWeather() {
        this.weather = false;
        this.fDays = [];
        this.showForecast = false;
        this.inputValue = '';
        this.input = '';
    }
  getWeather(input: string) {
      if (input) {
          this.emptyInput = false;
          this.cityName = input;
          const options = new RequestOptions({withCredentials: true});
          this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9&units=metric').subscribe( response => {
            this.data = response.json();
            this.weatherImag = './src/app/images/'+ this.data.weather[0].icon + '.png';
            this.temp = this.data.main.temp;
            this.weather = true;
            this.country = this.data.name;
            this.countryCode = this.data.sys.country;
            this.lon = this.data.coord.lon;
            this.lat = this.data.coord.lat;
        });
      } else if (input = ' ') {
            this.emptyInput = true;
        }
  }

    // getWeather(input: string) {
    //   if (input) {
    //       this.emptyInput = false;
    //       this.cityName = input;
    //       this.weatherImag = './src/app/images/'+ this.data.weather[0].icon + '.png';
    //       this.temp = this.data.main.temp;
    //       console.log('data', this.data);
    //       this.weather = true;
    //       this.country = this.data.name;
    //       this.countryCode = this.data.sys.country;
    //       this.lon = this.data.coord.lon;
    //       this.lat = this.data.coord.lat;
    //   } else if (input = ' ') {
    //       this.emptyInput = true;
    //   }
    // }

    showWeatherForecast() {
      this.showForecast = !this.showForecast;
      if (this.showForecast == true) {
            this.fDays.length = 0;
            this.forecustButton = 'Hide Forecast';
            this.getForecast()
      } else {
          this.forecustButton = 'Show Forecast';
      }
    }

    getForecast() {
      this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9&units=metric')
    //   this.http.get('./src/app/images/forecast.json')
        .subscribe(res => {
            this.forecast = res.json();
            for (var i = 0; i < this.forecast.list.length; i+=8) {
                var day = {
                    date: new Date(this.forecast.list[i].dt * 1000).toString().slice(4, 11),
                    temp: this.forecast.list[i].main.temp.toFixed(0),
                    icon: './src/app/images/' + this.forecast.list[i].weather[0].icon + '.png'
                }
                this.fDays.push(day);
            }
        })
    }

    // google map api key = AIzaSyDwd0o5Qr6o_D8sxyZdK2CJ_O0eYPxk8X8
    // map code https://maps.googleapis.com/maps/api/js?key=AIzaSyDwd0o5Qr6o_D8sxyZdK2CJ_O0eYPxk8X8&callback=initMap


    changeMarker() {
        var mapMarkerIcons = ['marker3.png', 'marker2.png', 'marker.png'];
        this.mapMarker = './src/app/images/' + mapMarkerIcons[this.j];
        if (this.j < mapMarkerIcons.length) {
            this.j += 1;
        }
        if (this.j ===  mapMarkerIcons.length ) {
            this.j = 0;
        }
    }
}
