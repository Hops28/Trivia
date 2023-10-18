# Prueba1Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.2.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

---

# Trivia

Haciendo prueba con consumo de API en Angular, es un proyecto que consiste en una trivia de preguntas de diferente categoría y dificultad, y tendrás que elegir la respuesta correcta

## ¿En qué consiste?

Básicamente se trata de responder 10 preguntas, tal como una trivia cualquiera, consta de cualquier tipo de categoría, la dificultad puede variar (Fácil, medio, difícil) en el cual te pueden aparecer preguntas de verdadero y falso o simplemente preguntas donde tengas que seleccionar una de las 4 respuestas.

### Primera vista

Estas son las primeras impresiones sobre el proyecto, la preguntas siempre va a variar:

![Primera impresión](/src/assets/Captura1.png)

Si seleccionamos una de las opciones, podremos ver cuál tenemos seleccionada porque cambiará de color:

![Seleccionado](/src/assets/Captura2.png)

Una vez que estamos seguros de cuál es la respuesta, damos click al botón 'next' para verificar si la respuesta era correcta o no.

![Verificación](/src/assets/Captura3.png)

Una vez que damos click en 'next' nos daremos cuenta si la respuesta era correcta o no (En este caso la respuesta fué correcta).

Y si seleccionamos una respuesta incorrecta se mostrará de color rojo, tal como se muestra en la siguiente imagen:

![Incorrecta](/src/assets/Captura4.png)

Podremos notar que además de habernos dado cuenta que la respuesta seleccionada fué la incorrecta, también se nos permitirá saber cuál era la respuesta correcta, tal como se muestra en la imagen antes mostrada.

---

### Este proyecto aún sigue en desarrollo, estas son las cosas que están pensadas implementar en el futuro:

- Cambio de idioma de inglés a español y viceversa.
- Editar la cantidad de preguntas que queremos responder.
- Agregar un filtro sobre las categorías y las dificultades de las preguntas que queremos responder.
- Agregar alguna animación o algo para indicar que ha terminado de responder todas las preguntas, además de mostrar el puntaje conseguido.
