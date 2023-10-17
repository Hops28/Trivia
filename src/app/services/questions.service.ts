import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Questions } from '../models/Questions.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {

  private url : string = "https://opentdb.com/api.php?amount=10"

  // https://opentdb.com/api.php?amount=10&type=boolean

  constructor(private HTTP: HttpClient) { }

  /**
   * getQuestions
  :   */
  public getQuestions() : Observable<Questions> {
    return this.HTTP.get<Questions>(this.url);
  }
}
