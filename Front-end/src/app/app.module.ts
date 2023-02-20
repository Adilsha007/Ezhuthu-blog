import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './home/home.component';
import { AppReducer } from './store/app.state';
import { AuthEffects } from './auth/state/auth.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ProfileComponent } from './profile/user-profile/profile.component';
import { AuthTokenInterceptor } from './services/athToken.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SpinnerComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
