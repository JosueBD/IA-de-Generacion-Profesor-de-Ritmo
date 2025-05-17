#!/bin/bash
# Script para descargar archivos MIDI y WAV de ejemplo
echo "Descargando archivo MIDI..."
wget https://www.midiworld.com/files/146 -O sample_midi.mid
echo "Descargando archivo WAV..."
wget https://file-examples.com/storage/fea7c6b5b366f5b2f6b5c/2017/11/file_example_WAV_1MG.wav -O sample.wav
echo "Archivos descargados en data/"
