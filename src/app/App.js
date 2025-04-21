# Esqueleto para App en React Native

## Instrucciones

1. Crea un proyecto React Native:
   ```bash
   npx react-native init ProfesorDeRitmoApp
   cd ProfesorDeRitmoApp
   ```

2. Instala dependencias:
   ```bash
   npm install @tonejs/tone
   ```

3. Crea un componente inicial en `App.js`:
   ```javascript
   import React from 'react';
   import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
   import * as Tone from 'tone';

   const App = () => {
     const playRhythm = async () => {
       await Tone.start();
       const synth = new Tone.Synth().toDestination();
       const now = Tone.now();
       // Ritmo simple: 4 negras
       synth.triggerAttackRelease('C4', '4n', now);
       synth.triggerAttackRelease('C4', '4n', now + 0.5);
       synth.triggerAttackRelease('C4', '4n', now + 1.0);
       synth.triggerAttackRelease('C4', '4n', now + 1.5);
     };

     return (
       <View style={styles.container}>
         <Text style={styles.title}>Profesor de Ritmo</Text>
         <TouchableOpacity style={styles.button} onPress={playRhythm}>
           <Text style={styles.buttonText}>Reproducir Ritmo</Text>
         </TouchableOpacity>
       </View>
     );
   };

   const styles = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#f0f0f0',
     },
     title: {
       fontSize: 24,
       fontWeight: 'bold',
       marginBottom: 20,
     },
     button: {
       backgroundColor: '#007bff',
       paddingVertical: 10,
       paddingHorizontal: 20,
       borderRadius: 5,
     },
     buttonText: {
       color: '#fff',
       fontSize: 16,
     },
   });

   export default App;
   ```

4. Inicia la app:
   ```bash
   npx react-native run-android  # o run-ios
   ```

## Descripción

- **Funcionalidad**: Reproduce un ritmo simple (4 negras) usando Tone.js.
- **Limitaciones**: VexFlow no es totalmente compatible con React Native. Para partituras, considera:
  - Usar **AlphaTab** (soporta notación musical en móviles).
  - Renderizar partituras como imágenes desde el backend (usando Music21) y mostrarlas en la app.

## Próximos Pasos

1. Reutilizar el código React del prototipo web (adaptar componentes).
2. Integrar AlphaTab para partituras.
3. Añadir soporte offline con AsyncStorage.
4. Implementar notificaciones push con `react-native-push-notification`.
