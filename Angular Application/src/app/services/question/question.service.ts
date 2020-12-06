import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormResponse } from 'src/app/interfaces/form-response';
import { QuestionBase } from 'src/app/interfaces/question-base';
import { DropdownQuestion } from 'src/app/interfaces/question-dropdown';
import { TextboxQuestion } from 'src/app/interfaces/question-textbox';
import { environment } from 'src/environments/environment';

@Injectable()
export class QuestionService {

  private BASE_URL = environment.apiUrl;
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(
		private http: HttpClient,
		public router: Router
  ) { }

  getFormQuestionsByFormId(params: number): Observable<QuestionBase<any>[]> {
		return this.http.post(`${this.BASE_URL}getFormById`, JSON.stringify({formId: params}), this.httpOptions).pipe(
			map(
				(response: FormResponse) => {
          console.log('form_questions', response.data.form_questions);
					return response.data.form_questions.sort((a, b) => a.order - b.order);
				},
				(error) => {
					throw error;
				}
			)
		);
  }
}