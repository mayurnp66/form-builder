import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UISupportModule } from 'src/app/modules/ui-support/ui-support.module';
import { FormSupportModule } from 'src/app/modules/form-support/form-support.module';
import { SurveyComponent } from './survey/survey.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyFormQuestionComponent } from './survey-form-question/survey-form-question.component';

@NgModule({
  imports: [
    CommonModule,
		UISupportModule,
    FormSupportModule
  ],
  declarations: [SurveyComponent, SurveyFormComponent, SurveyFormQuestionComponent]
})
export class SurveyModule { }
