import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxsModule} from '@ngxs/store';
import { environment } from 'src/environments/environment';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const config: SocketIoConfig = { url: 'https://smarthome-backend.herokuapp.com/', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgbModule,
    FontAwesomeModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
