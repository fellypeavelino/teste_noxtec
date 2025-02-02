import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContatoModule } from './contato/contato.module';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    //HttpClient,
    RouterModule.forRoot(routes),
    ContatoModule
  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient()] 
})
export class AppModule {}
