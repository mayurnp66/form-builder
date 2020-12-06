import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormResponse } from 'src/app/interfaces/form-response';
import { QuestionBase } from 'src/app/interfaces/question-base';
import { QuestionService } from 'src/app/services/question/question.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  formResponse: FormResponse;
  questions$: Observable<QuestionBase<any>[]>;
  
  constructor(
	private questionService: QuestionService
  ) {
	  this.questions$ = questionService.getFormQuestionsByFormId(1);
  }

  ngOnInit() {
  }

}
