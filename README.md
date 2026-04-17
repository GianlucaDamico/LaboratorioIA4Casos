Decision Pilot IA

Miniaplicación web educativa para estructurar decisiones complejas con ayuda de IA. Está pensada para su publicación en GitHub Pages y para trabajar con cuatro casos de uso distintos dentro de un mismo entorno sencillo y accesible desde el navegador.

Objetivo

El objetivo de Decision Pilot IA es ayudar a formular decisiones de manera ordenada y razonada. La aplicación no decide por sí sola: guía al usuario para definir el contexto, la decisión real a tomar, los datos disponibles, las restricciones y el punto en el que debe mantenerse el control humano.

Qué problema resuelve

En muchos trabajos con IA se cae en el error de pedir una respuesta directa sin estructurar bien el problema. Esta app resuelve eso obligando a construir un prompt más completo, comparable y útil para el análisis. Así, el usuario no solo obtiene una recomendación, sino una base más clara para justificarla y revisarla.

Casos incluidos

La aplicación incluye cuatro escenarios precargados:

Admisión y becas universitarias
Para analizar si conviene usar IA en la prevalidación de solicitudes y en el apoyo al comité, sin automatizar decisiones sensibles.
Tickets internos de soporte TI
Para evaluar si tiene sentido automatizar la clasificación y el escalado inicial de tickets internos.
Devoluciones y fraude en e-commerce
Para estudiar qué parte del proceso puede automatizarse y qué parte debe revisarse manualmente.
Asistente interno de documentación corporativa
Para comparar opciones de arquitectura y uso de un asistente que consulte documentación interna.
Estructura de archivos

El proyecto está organizado con una estructura mínima y clara:

index.html → interfaz principal de la aplicación
style.css → diseño visual y estilos
app.js → lógica funcional de la app
prompts.js → motor de prompts y reglas por caso
data/ejemplos.json → casos precargados
README.md → documentación del proyecto
Instrucciones de uso
Abre la aplicación en el navegador.
Selecciona uno de los cuatro casos disponibles.
Revisa o completa los campos de contexto, decisión, datos disponibles y restricciones.
Pulsa el botón para generar el prompt final.
Revisa el resultado mostrado en pantalla.
Copia el prompt y úsalo en una herramienta de IA desde el navegador.
Analiza la respuesta comprobando que diferencie entre automatización y control humano.
Cómo desplegarlo en GitHub Pages
Crea un repositorio público en GitHub con el nombre del proyecto.
Sube todos los archivos manteniendo la estructura del repositorio.
Comprueba que index.html está en la raíz del proyecto.
Entra en la configuración del repositorio.
Ve al apartado Pages.
Selecciona la rama principal como fuente de publicación.
Guarda los cambios y espera a que GitHub genere la URL pública.
Abre la URL y comprueba que la app carga correctamente y muestra los cuatro casos.
Limitaciones del proyecto
Es una app estática, sin backend ni base de datos.
No toma decisiones automáticamente: solo ayuda a estructurarlas.
La calidad de la salida depende de la calidad de los datos introducidos.
No sustituye revisión humana en procesos sensibles.
No está pensada para trabajar con datos personales reales ni información confidencial.
No integra directamente un modelo de IA; genera prompts para usar en herramientas externas.
Autores o equipo

Proyecto realizado por el equipo de estudiantes responsable de Decision Pilot IA.

Equipo: ____________________
Asignatura / laboratorio: ____________________
Repositorio: ____________________
Enlace de GitHub Pages: ____________________
Resumen final

Decision Pilot IA es una herramienta sencilla, clara y útil para aprender a estructurar decisiones complejas con IA de forma más rigurosa. Su valor no está en responder por el usuario, sino en ayudarle a formular mejor el problema, comparar alternativas y justificar una recomendación con criterio.
