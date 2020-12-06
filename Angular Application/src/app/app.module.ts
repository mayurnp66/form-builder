import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ServicesModule } from './services/services.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './public/authentication/authentication.module';
import { SurveyModule } from './secure/survey/survey.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		ServicesModule,
		AuthenticationModule,
		SurveyModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
