import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './public/authentication/authentication.component';
import { SurveyFormComponent } from './secure/survey/survey-form/survey-form.component';
import { SurveyComponent } from './secure/survey/survey/survey.component';

const routes: Routes = [
	{
		path: '',
		component: AuthenticationComponent,
		pathMatch: 'full'
	},
	{
		path: 'survey',
		component: SurveyComponent,
		pathMatch: 'full'
	}
// {
// 	path: '',
// 	loadChildren: '/authentication.module#AuthenticationModule',
// }, {
// 	path: '**',
// 	loadChildren: '/authentication.module#AuthenticationModule'
// }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
