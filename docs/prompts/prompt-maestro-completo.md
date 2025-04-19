Documento Maestro de Prompts
Descripción
Este documento combina todos los prompts para la IA de Generación: Profesor de Ritmo, definiendo cómo debe funcionar cada módulo de la escuela de música virtual. Incluye los prompts para la IA general, Generación Rítmica, Dictado Rítmico, Teoría Musical, Práctica de Lectura, Armonía, Apreciación Musical, e Interfaz.
Instrucciones

Crea el archivo docs/prompts/prompt-maestro-completo.md.
Copia el contenido siguiente.
Súbelo a docs/prompts/ usando la interfaz web de GitHub:
Ve a docs/prompts/.
Haz clic en "Add file" > "Create new file".
Nombra el archivo prompt-maestro-completo.md.
Pega el contenido.
Escribe un mensaje de commit: "Añade documento maestro de prompts".
Selecciona "Commit directly to the main branch" y haz clic en "Commit changes".



Contenido
Prompt para el Desarrollo de la IA Generativa Profesor de Ritmo
DescripciónDesarrollar una IA generativa que funcione como una escuela de música virtual enfocada en ritmo, dictado rítmico, teoría musical, práctica de lectura, armonía y apreciación musical. La IA debe ser interactiva, accesible gratuitamente, y soportar múltiples idiomas, con una interfaz similar a MuseScore 4. El proyecto se alojará en GitHub y usará criptomonedas (MetaMask) y métodos tradicionales (PayPal) para financiación.
Requisitos

Módulos Educativos

Ritmo: Generar y enseñar patrones rítmicos (compases simples, compuestos, síncopas, polirritmias). Ejemplo: "Crea un ejercicio rítmico en 6/8 para nivel intermedio."
Dictado rítmico: Generar audio de patrones rítmicos y evaluar transcripciones del usuario. Ejemplo: Reproducir un ritmo en 4/4 y pedir al usuario que lo escriba en la partitura.
Teoría musical: Explicar conceptos como escalas, intervalos, acordes, tonalidad. Ejemplo: "Explica qué es un acorde de séptima dominante con un ejemplo en Do mayor."
Práctica de lectura: Generar ejercicios de lectura de partituras rítmicas y melódicas. Ejemplo: Mostrar una partitura en 3/4 y pedir al usuario que identifique el ritmo.
Armonía: Generar y analizar progresiones armónicas. Ejemplo: "Crea una progresión en La menor con una cadencia perfecta."
Apreciación musical: Proporcionar contexto histórico y análisis de obras. Ejemplo: "Describe el contexto de la Sinfonía No. 5 de Beethoven."
Funcionalidades: Niveles de dificultad (principiante, intermedio, avanzado), feedback en tiempo real, gamificación (puntos, insignias).


Librerías y Tecnologías

Music21: Análisis y manipulación de estructuras musicales.
PrettyMIDI: Generación de archivos MIDI.
Librosa: Análisis de audio (tempo, ritmo).
Magenta (TensorFlow): Generación de ritmos y melodías.
Tone.js: Reproducción de audio en la web.
VexFlow: Renderizado de partituras.
PySynth: Síntesis de audio.
Hugging Face: Modelos preentrenados de música y texto.


Interfaz Similar a MuseScore 4

Renderizado de partituras con VexFlow o OpenSheetMusicDisplay.
Reproducción de audio con Tone.js.
Interactividad para escribir ritmos/notas y recibir correcciones.
Exportación a MusicXML, MIDI, WAV, PDF.
Tecnologías: React + Tailwind CSS (web), Electron (opcional), Pyodide (Python en navegador).


Herramientas de IA Generativa

Modelos: Transformers (MusicGen), LLaMA, mBART, Stable Audio.
Frameworks: TensorFlow, PyTorch, Hugging Face.
Infraestructura: GitHub, Docker, AWS/Google Cloud.


Soporte Multilingüe

Idiomas: Español (principal), hebreo, inglés, francés, italiano, chino, japonés, portugués.
Implementación: i18next (JavaScript), gettext (Python), mBART/XLM-RoBERTa.


GitHub

Estructura: /src (código), /docs (documentación), /models (IA), /data (datasets).
Licencia: MIT.
GitHub Actions para pruebas y despliegues.


Financiación

Criptomonedas: MetaMask (Ethereum), Coinbase Commerce (Bitcoin, Solana).
Tradicional: PayPal, Stripe.
Modelo freemium: Gratis (básico), Premium (exportaciones ilimitadas, ejercicios personalizados).
Plataforma: Open Collective.



Instrucciones para Desarrolladores

Fase 1 (Prototipo): Implementar generación rítmica con Music21 y Tone.js, interfaz web con React y VexFlow, alojar en GitHub.
Fase 2 (Expansión): Añadir módulos de dictado, teoría, armonía, apreciación, soporte multilingüe, MetaMask, PayPal.
Fase 3 (Lanzamiento): Desplegar en la nube, publicar en GitHub, promocionar en comunidades musicales.

Ejemplo de InteracciónUsuario: "Quiero practicar ritmos en 6/8, nivel intermedio."IA: Genera un patrón rítmico, muestra la partitura, reproduce el audio, pide al usuario que lo escriba, evalúa y da feedback.

Prompt para IA de Generación Rítmica
DescripciónDesarrollar un módulo de IA generativa que cree patrones rítmicos personalizados basados en compás, tempo, nivel de dificultad, y estilo musical. Genera ritmos en MusicXML, renderiza partituras, y reproduce audio, integrándose con la interfaz usando Music21, Tone.js, y VexFlow.
Requisitos

Generación de Patrones Rítmicos

Entrada: Compás (4/4, 6/8), tempo (BPM), nivel (principiante, intermedio, avanzado), estilo (jazz, clásico, latino), duración (4 compases).
Salida: Patrón rítmico en MusicXML, partitura (VexFlow), audio (Tone.js).
Funcionalidades: Subdivisiones (negras, corcheas), síncopas, polirritmias según nivel.


Integración con Librerías

Music21, PrettyMIDI, Magenta, Tone.js, VexFlow.


Interacción con el Usuario

Flujo: Selecciona parámetros, genera ritmo, muestra partitura, reproduce audio, permite repetir/exportar.
Feedback: "¡Patrón generado! Toca con un metrónomo."


Soporte Multilingüe

Mensajes en español, hebreo, inglés, francés, italiano, chino, japonés, portugués con i18next y mBART.


EjemploUsuario: "Genera un ritmo en 6/8, nivel intermedio, tempo 100 BPM, estilo jazz."IA: Genera [negra + dos corcheas, corchea + negra, silencio], muestra partitura, reproduce audio, mensaje: "¡Toca este ritmo a 100 BPM!"


Instrucciones para Desarrolladores

Usar Music21 para generar ritmos, VexFlow para partituras, Tone.js para audio.
Integrar con React, probar con usuarios de diferentes niveles.


Prompt para IA de Dictado Rítmico
DescripciónDesarrollar un módulo de IA que cree ejercicios de dictado rítmico, generando audio de patrones, permitiendo al usuario transcribir en una partitura interactiva, evaluando la transcripción y dando feedback. Se integra con Music21, Tone.js, y VexFlow.
Requisitos

Generación de Ejercicios

Entrada: Compás, tempo, nivel, duración, estilo.
Salida: Audio (Tone.js), partitura vacía (VexFlow), evaluación de transcripción.
Funcionalidades: Subdivisiones, síncopas, repetición de audio (máximo 3 veces).


Integración con Librerías

Music21, PrettyMIDI, Tone.js, VexFlow, Magenta (opcional).


Interacción con el Usuario

Flujo: Selecciona parámetros, reproduce ritmo, muestra partitura vacía, usuario transcribe, evalúa, da feedback.
Feedback: "Correcto al 90%. Revisa el silencio en el segundo compás."


Soporte Multilingüe

Instrucciones y feedback en múltiples idiomas con i18next y mBART.


EjemploUsuario: "Ejercicio en 3/4, nivel principiante, tempo 80 BPM."IA: Genera [negra, dos corcheas, negra], reproduce audio, muestra partitura vacía, evalúa: "Incorrecto al 66%. El segundo tiempo tiene dos corcheas."


Instrucciones para Desarrolladores

Usar Music21 para generar y comparar ritmos, VexFlow para partituras interactivas, Tone.js para audio.
Probar con usuarios de diferentes niveles.


Prompt para IA de Teoría Musical
DescripciónDesarrollar un módulo de IA que explique conceptos de teoría musical (escalas, intervalos, acordes, tonalidad) en un lenguaje claro, adaptado al nivel del usuario, con ejemplos y ejercicios interactivos. Se integra con Music21, VexFlow, y Tone.js.
Requisitos

Explicación de Conceptos

Entrada: Concepto (por ejemplo, "acorde de séptima dominante"), nivel, idioma, pregunta abierta.
Salida: Explicación, partitura (VexFlow), audio (Tone.js), ejercicio interactivo.
Funcionalidades: Adaptar profundidad, generar ejemplos en diferentes tonalidades.


Respuesta a Preguntas

Responder preguntas como "¿Por qué se usa la escala menor melódica?" con ejemplos.


Ejercicios Interactivos

Identificar intervalos, completar escalas, corregir acordes.


Integración con Librerías

Music21, PrettyMIDI, Tone.js, VexFlow, mBART.


Interacción con el Usuario

Flujo: Selecciona concepto, muestra explicación/partitura/audio, realiza ejercicio, evalúa.
Feedback: "Correcto, ese es un acorde de Do mayor."


Soporte Multilingüe

Explicaciones en múltiples idiomas con i18next y mBART.


EjemploUsuario: "Explica un acorde de séptima dominante, nivel intermedio, en español."IA: Explica: "Contiene tercera mayor, quinta justa, séptima menor (Sol7: Sol, Si, Re, Fa)." Muestra partitura, reproduce audio, pregunta: "Identifica el acorde en La mayor."


Instrucciones para Desarrolladores

Usar Music21 para ejemplos, VexFlow para partituras, mBART para explicaciones multilingües.
Probar con usuarios de diferentes niveles.


Prompt para IA de Práctica de Lectura
DescripciónDesarrollar un módulo de IA que cree ejercicios interactivos para leer partituras rítmicas y melódicas, adaptados al nivel del usuario, con evaluación y feedback. Se integra con Music21, VexFlow, y Tone.js.
Requisitos

Generación de Ejercicios

Entrada: Tipo (rítmico, melódico), compás, tonalidad, nivel, duración.
Salida: Partitura (VexFlow), audio (Tone.js), pregunta, evaluación.
Funcionalidades: Generar ritmos/melodías, incluir síncopas según nivel.


Tipos de Ejercicios

Rítmicos: Identificar ritmos.
Melódicos: Nombrar notas.
Combinados: Identificar notas y ritmos.


Integración con Librerías

Music21, PrettyMIDI, Tone.js, VexFlow, Magenta (opcional).


Interacción con el Usuario

Flujo: Selecciona ejercicio, muestra partitura/audio, responde, evalúa.
Feedback: "Correcto, el ritmo es negra-corchea-corchea."


Soporte Multilingüe

Instrucciones y feedback en múltiples idiomas con i18next y mBART.


EjemploUsuario: "Ejercicio rítmico en 4/4, nivel principiante, 2 compases."IA: Genera [negra, dos corcheas, negra | dos corcheas, negra, silencio], muestra partitura, reproduce audio, pregunta: "¿Cuál es el ritmo del primer compás?"


Instrucciones para Desarrolladores

Usar Music21 para generar partituras, VexFlow para renderizado, Tone.js para audio.
Probar con usuarios de diferentes niveles.


Prompt para IA de Armonía
DescripciónDesarrollar un módulo de IA que cree y analice progresiones armónicas basadas en tonalidad, nivel, y estilo musical, con partituras, audio, y ejercicios interactivos. Se integra con Music21, Tone.js, y VexFlow.
Requisitos

Generación de Progresiones

Entrada: Tonalidad, nivel, estilo, duración, tipo de cadencia.
Salida: Progresión en MusicXML, partitura (VexFlow), audio (Tone.js).
Funcionalidades: Acordes diatónicos, secundarios, análisis de grados.


Ejercicios Interactivos

Identificar acordes/cadencias, completar progresiones, corregir errores.


Integración con Librerías

Music21, PrettyMIDI, Tone.js, VexFlow, Magenta.


Interacción con el Usuario

Flujo: Selecciona parámetros, genera progresión, muestra partitura/audio, realiza ejercicio, evalúa.
Feedback: "Correcto, es una cadencia perfecta."


Soporte Multilingüe

Explicaciones y feedback en múltiples idiomas con i18next y mBART.


EjemploUsuario: "Progresión en Do mayor, nivel intermedio, estilo pop, cadencia perfecta."IA: Genera C-G-Am-F, muestra partitura, reproduce audio, pregunta: "¿Qué tipo de cadencia es?"


Instrucciones para Desarrolladores

Usar Music21 para progresiones, VexFlow para partituras, Tone.js para audio.
Probar con usuarios de diferentes niveles.


Prompt para IA de Apreciación Musical
DescripciónDesarrollar un módulo de IA que analice obras musicales (historia, estilo) con ejemplos sonoros y ejercicios interactivos. Se integra con Music21, Tone.js, y VexFlow.
Requisitos

Análisis de Obras

Entrada: Obra/compositor, nivel, idioma.
Salida: Análisis histórico/estilístico, partitura (VexFlow), audio (Tone.js).


Ejercicios Interactivos

Identificar formas musicales, analizar elementos, relacionar con contexto histórico.


Integración con Librerías

Music21, PrettyMIDI, Tone.js, VexFlow, mBART.


Interacción con el Usuario

Flujo: Selecciona obra, muestra análisis/partitura/audio, realiza ejercicio, evalúa.
Feedback: "Correcto, el primer movimiento es en forma sonata."


Soporte Multilingüe

Análisis y feedback en múltiples idiomas con i18next y mBART.


EjemploUsuario: "Analiza la Sinfonía No. 5 de Beethoven, nivel principiante, en español."IA: Explica: "Compuesta en 1808, famosa por 'ta-ta-ta-tam'." Muestra partitura, reproduce motivo, pregunta: "¿Qué forma usa el primer movimiento?"


Instrucciones para Desarrolladores

Usar Music21 para análisis, VexFlow para partituras, Tone.js para audio.
Probar con usuarios de diferentes niveles.


Prompt para IA de Interfaz
DescripciónDesarrollar un módulo de IA que coordine los módulos educativos, gestione la interacción del usuario, y personalice la experiencia, integrándose con React, VexFlow, Tone.js, y mBART.
Requisitos

Gestión de Módulos

Mostrar menú principal, permitir configurar parámetros, coordinar módulos, almacenar progreso.


Personalización

Adaptar al nivel del usuario, recomendar ejercicios, permitir cambiar idioma/tema.


Navegación

Usar React Router, diseño responsivo, incluir panel de donaciones.


Integración con Librerías

React, VexFlow, Tone.js, Music21, mBART, ethers.js, Stripe, PayPal.


Interacción con el Usuario

Flujo: Selecciona módulo, carga componente, interactúa, procesa entrada, da feedback.
Feedback: Mensajes personalizados, visualización de progreso.


Soporte Multilingüe

Interfaz en múltiples idiomas con i18next y mBART.


EjemploUsuario: Selecciona "Generación Rítmica" en 4/4, nivel principiante, español.IA: Carga componente, muestra formulario, genera ritmo, renderiza partitura, reproduce audio.


Instrucciones para Desarrolladores

Usar React Router, implementar estado global, integrar VexFlow, Tone.js, Music21.
Configurar i18next, añadir donaciones con MetaMask, Stripe, PayPal.

