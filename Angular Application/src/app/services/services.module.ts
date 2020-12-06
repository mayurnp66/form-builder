import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormService } from './form/form.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { AuthServicesService } from './auth-services/auth-services.service';
import { QuestionControlService } from './question-control/question-control.service';
import { QuestionService } from './question/question.service';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [],
	providers: [
		FormService,
		AuthServicesService,
		AuthGuardService,
		QuestionControlService,
		QuestionService
	]
})
export class ServicesModule { }
