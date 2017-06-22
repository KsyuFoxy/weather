import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { ColorSpectrumDirective } from './colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather in your City!';
  cityName: string;
  data: any;
  // cityName = 'London,uk';
  weatherLink: string;
  weather = false;
  inputValue;
  @Input() input: string;
  @Output() inputChange = new EventEmitter();

  weatherImag = './images/SunCloud.png';
  http: Http;

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

          this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.cityName + '&appid=2e24ce1a5691ac298a7d48bb0d69efc9').subscribe( response => {
            this.data = response.json();
            console.log('data', this.data);
        });

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
