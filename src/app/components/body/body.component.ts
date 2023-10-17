import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
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
  // Objeto que contiene todas las preguntas obtenidas de la API
  dataQuestions : Questions = {
    response_code: 0,
    results: []
  };

  // Variable que va cambiando a medida que se pasa la pregunta
  indiceActual : number = 0;

  // Arreglo que almacena las respuestas de la pregunta actual
  respuestas : Array<string> = [];

  // Variable que contabiliza las preguntas que fueron respondidas correctamente
  preguntasCorrectas : number = 0;

  // variable que va a funcionar para las animaciones
claseTitulo :  string = "animate__animated animate__fadeIn";
claseLista :  string = "animate__animated animate__fadeIn";

  // Elemento HTML del botón siguiente
  btnSiguiente : HTMLElement | null = document.querySelector("#btnSiguiente");

  constructor (private servicio : QuestionsService, private cd : ChangeDetectorRef){}

  /**************************************************/

  ngOnInit (): void {
    this.obtenerDatos();
  }

  // Función que actualiza y desordena las respuestas de la pregunta actual
  respuestasDesordenadas ()
  {
    this.respuestas = [
      this.preguntaActual.correct_answer,
      ...this.preguntaActual.incorrect_answers ?? []
    ];

    this.respuestas.sort(() => Math.random() - 0.5);
  }

  // Función que obtiene los datos de la API
  obtenerDatos ()
  {
    this.servicio.getQuestions().subscribe(data => {
      this.dataQuestions = data;
      this.indiceActual = 0;

      this.respuestasDesordenadas();
    })
  }

  // Función que cambia la pregunta actual a la siguiente
  cambiarPregunta ()
  {
    if (this.indiceActual < 10)
    {
      let input_name = "pregunta_" + this.indiceActual;
      let respuestaSeleccionada = document.querySelector<HTMLInputElement>("input[name='" + input_name + "']:checked")?.value ?? "";

      // let palabras = respuestaSeleccionada.split(" ");

      // Se obtiene el label que hace referencia al radioButton
      let label = document.querySelector<HTMLLabelElement>('label[for="qst' + respuestaSeleccionada +'"]');

      /*****************************************************/

      if (respuestaSeleccionada == this.dataQuestions.results[this.indiceActual].correct_answer) {
        if (label?.style)
        {
          label.style.backgroundColor = '#008800';

          // Se contabilizan la cantidad de preguntas contestadas correctamente
          this.preguntasCorrectas++;
        }
      }
      else {
        if (label?.style)
        {
          let correctlabel = document.querySelector<HTMLLabelElement>('label[for="qst' + this.dataQuestions.results[this.indiceActual].correct_answer + '"]');

          // De alguna manera esto funciona, es para asegurarse de que todo funcione en caso de que sea null
          if (correctlabel?.style)
          {
            correctlabel.style.backgroundColor = '#558888';
          }

          label.style.backgroundColor = '#FF0000';
        }
      }

      setTimeout(() => {
        if (this.indiceActual + 1 < 10)
        {
          this.claseLista = "animate__animated animate__fadeOutLeft animate__faster";
          this.claseTitulo = "animate__animated animate__fadeOut animate__faster";

          setTimeout(() => {
            this.claseLista = "animate__animated animate__fadeInRight animate__faster";
            this.claseTitulo = "animate__animated animate__fadeIn";

            // Se colorean las respuestas por si acaso
            let respuestasElement = document.getElementsByClassName("resps");
            let respuestasElementInput = document.getElementsByClassName("respinput");

            for (var i = 0; i < respuestasElement.length; i++) {
              // Accede a cada elemento individualmente
              var elemento = respuestasElement[i] as HTMLLabelElement;
              var elementoInput = respuestasElementInput[i] as HTMLInputElement;
              // Realiza operaciones en cada elemento

              elementoInput.checked = false;
              elemento.removeAttribute("style");
            }

            this.indiceActual++;

            // Se desordenan
            this.respuestasDesordenadas();

            console.log(respuestasElement);

            // this.revolver();
          }, 500)
        }
      }, 1500);

      this.BotonSiguiente(0);

      /*****************************************************/
    }
  }

  // Función que activa el botón hasta que se seleccione alguna respuesta
  BotonSiguiente(modo : number) {
    let boton = document.getElementById("btnSiguiente") as HTMLButtonElement;

    if (modo == 1)
    {
      if (boton?.disabled)
      {
        if (boton.disabled)
        {
          boton.disabled = false;
        }
      }
    }
    else
    {
      boton.disabled = true;
    }
  }

  /**************************************************/

  // Getter que devuelve la pregunta actual
  get preguntaActual ()
  {
      return this.dataQuestions.results[this.indiceActual] ?? "";
  }
}

