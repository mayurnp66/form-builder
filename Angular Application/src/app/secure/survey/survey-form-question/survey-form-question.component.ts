import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/interfaces/question-base';

@Component({
  selector: 'app-survey-form-question',
  templateUrl: './survey-form-question.component.html',
  styleUrls: ['./survey-form-question.component.css']
})
export class SurveyFormQuestionComponent implements OnInit {

  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

  get isInvalid() {
    return this.form.controls[this.question.key].invalid && this.form.controls[this.question.key].touched;
  }

  onChangeCheckbox($event) {
    console.log($event);
  }

}
