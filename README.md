**Nota:** Al iniciar el backend, los modelos de IA (Magenta Drums RNN y YAMNet) y los archivos de datos (MIDI, WAV) se descargarán automáticamente si no están presentes en `models/` y `data/`. Asegúrate de tener conexión a internet.

## Estructura del repositorio

- `.github/workflows/`: Configuración de GitHub Actions (`ci.yml` para pruebas y despliegue).
- `docs/`: Documentación, incluyendo `README.md`, `prompts/prompt-maestro-completo.md`, `prompts/prompts.md` con prompts de IA, y `ejercicios-musicales.md` con ejercicios para estudiantes.
- `src/`: Código fuente (`src/app/ProfesorDeRitmoApp` para móvil, `src/web` para web, `src/backend` para Python).
- `data/`: Datasets musicales con `download_data.sh` para descargar archivos MIDI y WAV de ejemplo.
- `models/`: Modelos de IA preentrenados (`README.md`, `drumm_rnn_model/download_model.sh`, `instrument_classifier/download_yamnet.py`, `instrument_classifier/yamnet_class_map.csv`) con scripts para descarga dinámica.
- `tests/`: Pruebas unitarias y de integración (`test_backend.py`).
- `.gitignore`: Excluye `node_modules`, builds, y archivos temporales.
- `LICENSE`: Licencia MIT.

## Contribución

¡Únete al proyecto! Consulta `CONTRIBUTING.md` para más detalles (pendiente de creación). Pasos:
1. Forkea el repositorio.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit (`git commit -m "Añade nueva funcionalidad"`).
4. Sube la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

Reporta errores o sugiere mejoras en la sección de Issues.

## Tecnologías

- **Librerías musicales**: Music21, PrettyMIDI, Tone.js, VexFlow, Magenta.
- **IA generativa**: TensorFlow, PyTorch, Hugging Face (MusicGen, mBART).
- **Frontend**: React Native (móvil), React (web).
- **Backend**: Python, Node.js.
- **Infraestructura**: GitHub, Docker, AWS/Google Cloud.
- **Financiación**: MetaMask (Polygon), Stripe, Open Collective.

## Accesibilidad

- **Lectores de pantalla**: La interfaz web y móvil es compatible con lectores de pantalla (asegúrate de usar etiquetas ARIA en `src/web` y `src/app`).
- **Teclados adaptativos**: La navegación está optimizada para teclados (prueba con Tab y Enter en la interfaz).

## Licencia

MIT License - [Ver LICENSE](https://github.com/JosueBD/IA-de-Generacion-Profesor-de-Ritmo/blob/main/LICENSE)

## Contacto

- **Autor**: Josué Borges Díaz ([GitHub](https://github.com/JosueBD))
- **Correo**: josuepjnv@gmail.com
- **Comunidad**: [Añade Discord o foro si lo creas]

## Donaciones

Apoya el acceso gratuito:
- **MetaMask**: `0x2a0EeC585528C3FF59f957ca78acF3270163a6E8`
- **Stripe**: [Añade enlace de Stripe]
- **Open Collective**: [Añade enlace de Open Collective]

¡Hagamos que la música sea accesible para todos! 🎶
