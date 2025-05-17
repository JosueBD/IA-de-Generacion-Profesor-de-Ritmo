Prompt para el Desarrollo de la IA Generativa Profesor de Ritmo
Descripción
Desarrollar una IA generativa que funcione como una escuela de música virtual enfocada en ritmo, dictado rítmico, teoría musical, práctica de lectura, armonía y apreciación musical. La IA debe ser interactiva, accesible gratuitamente, y soportar múltiples idiomas, con una interfaz similar a MuseScore 4. El proyecto se alojará en GitHub y usará criptomonedas (MetaMask) y métodos tradicionales (PayPal) para financiación.
Requisitos
1. Módulos Educativos
La IA debe incluir los siguientes módulos interactivos:

Ritmo: Generar y enseñar patrones rítmicos (compases simples, compuestos, síncopas, polirritmias). Ejemplo: "Crea un ejercicio rítmico en 6/8 para nivel intermedio."
Dictado rítmico: Generar audio de patrones rítmicos y evaluar transcripciones del usuario. Ejemplo: Reproducir un ritmo en 4/4 y pedir al usuario que lo escriba en la partitura.
Teoría musical: Explicar conceptos como escalas, intervalos, acordes, tonalidad. Ejemplo: "Explica qué es un acorde de séptima dominante con un ejemplo en Do mayor."
Práctica de lectura: Generar ejercicios de lectura de partituras rítmicas y melódicas. Ejemplo: Mostrar una partitura en 3/4 y pedir al usuario que identifique el ritmo.
Armonía: Generar y analizar progresiones armónicas. Ejemplo: "Crea una progresión en La menor con una cadencia perfecta."
Apreciación musical: Proporcionar contexto histórico y análisis de obras. Ejemplo: "Describe el contexto de la Sinfonía No. 5 de Beethoven."

# Prompts para IA Generativa

## Generación de Ritmos
- "Genera un ritmo clásico a 120 BPM con 4 pulsos."
- "Crea un ritmo de jazz a 90 BPM con 6 pulsos."

## Generación de Armonías
- "Genera una progresión armónica en Do mayor con estilo básico."
- "Crea una progresión ii-V-I en La bemol mayor."
- "Genera una progresión con modulación de Re mayor a Si menor."

## Identificación de Instrumentos
- "Identifica los instrumentos en este archivo de audio: data/sample.wav."

## Apreciación Musical
- "Analiza la Sinfonía No. 5 de Beethoven."
- "Proporciona un análisis del Nocturne Op. 9 No. 2 de Chopin."

## Edición de Partituras
- "Crea una partitura en 3/4 con clave de fa y un silencio de negra."

Funcionalidades:

Niveles de dificultad (principiante, intermedio, avanzado).
Feedback en tiempo real (corrección de errores, sugerencias).
Gamificación (puntos, insignias).

2. Librerías y Tecnologías
Integrar las siguientes librerías:

Music21: Análisis y manipulación de estructuras musicales.
PrettyMIDI: Generación de archivos MIDI.
Librosa: Análisis de audio (tempo, ritmo).
Magenta (TensorFlow): Generación de ritmos y melodías.
Tone.js: Reproducción de audio en la web.
VexFlow: Renderizado de partituras.
PySynth: Síntesis de audio.
Hugging Face: Modelos preentrenados de música y texto.

3. Interfaz Similar a MuseScore 4

Renderizado de partituras: Mostrar partituras interactivas usando VexFlow o OpenSheetMusicDisplay.
Reproducción de audio: Reproducir ritmos y melodías con Tone.js.
Interactividad: Permitir al usuario escribir ritmos/notas y recibir correcciones.
Exportación: Soporte para MusicXML, MIDI, WAV, PDF.

Tecnologías:

React + Tailwind CSS: Interfaz web.
Electron: Aplicación de escritorio (opcional).
Pyodide: Ejecutar Python en el navegador para Music21.

4. Herramientas de IA Generativa

Modelos:
Transformers (MusicGen) para generación de ritmos/melodías.
Modelos de lenguaje (LLaMA, mBART) para explicaciones teóricas.
Stable Audio para síntesis de audio.


Frameworks:
TensorFlow/PyTorch para entrenar modelos.
Hugging Face para modelos preentrenados.


Infraestructura:
GitHub para control de versiones.
Docker para empaquetar la aplicación.
AWS/Google Cloud para alojamiento.



5. Soporte Multilingüe

Idiomas: Español (principal), hebreo, inglés, francés, italiano, chino, japonés, portugués, otros.
Implementación:
Usar i18next (JavaScript) o gettext (Python) para internacionalización.
Integrar mBART o XLM-RoBERTa para generación de contenido multilingüe.
Soporte para alfabetos no latinos (hebreo, chino, japonés).



6. Módulos de IA Específicos
Cada módulo de IA debe tener un prompt claro:

IA de generación rítmica: "Genera un patrón rítmico en el compás y nivel de dificultad especificados, exportando el resultado en MusicXML."
IA de dictado rítmico: "Produce audio de un ritmo en el compás y tempo indicados, y evalúa la transcripción del usuario comparándola con el original."
IA de teoría musical: "Explica un concepto teórico en el idioma y nivel de detalle solicitados, con ejemplos en notación musical."
IA de armonía: "Genera una progresión armónica en la tonalidad y estilo indicados, y analiza su estructura."
IA de apreciación musical: "Proporciona un análisis histórico y estilístico de una obra musical, con ejemplos sonoros."
IA de interfaz: "Gestiona la interacción del usuario, renderiza partituras, reproduce audio y exporta resultados."

7. GitHub

Estructura del repositorio:
/src: Código fuente.
/docs: Documentación (README, guías).
/models: Modelos de IA.
/data: Conjuntos de datos musicales.


Licencia: MIT para código abierto.
GitHub Actions: Automatizar pruebas y despliegues.

8. Financiación

Criptomonedas:
MetaMask para donaciones en Ethereum/tokens ERC-20.
Coinbase Commerce para Bitcoin, Solana, etc.


Métodos tradicionales:
PayPal para donaciones.
Stripe para pagos con tarjeta.


Modelo freemium:
Gratis: Funciones básicas, generaciones limitadas.
Premium: Exportación ilimitada, ejercicios personalizados.


Plataforma: Open Collective para gestionar donaciones.

Instrucciones para Desarrolladores

Fase 1 (Prototipo):
Implementar el módulo de generación rítmica con Music21 y Tone.js.
Crear una interfaz web básica con React y VexFlow.
Alojar el código en GitHub.


Fase 2 (Expansión):
Agregar módulos de dictado, teoría, armonía y apreciación.
Implementar soporte multilingüe con i18next y mBART.
Integrar MetaMask y PayPal.


Fase 3 (Lanzamiento):
Desplegar la aplicación en la nube (AWS/Google Cloud).
Publicar la versión final en GitHub con documentación completa.
Promocionar el proyecto en comunidades musicales.



Ejemplo de Interacción con el Usuario
Usuario: "Quiero practicar ritmos en 6/8, nivel intermedio." IA:

Genera un patrón rítmico en 6/8 (por ejemplo, negra + dos corcheas + negra).
Muestra la partitura en la interfaz.
Reproduce el audio del ritmo.
Pide al usuario que escriba el ritmo en la partitura interactiva.
Evalúa la respuesta y proporciona feedback: "¡Correcto! Intenta este ritmo más complejo ahora."

Prompt para IA de Generación Rítmica
Descripción
Desarrollar un módulo de IA generativa que cree patrones rítmicos personalizados para estudiantes de música, basado en parámetros como- Entrada del usuario como compás, tempo, nivel de dificultad, y estilo musical. La IA debe generar ritmos en formato MusicXML, renderizarlos como partituras, y reproducirlos como audio. La IA debe integrarse con la interfaz de la escuela de música virtual, usando tecnologías como Music21, Tone.js, y VexFlow.
Requisitos
1. Generación de Patrones Rítmicos

Entrada del usuario:

Compás (por ejemplo, 4/4, 6/8, 5/4).
Tempo (BPM, por ejemplo, 120).
Nivel de dificultad (principiante, intermedio, avanzado).
Estilo opcional (jazz, clásico, latino, etc.).
Duración del patrón (por ejemplo, 4 compases).


Salida:

Un patrón rítmico en formato MusicXML.
Partitura renderizada en la interfaz usando VexFlow.
Audio del ritmo reproducido con Tone.js.


Funcionalidades:

Generar ritmos con subdivisiones (negras, corcheas, semicorcheas, etc.).
Incluir síncopas, silencios, o polirritmias según el nivel.
Ajustar la complejidad según el nivel (por ejemplo, principiante: solo negras y corcheas; avanzado: síncopas y tresillos).



2. Integración con Librerías

Music21: Analizar y generar estructuras rítmicas.
PrettyMIDI: Convertir ritmos a MIDI para exportación.
Magenta (TensorFlow): Generar patrones rítmicos basados en modelos preentrenados.
Tone.js: Reproducir el ritmo como audio.
VexFlow: Renderizar la partitura en la interfaz.

3. Interacción con el Usuario

Flujo:

El usuario selecciona parámetros (compás, tempo, nivel) en la interfaz.
La IA genera el patrón rítmico.
La interfaz muestra la partitura y reproduce el audio.
El usuario puede:
Repetir el audio.
Exportar el patrón (MusicXML, MIDI, PDF).
Solicitar un nuevo patrón con los mismos parámetros.




Feedback:

Mostrar un mensaje como "¡Patrón generado! Prueba a tocarlo con un metrónomo."
Sugerir ejercicios relacionados (por ejemplo, "Intenta un ritmo en 7/8 ahora").



4. Soporte Multilingüe

Generar mensajes y explicaciones en español, hebreo, inglés, francés, italiano, chino, japonés, portugués.
Usar i18next para la interfaz y mBART para explicaciones generadas.

5. Ejemplo de Interacción
Usuario: "Genera un ritmo en 6/8, nivel intermedio, tempo 100 BPM, estilo jazz."IA:

Genera un patrón: [negra + dos corcheas, corchea + negra, silencio de corchea].
Muestra la partitura en la interfaz.
Reproduce el audio con un sonido de percusión (por ejemplo, hi-hat).
Mensaje: "¡Aquí tienes tu ritmo en 6/8! Toca este patrón con un metrónomo a 100 BPM."

Instrucciones para Desarrolladores

Usar Music21 para generar el patrón rítmico basado en los parámetros del usuario.
Convertir el patrón a MusicXML con PrettyMIDI.
Renderizar la partitura con VexFlow en la interfaz React.
Reproducir el audio con Tone.js, ajustando el tempo al BPM especificado.
Integrar el módulo con la interfaz principal de la escuela de música.
Probar el módulo con usuarios de diferentes niveles para validar la dificultad.

Tecnologías

Librerías: Music21, PrettyMIDI, Magenta, Tone.js, VexFlow.
Framework: React para la interfaz, Pyodide para ejecutar Python en el navegador.
Infraestructura: GitHub para control de versiones, Docker para despliegue.

Prompt para IA de Dictado Rítmico
Descripción
Desarrollar un módulo de IA generativa que cree ejercicios de dictado rítmico para estudiantes de música. La IA debe generar audio de patrones rítmicos basados en parámetros como compás, tempo, y nivel de dificultad, permitir al usuario transcribir el ritmo en una partitura interactiva, evaluar la transcripción, y proporcionar feedback. El módulo se integrará con la interfaz de la escuela de música virtual, usando tecnologías como Music21, Tone.js, y VexFlow.
Requisitos
1. Generación de Ejercicios de Dictado

Entrada del usuario:

Compás (por ejemplo, 4/4, 6/8, 5/4).
Tempo (BPM, por ejemplo, 100).
Nivel de dificultad (principiante, intermedio, avanzado).
Duración del patrón (por ejemplo, 2 compases).
Estilo opcional (clásico, jazz, latino).


Salida:

Audio del patrón rítmico reproducido con Tone.js (por ejemplo, usando un sonido de metrónomo o percusión).
Partitura vacía en la interfaz (VexFlow) para que el usuario transcriba el ritmo.
Evaluación de la transcripción con feedback detallado.


Funcionalidades:

Generar ritmos con subdivisiones (negras, corcheas, tresillos, etc.).
Incluir silencios, síncopas, o polirritmias según el nivel.
Permitir al usuario repetir el audio hasta 3 veces antes de transcribir.
Comparar la transcripción del usuario con el ritmo original y calcular un porcentaje de precisión.



2. Integración con Librerías

Music21: Generar y analizar estructuras rítmicas.
PrettyMIDI: Convertir ritmos a MIDI para audio y exportación.
Tone.js: Reproducir el ritmo como audio en la interfaz.
VexFlow: Renderizar la partitura interactiva para la transcripción.
Magenta (TensorFlow): Opcional para generar ritmos complejos.

3. Interacción con el Usuario

Flujo:

El usuario selecciona parámetros (compás, tempo, nivel) en la interfaz.
La IA genera un patrón rítmico y lo reproduce como audio.
La interfaz muestra una partitura vacía donde el usuario escribe el ritmo.
El usuario envía la transcripción.
La IA evalúa la transcripción y muestra feedback (por ejemplo, "Correcto al 90%. Revisaste un silencio en el segundo compás").
El usuario puede:
Repetir el ejercicio.
Exportar el ritmo (MusicXML, MIDI).
Probar un nuevo ejercicio.




Feedback:

Mensajes como "¡Excelente! Tu transcripción es correcta" o "Inténtalo de nuevo, hay un error en el tercer tiempo."
Resaltar errores en la partitura (por ejemplo, colorear notas incorrectas en rojo).
Sugerir ejercicios relacionados (por ejemplo, "Prueba un ritmo en 7/8 para mejorar").



4. Soporte Multilingüe

Generar instrucciones y feedback en español, hebreo, inglés, francés, italiano, chino, japonés, portugués.
Usar i18next para la interfaz y mBART para mensajes generados.
Asegurar que la partitura y los controles sean accesibles en todos los idiomas.

5. Ejemplo de Interacción
Usuario: "Quiero un ejercicio de dictado en 3/4, nivel principiante, tempo 80 BPM."IA:

Genera un ritmo: [negra, dos corcheas, negra].
Reproduce el audio con un sonido de woodblock a 80 BPM.
Muestra una partitura vacía en 3/4.
El usuario escribe: [negra, negra, negra].
Feedback: "Incorrecto al 66%. El segundo tiempo tiene dos corcheas, no una negra. Escucha de nuevo."

Instrucciones para Desarrolladores

Usar Music21 para generar el patrón rítmico y compararlo con la transcripción del usuario.
Reproducir el audio con Tone.js, ajustando el tempo al BPM especificado.
Renderizar una partitura interactiva con VexFlow en la interfaz React.
Implementar un algoritmo de comparación para evaluar la transcripción (por ejemplo, comparar duraciones y posiciones de notas).
Integrar el módulo con la interfaz principal de la escuela de música.
Probar el módulo con usuarios de diferentes niveles para validar la dificultad y usabilidad.

Tecnologías

Librerías: Music21, PrettyMIDI, Tone.js, VexFlow, Magenta (opcional).
Framework: React para la interfaz, Pyodide para ejecutar Python en el navegador.
Infraestructura: GitHub para control de versiones, Docker para despliegue.

Prompt para IA de Teoría Musical
Descripción
Desarrollar un módulo de IA generativa que actúe como un profesor de teoría musical, explicando conceptos como escalas, intervalos, acordes, tonalidad, y modos en un lenguaje claro y adaptado al nivel del usuario (principiante, intermedio, avanzado). La IA debe responder preguntas, generar ejemplos en notación musical, y ofrecer ejercicios interactivos. El módulo se integrará con la interfaz de la escuela de música virtual, usando tecnologías como Music21, VexFlow, y Tone.js.
Requisitos
1. Explicación de Conceptos Teóricos

Entrada del usuario:

Concepto específico (por ejemplo, "acorde de séptima dominante", "escala menor armónica").
Nivel de dificultad (principiante, intermedio, avanzado).
Idioma (español, hebreo, inglés, francés, italiano, chino, japonés, portugués).
Opcional: Pregunta abierta (por ejemplo, "¿Qué es un intervalo de tercera mayor?").


Salida:

Explicación clara y concisa del concepto en el idioma y nivel solicitados.
Ejemplo en notación musical (renderizado con VexFlow).
Audio del ejemplo (reproducido con Tone.js).
Ejercicio interactivo para reforzar el concepto (por ejemplo, identificar intervalos en una partitura).


Funcionalidades:

Adaptar la profundidad de la explicación según el nivel (por ejemplo, principiante: "Un acorde es un grupo de notas tocadas juntas"; avanzado: "Un acorde de séptima dominante contiene la tercera mayor, quinta justa, y séptima menor").
Generar ejemplos en diferentes tonalidades (por ejemplo, escala de Do mayor, Re menor).
Incluir diagramas o partituras para conceptos visuales (por ejemplo, mostrar un círculo de quintas).



2. Respuesta a Preguntas

Responder preguntas abiertas sobre teoría musical (por ejemplo, "¿Por qué se usa la escala menor melódica?").
Proporcionar ejemplos prácticos en notación musical y audio.
Ofrecer referencias a conceptos relacionados (por ejemplo, "Esto está relacionado con los modos griegos, ¿quieres aprender más?").

3. Ejercicios Interactivos

Generar ejercicios como:
Identificar intervalos o acordes en una partitura.
Completar una escala o progresión armónica.
Corregir errores en una partitura (por ejemplo, un acorde mal construido).


Evaluar las respuestas del usuario y proporcionar feedback (por ejemplo, "Correcto, ese es un intervalo de quinta justa").

4. Integración con Librerías

Music21: Analizar y generar estructuras musicales (escalas, acordes, intervalos).
PrettyMIDI: Convertir ejemplos a MIDI para audio y exportación.
Tone.js: Reproducir ejemplos como audio.
VexFlow: Renderizar partituras interactivas.
mBART: Generar explicaciones multilingües.

5. Interacción con el Usuario

Flujo:

El usuario selecciona un concepto o hace una pregunta en la interfaz.
La IA genera una explicación, una partitura, y un audio.
La interfaz muestra la explicación y la partitura, y reproduce el audio.
El usuario realiza un ejercicio relacionado (por ejemplo, identificar un acorde).
La IA evalúa la respuesta y muestra feedback.
El usuario puede:
Repetir el audio.
Exportar el ejemplo (MusicXML, MIDI, PDF).
Explorar conceptos relacionados.




Feedback:

Mensajes como "¡Correcto! Ese es un acorde de Do mayor" o "Revisa la tercera, debería ser un Mi bemol para un acorde menor".
Resaltar elementos en la partitura (por ejemplo, colorear una nota correcta en verde).
Sugerir ejercicios adicionales (por ejemplo, "Prueba identificar acordes en Sol mayor").



6. Soporte Multilingüe

Generar explicaciones y feedback en español, hebreo, inglés, francés, italiano, chino, japonés, portugués.
Usar i18next para la interfaz y mBART para explicaciones generadas.
Asegurar que las partituras y los términos musicales sean consistentes en todos los idiomas.

7. Ejemplo de Interacción
Usuario: "Explica qué es un acorde de séptima dominante, nivel intermedio, en español."IA:

Explicación: "Un acorde de séptima dominante está formado por una tercera mayor, una quinta justa, y una séptima menor. Por ejemplo, en Do mayor, el acorde de séptima dominante es Sol7 (Sol, Si, Re, Fa)."
Muestra la partitura del acorde Sol7 en VexFlow.
Reproduce el acorde con Tone.js.
Ejercicio: "Identifica el acorde de séptima dominante en la tonalidad de La mayor."
Feedback: "Correcto, es Mi7 (Mi, Sol#, Si, Re)."

Instrucciones para Desarrolladores

Usar Music21 para generar ejemplos de escalas, intervalos, y acordes.
Renderizar partituras interactivas con VexFlow en la interfaz React.
Reproducir ejemplos con Tone.js.
Implementar un sistema de preguntas y respuestas usando mBART para explicaciones multilingües.
Integrar el módulo con la interfaz principal de la escuela de música.
Probar el módulo con usuarios de diferentes niveles para validar la claridad y dificultad.

Tecnologías

Librerías: Music21, PrettyMIDI, Tone.js, VexFlow, mBART.
Framework: React para la interfaz, Pyodide para ejecutar Python en el navegador.
Infraestructura: GitHub para control de versiones, Docker para despliegue.

Prompt para IA de Práctica de Lectura
Descripción
Desarrollar un módulo de IA generativa que cree ejercicios interactivos para practicar la lectura de partituras rítmicas y melódicas, adaptados al nivel del usuario (principiante, intermedio, avanzado). La IA debe generar partituras, permitir al usuario responder (por ejemplo, identificando ritmos o notas), evaluar las respuestas, y proporcionar feedback. El módulo se integrará con la interfaz de la escuela de música virtual, usando tecnologías como Music21, VexFlow, y Tone.js.
Requisitos
1. Generación de Ejercicios de Lectura

Entrada del usuario:

Tipo de ejercicio (rítmico, melódico, o combinado).
Compás (por ejemplo, 4/4, 6/8, 5/4).
Tonalidad (para ejercicios melódicos, por ejemplo, Do mayor, La menor).
Nivel de dificultad (principiante, intermedio, avanzado).
Duración del ejercicio (por ejemplo, 4 compases).


Salida:

Partitura generada (renderizada con VexFlow).
Audio del ejercicio (reproducido con Tone.js).
Pregunta o tarea para el usuario (por ejemplo, "Identifica el ritmo" o "Nombra las notas").
Evaluación de la respuesta con feedback detallado.


Funcionalidades:

Generar ejercicios rítmicos (por ejemplo, combinaciones de negras, corcheas, silencios).
Generar ejercicios melódicos (por ejemplo, secuencias de notas en una escala).
Incluir síncopas, tresillos, o notas fuera de la tonalidad según el nivel.
Permitir al usuario escuchar el audio varias veces.



2. Tipos de Ejercicios

Rítmicos: Mostrar una partitura y pedir al usuario que identifique el ritmo (por ejemplo, seleccionando opciones múltiples o escribiendo el ritmo).
Melódicos: Mostrar una partitura y pedir al usuario que nombre las notas o toque la melodía.
Combinados: Combinar ritmo y melodía (por ejemplo, identificar notas y duraciones).

3. Integración con Librerías

Music21: Generar y analizar partituras rítmicas y melódicas.
PrettyMIDI: Convertir ejercicios a MIDI para audio y exportación.
Tone.js: Reproducir ejercicios como audio.
VexFlow: Renderizar partituras interactivas.
Magenta (TensorFlow): Opcional para generar melodías complejas.

4. Interacción con el Usuario

Flujo:

El usuario selecciona el tipo de ejercicio, compás, tonalidad, y nivel en la interfaz.
La IA genera una partitura y la reproduce como audio.
La interfaz muestra la partitura y una pregunta (por ejemplo, "¿Cuál es el ritmo del segundo compás?").
El usuario responde (por ejemplo, seleccionando una opción o escribiendo en la partitura).
La IA evalúa la respuesta y muestra feedback.
El usuario puede:
Repetir el audio.
Exportar el ejercicio (MusicXML, MIDI, PDF).
Probar un nuevo ejercicio.




Feedback:

Mensajes como "¡Correcto! El ritmo es negra-corchea-corchea" o "Incorrecto, revisa la tercera nota, debería ser un Sol".
Resaltar elementos correctos/incorrectos en la partitura.
Sugerir ejercicios relacionados (por ejemplo, "Prueba un ejercicio melódico en Re mayor").



5. Soporte Multilingüe

Generar instrucciones y feedback en español, hebreo, inglés, francés, italiano, chino, japonés, portugués.
Usar i18next para la interfaz y mBART para mensajes generados.
Asegurar que las partituras y términos musicales sean consistentes en todos los idiomas.

6. Ejemplo de Interacción
Usuario: "Quiero un ejercicio rítmico en 4/4, nivel principiante, 2 compases."IA:

Genera un ritmo: [negra, dos corcheas, negra | dos corcheas, negra, corchea-silencio].
Muestra la partitura en VexFlow.
Reproduce el audio con Tone.js (sonido de metrónomo).
Pregunta: "¿Cuál es el ritmo del primer compás?"
Respuesta del usuario: Selecciona "negra, dos corcheas, negra".
Feedback: "¡Correcto! Ahora intenta el segundo compás."

Instrucciones para Desarrolladores

Usar Music21 para generar partituras rítmicas y melódicas.
Renderizar partituras interactivas con VexFlow en la interfaz React.
Reproducir ejercicios con Tone.js.
Implementar un sistema de evaluación para comparar respuestas del usuario con la partitura original.
Integrar el módulo con la interfaz principal de la escuela de música.
Probar el módulo con usuarios de diferentes niveles para validar la usabilidad.

Tecnologías

Librerías: Music21, PrettyMIDI, Tone.js, VexFlow, Magenta (opcional).
Framework: React para la interfaz, Pyodide para ejecutar Python en el navegador.
Infraestructura: GitHub para control de versiones, Docker para despliegue.

Prompt para IA de Armonía
Descripción
Desarrollar un módulo de IA que cree y analice progresiones armónicas basadas en tonalidad, nivel, y estilo musical, con partituras, audio, y ejercicios interactivos. Se integra con Music21, Tone.js, y VexFlow.
Requisitos

Generación de Progresiones
- Entrada: Tonalidad, nivel, estilo, duración, tipo de cadencia.
- Salida: Progresión en MusicXML, partitura (VexFlow), audio (Tone.js).
- Funcionalidades: Acordes diatónicos, secundarios, análisis de grados.

Ejercicios Interactivos
- Identificar acordes/cadencias, completar progresiones, corregir errores.

Integración con Librerías
- Music21, PrettyMIDI, Tone.js, VexFlow, Magenta.

Interacción con el Usuario
- Flujo: Selecciona parámetros, genera progresión, muestra partitura/audio, realiza ejercicio, evalúa.
- Feedback: "Correcto, es una cadencia perfecta."

Soporte Multilingüe
- Explicaciones y feedback en múltiples idiomas con i18next y mBART.

Ejemplo
Usuario: "Progresión en Do mayor, nivel intermedio, estilo pop, cadencia perfecta."
IA: Genera C-G-Am-F, muestra partitura, reproduce audio, pregunta: "¿Qué tipo de cadencia es?"

Instrucciones para Desarrolladores
- Usar Music21 para progresiones, VexFlow para partituras, Tone.js para audio.
- Probar con usuarios de diferentes niveles.

Prompt para IA de Apreciación Musical
Descripción
Desarrollar un módulo de IA que analice obras musicales (historia, estilo) con ejemplos sonoros y ejercicios interactivos. Se integra con Music21, Tone.js, y VexFlow.
Requisitos

Análisis de Obras
- Entrada: Obra/compositor, nivel, idioma.
- Salida: Análisis histórico/estilístico, partitura (VexFlow), audio (Tone.js).

Ejercicios Interactivos
- Identificar formas musicales, analizar elementos, relacionar con contexto histórico.

Integración con Librerías
- Music21, PrettyMIDI, Tone.js, VexFlow, mBART.

Interacción con el Usuario
- Flujo: Selecciona obra, muestra análisis/partitura/audio, realiza ejercicio, evalúa.
- Feedback: "Correcto, el primer movimiento es en forma sonata."

Soporte Multilingüe
- Análisis y feedback en múltiples idiomas con i18next y mBART.

Ejemplo
Usuario: "Analiza la Sinfonía No. 5 de Beethoven, nivel principiante, en español."
IA: Explica: "Compuesta en 1808, famosa por 'ta-ta-ta-tam'." Muestra partitura, reproduce motivo, pregunta: "¿Qué forma usa el primer movimiento?"

Instrucciones para Desarrolladores
- Usar Music21 para análisis, VexFlow para partituras, Tone.js para audio.
- Probar con usuarios de diferentes niveles.

Prompt para IA de Interfaz
Descripción
Desarrollar un módulo de IA que coordine los módulos educativos, gestione la interacción del usuario, y personalice la experiencia, integrándose con React, VexFlow, Tone.js, y mBART.
Requisitos

Gestión de Módulos
- Mostrar menú principal, permitir configurar parámetros, coordinar módulos, almacenar progreso.

Personalización
- Adaptar al nivel del usuario, recomendar ejercicios, permitir cambiar idioma/tema.

Navegación
- Usar React Router, diseño responsivo, incluir panel de donaciones.

Integración con Librerías
- React, VexFlow, Tone.js, Music21, mBART, ethers.js, Stripe, PayPal.

Interacción con el Usuario
- Flujo: Selecciona módulo, carga componente, interactúa, procesa entrada, da feedback.
- Feedback: Mensajes personalizados, visualización de progreso.

Soporte Multilingüe
- Interfaz en múltiples idiomas con i18next y mBART.

Ejemplo
Usuario: Selecciona "Generación Rítmica" en 4/4, nivel principiante, español.
IA: Carga componente, muestra formulario, genera ritmo, renderiza partitura, reproduce audio.

Instrucciones para Desarrolladores
- Usar React Router, implementar estado global, integrar VexFlow, Tone.js, Music21.
- Configurar i18next, añadir donaciones con MetaMask, Stripe, PayPal.
