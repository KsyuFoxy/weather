import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ColorSpectrumDirective } from './colors';

@NgModule({
  declarations: [
    AppComponent,
    ColorSpectrumDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDwd0o5Qr6o_D8sxyZdK2CJ_O0eYPxk8X8'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
