import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Tone from 'tone';
import { ethers } from 'ethers';

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
    synth.triggerAttackRelease('C4', '4n', now);
    synth.triggerAttackRelease('C4', '4n', now + 0.5);
    synth.triggerAttackRelease('C4', '4n', now + 1.0);
    synth.triggerAttackRelease('C4', '4n', now + 1.5);
  };

  const connectWallet = async () => {
    try {
      const metamaskUrl = 'metamask://';
      const supported = await Linking.canOpenURL(metamaskUrl);
      if (!supported) {
        const url = Platform.OS === 'android' ? 'https://play.google.com/store/apps/details?id=io.metamask' : 'https://apps.apple.com/app/metamask/id1438144202';
        await Linking.openURL(url);
        setError('Por favor instala MetaMask');
        return;
      }

      await Linking.openURL(metamaskUrl);
      setConnected(true);
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
        <WebView
          style={{ width: '100%', height: 300 }}
          source={{
            html: `
              <html>
                <body>
                  <h2>Donar ${amount} MATIC</h2>
                  <button onclick="connect()">Conectar MetaMask</button>
                  <button onclick="donate()">Donar</button>
                  <p id="status"></p>
                  <script src="https://cdn.ethers.io/lib/ethers-5.7.umd.min.js"></script>
                  <script>
                    async function connect() {
                      if (typeof window.ethereum !== 'undefined') {
                        await window.ethereum.request({ method: 'eth_requestAccounts' });
                        document.getElementById('status').innerText = 'Conectado';
                      } else {
                        document.getElementById('status').innerText = 'MetaMask no detectado';
                      }
                    }
                    async function donate() {
                      if (typeof window.ethereum !== 'undefined') {
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const signer = provider.getSigner();
                        const tx = await signer.sendTransaction({
                          to: '0x2a0EeC585528C3FF59f957ca78acF3270163a6E8',
                          value: ethers.utils.parseEther('${amount}'),
                        });
                        await tx.wait();
                        document.getElementById('status').innerText = '¡Donación enviada!';
                      }
                    }
                  </script>
                </body>
              </html>
            `,
          }}
        />
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
