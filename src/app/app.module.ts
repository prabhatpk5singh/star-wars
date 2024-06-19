import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'; // Import HttpClientModule
import { JoinArrayPipe } from './pipes/join-array.pipes';
import { HomeComponent } from './home/home.component'; // Import your HomeComponent
import { ProfileComponent } from './profile/profile.component'; // Import your ProfileComponent

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    JoinArrayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule // Include HttpClientModule in imports
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
