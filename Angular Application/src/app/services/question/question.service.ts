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

  // TODO: get from a remote source of question metadata
  // formQuestions = [
  //   {
  //     key: 'firstName',
  //     label: 'First Name',
  //     value: null,
  //     required: true,
  //     order: 1,
  //     type: 'text',
  //     controlType: 'textbox',
  //     options: null
  //   },
  //   {
  //     key: 'lastName',
  //     label: 'Last Name',
  //     value: 'hello',
  //     required: true,
  //     order: 2,
  //     type: 'text',
  //     controlType: 'textbox',
  //     options: null
  //   },
  //   {
  //     key: 'gender',
  //     label: 'Gender',
  //     value: null,
  //     required: true,
  //     order: 3,
  //     type: 'text',
  //     controlType: 'dropdown',
  //     options: [
  //       { key: 'male', value: 'Male'},
  //       { key: 'female', value: 'Female'}
  //     ]
  //   }
  // ];

  getQuestions() {

    // const questions: QuestionBase<string>[] = this.getFormById;
    // return of(questions.sort((a, b) => a.order - b.order));
  }

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

  // getQuestions() {

  //   const questions: QuestionBase<string>[] = [

  //     new DropdownQuestion({
  //       key: 'brave',
  //       label: 'Bravery Rating',
  //       options: [
  //         { key: 'solid', value: 'Solid' },
  //         { key: 'great', value: 'Great' },
  //         { key: 'good', value: 'Good' },
  //         { key: 'unproven', value: 'Unproven' }
  //       ],
  //       order: 3
  //     }),

  //     new TextboxQuestion({
  //       key: 'firstName',
  //       label: 'First name',
  //       value: 'Bombasto',
  //       required: true,
  //       order: 1
  //     }),

  //     new TextboxQuestion({
  //       key: 'emailAddress',
  //       label: 'Email',
  //       type: 'email',
  //       order: 2
  //     })
  //   ];

  //   return of(questions.sort((a, b) => a.order - b.order));
  // }
}