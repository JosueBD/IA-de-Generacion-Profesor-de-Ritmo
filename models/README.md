# Modelos de IA Preentrenados

Esta carpeta contiene modelos de IA preentrenados para generar ritmos e identificar instrumentos.

## Estructura
- `drumm_rnn_model/`
  - `download_model.sh`: Script para descargar el modelo Drums RNN de Magenta.
  - `drumm_rnn.mag`: Modelo de Magenta para generación de ritmos (descargado dinámicamente).
- `instrument_classifier/`
  - `download_yamnet.py`: Script para descargar YAMNet desde TensorFlow Hub.
  - `yamnet_class_map.csv`: Etiquetas de clasificación para YAMNet.
  - `model/`: Carpeta que contiene el modelo YAMNet (descargado dinámicamente).

## Fuentes
- **Magenta**: https://github.com/magenta/magenta
- **TensorFlow Hub**: https://tfhub.dev/google/yamnet/1

## Uso
Los modelos se descargan automáticamente al iniciar el backend (`src/backend/main.py`) si no están presentes. Asegúrate de tener conexión a internet y las dependencias instaladas (`requirements.txt`).
