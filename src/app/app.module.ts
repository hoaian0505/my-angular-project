import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DogListComponent } from './components/dog-list/dog-list.component';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DetailPageComponent } from './components/dog-list/detail-page/detail-page.component';
import { LikesPageComponent } from './components/like-page/like-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DogListComponent,
    SpinnerComponent,
    DetailPageComponent,
    LikesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HammerModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
