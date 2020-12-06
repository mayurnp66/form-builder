import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/interfaces/question-base';
import { QuestionControlService } from 'src/app/services/question-control/question-control.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit, OnChanges {

  @Input() questions: QuestionBase<string>[]  = [];
  form: FormGroup;
  showForm = false;
  payLoad = '';

  constructor(private questionControlService: QuestionControlService) { }

  ngOnChanges() {
    if (this.questions) {
      this.form = this.questionControlService.toFormGroup(this.questions);
      this.showForm = true;
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}
