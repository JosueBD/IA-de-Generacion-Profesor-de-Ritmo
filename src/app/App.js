import React, { useState } from 'react';
     import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking, Platform } from 'react-native';
     import * as Tone from 'tone';
     import { ethers } from 'ethers';
     import MetaMaskSDK from '@metamask/sdk';

     const App = () => {
       const [connected, setConnected] = useState(false);
       const [email, setEmail] = useState('');
       const [amount, setAmount] = useState('0.01');
       const [error, setError] = useState(null);
       const [success, setSuccess] = useState(false);

       const polygonMainnet = {
         chainId: '0x89',
         chainName: 'Polygon Mainnet',
         rpcUrls: ['https://polygon-rpc.com'],
         nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
         blockExplorerUrls: ['https://polygonscan.com'],
       };

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

       const connectWallet = async () => {
         try {
           const MMSDK = new MetaMaskSDK({
             dappMetadata: { name: 'Profesor de Ritmo', url: 'https://github.com/JosueBD/IA-de-Generacion-Profesor-de-Ritmo' },
             infuraAPIKey: 'YOUR_INFURA_API_KEY', // Opcional, obtén en https://infura.io
           });
           const ethereum = MMSDK.getProvider();

           if (!ethereum) {
             // Si MetaMask no está instalado, abre la app o tienda
             const url = Platform.OS === 'ios' ? 'https://apps.apple.com/app/metamask/id1438144202' : 'https://play.google.com/store/apps/details?id=io.metamask';
             await Linking.openURL(url);
             setError('Por favor instala MetaMask');
             return;
           }

           const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
           const provider = new ethers.BrowserProvider(ethereum);
           const network = await provider.getNetwork();

           if (network.chainId !== 137n) {
             try {
               await ethereum.request({
                 method: 'wallet_switchEthereumChain',
                 params: [{ chainId: '0x89' }],
               });
             } catch (switchError) {
               if (switchError.code === 4902) {
                 await ethereum.request({
                   method: 'wallet_addEthereumChain',
                   params: [polygonMainnet],
                 });
               } else {
                 throw switchError;
               }
             }
           }

           setConnected(!!accounts[0]);
           setError(null);
         } catch (err) {
           setError(`Error: ${err.message}`);
         }
       };

       const donate = async () => {
         if (!connected) {
           setError('Por favor conecta MetaMask primero');
           return;
         }
         if (!email) {
           setError('Por favor ingresa tu correo electrónico');
           return;
         }
         try {
           const MMSDK = new MetaMaskSDK({
             dappMetadata: { name: 'Profesor de Ritmo', url: 'https://github.com/JosueBD/IA-de-Generacion-Profesor-de-Ritmo' },
           });
           const ethereum = MMSDK.getProvider();
           const provider = new ethers.BrowserProvider(ethereum);
           const signer = await provider.getSigner();
           const tx = await signer.sendTransaction({
             to: '0x2a0EeC585528C3FF59f957ca78acF3270163a6E8',
             value: ethers.parseEther(amount),
           });
           await tx.wait();
           setSuccess(true);
           setError(null);
         } catch (err) {
           setError(`Error: ${err.message}`);
         }
       };

       return (
         <View style={styles.container}>
           <Text style={styles.title}>Profesor de Ritmo</Text>
           <TouchableOpacity style={styles.button} onPress={playRhythm}>
             <Text style={styles.buttonText}>Reproducir Ritmo</Text>
           </TouchableOpacity>
           <Text style={styles.subtitle}>Dona para apoyar el proyecto</Text>
           <TextInput
             style={styles.input}
             placeholder="tu@correo.com"
             value={email}
             onChangeText={setEmail}
             keyboardType="email-address"
           />
           <TextInput
             style={styles.input}
             placeholder="Monto (MATIC)"
             value={amount}
             onChangeText={setAmount}
             keyboardType="numeric"
           />
           {!connected ? (
             <TouchableOpacity style={styles.button} onPress={connectWallet}>
               <Text style={styles.buttonText}>Conectar MetaMask</Text>
             </TouchableOpacity>
           ) : (
             <TouchableOpacity style={styles.button} onPress={donate}>
               <Text style={styles.buttonText}>Donar {amount} MATIC</Text>
             </TouchableOpacity>
           )}
           {error && <Text style={styles.error}>{error}</Text>}
           {success && <Text style={styles.success}>¡Donación enviada! Gracias.</Text>}
         </View>
       );
     };

     const styles = StyleSheet.create({
       container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#f0f0f0',
         padding: 20,
       },
       title: {
         fontSize: 24,
         fontWeight: 'bold',
         marginBottom: 20,
       },
       subtitle: {
         fontSize: 18,
         marginVertical: 10,
       },
       button: {
         backgroundColor: '#007bff',
         paddingVertical: 10,
         paddingHorizontal: 20,
         borderRadius: 5,
         marginVertical: 10,
       },
       buttonText: {
         color: '#fff',
         fontSize: 16,
       },
       input: {
         width: '80%',
         padding: 10,
         borderWidth: 1,
         borderColor: '#ccc',
         borderRadius: 5,
         marginVertical: 10,
       },
       error: {
         color: 'red',
         marginTop: 10,
       },
       success: {
         color: 'green',
         marginTop: 10,
       },
     });

     export default App;
