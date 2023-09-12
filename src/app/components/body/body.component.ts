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

  constructor (private servicio : QuestionsService){}

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

  getPreguntaActual ()
  {
    return this.dataQuestions.results[this.indiceActual];
  }

  getRespuestasDesordenadas ()
  {
    let pActual = this.getPreguntaActual();

    let respuestas = [
      pActual.correct_answer,
      ...pActual.incorrect_answers
    ];

    setTimeout(() => {

      let size = respuestas.length;
      let indiceActual = size - 1;

      while (indiceActual >= 0)
      {
        let indiceRandom = Math.floor(Math.random() * size);

        // Intercambia los elementos usando una variable temporal
        let temp = respuestas[indiceActual];
        respuestas[indiceActual] = respuestas[indiceRandom];
        respuestas[indiceRandom] = temp;

        indiceActual--;
      }

    }, 0);

    return respuestas;
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
