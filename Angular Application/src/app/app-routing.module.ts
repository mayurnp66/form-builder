import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './public/authentication/authentication.component';
import { SurveyComponent } from './secure/survey/survey/survey.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'authentication',
		pathMatch: 'full'
	},
	{
		path: 'authentication',
		component: AuthenticationComponent,
		pathMatch: 'full'
	},
	{
		path: 'survey',
		component: SurveyComponent,
		pathMatch: 'full',
		canActivate: [AuthGuardService]
	},
	{
		path: '**',
		redirectTo: 'authentication',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
