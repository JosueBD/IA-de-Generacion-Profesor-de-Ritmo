import tensorflow_hub as hub
import tensorflow as tf
import os

# Descargar y guardar YAMNet
print("Descargando YAMNet desde TensorFlow Hub...")
model = hub.load('https://tfhub.dev/google/yamnet/1')
tf.saved_model.save(model, 'model')
print("Modelo YAMNet guardado en instrument_classifier/model")
