#!/bin/bash
# Script para descargar el modelo de Magenta Drums RNN
echo "Descargando modelo Drums RNN de Magenta..."
wget https://storage.googleapis.com/magentadata/models/drums_rnn/drum_kit_rnn.mag -O drumm_rnn.mag
echo "Modelo descargado en drumm_rnn_model/drumm_rnn.mag"
