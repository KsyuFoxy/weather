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
  cityName: string = 'test';
  data: any;
  // cityName = 'London,uk';
  weatherLink: string;
  weather = false;
  inputValue;
  @Input() input: string;
  @Output() inputChange = new EventEmitter();

  weatherImagBW = './src/app/images/Sun_BW.png';
  weatherImag = './src/app/images/Sun.png';
  http: Http;

constructor(http: Http) {
    this.http = http;
    // axios.get('http://ec2-52-59-160-108.eu-central-1.compute.amazonaws.com:9000/weather?city=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9')
    // .catch(e => console.log('error: ', e))
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
        //   const options = new RequestOptions({withCredentials: true});
        //   this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9', options).subscribe( response => {
        //     this.data = response.json();
        //     console.log('data', this.data);
        // });

          console.log('cityName', this.cityName);
          this.weather = true;
          this.inputValue = input;
      } else if (input = ' ') {
          console.log('nothing choosen');
      }
  }
  closeWeather() {
      this.weather = false;
      this.inputValue = '';
  }


}
