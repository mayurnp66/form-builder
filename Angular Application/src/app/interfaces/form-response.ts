import { Observable } from "rxjs";
import { QuestionBase } from "./question-base";

export interface FormResponse {
    error: boolean;
    data: {
        id: number,
        form_title: string,
        form_questions: QuestionBase<any>[]
    };
}