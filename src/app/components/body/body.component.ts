import { ChangeDetectorRef, Component } from '@angular/core';
import { map } from 'rxjs';
import { Questions, Result } from 'src/app/models/Questions.types';
import { QuestionsService } from 'src/app/services/questions.service';
// import { unescapeHtml } from '@angular/common/pipes';
// import { util } from 'util';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})

export class BodyComponent {
  dataQuestions : Questions = {
    response_code: 0,
    results: []
  };

  indiceActual : number = 0;
  respuestas : Array<string> = [];

  constructor (private servicio : QuestionsService, private cd : ChangeDetectorRef){}

  /**************************************************/

  ngOnInit (): void {
    this.obtenerDatos();
  }

  obtenerDatos ()
  {
    this.servicio.getQuestions().subscribe(data => {
      this.dataQuestions = data;
      this.indiceActual = 0;
    })
  }

  /**************************************************/

  get preguntaActual ()
  {
      return this.dataQuestions.results[this.indiceActual] ?? "";
  }

  get respuestasDesordenadas ()
  {
    let pActual = this.preguntaActual;

    this.respuestas = [
      pActual.correct_answer,
      ...pActual.incorrect_answers ?? []
    ];

    this.revolver();

    // respuestas.sort(() => Math.random() - 0.5);

    return this.respuestas;
  }

  /*****************************************************/

  revolver ()
  {
    let size = this.respuestas.length;
    let indiceActual = size - 1;

    // setTimeout(() => {
      while (indiceActual >= 0)
      {
        let indiceRandom = Math.floor(Math.random() * size);

        // Intercambia los elementos usando una variable temporal
        let temp = this.respuestas[indiceActual];
        this.respuestas[indiceActual] = this.respuestas[indiceRandom];
        this.respuestas[indiceRandom] = temp;

        indiceActual--;
      }
    // }, 0);
  }

  cambiarPregunta (tipo : number) {
    if (tipo == 1)
    {
      this.indiceActual++;
      if (this.indiceActual >= this.dataQuestions.results.length) {
        this.indiceActual = 0;
      }
    }
    else if (tipo == 0){
      this.indiceActual--;
      if (this.indiceActual < 0) {
        this.indiceActual = this.dataQuestions.results.length - 1;
      }
    }

    // this.cd.detectChanges();

    console.log(this.dataQuestions);
  }
}
