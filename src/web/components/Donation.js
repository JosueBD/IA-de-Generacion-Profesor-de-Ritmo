import React, { useState } from 'react';
import { ethers } from 'ethers';
import './Donation.css'; // Opcional: para estilos

function Donation() {
  const [connected, setConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('0.01'); // Valor por defecto: 0.01 MATIC
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Configuración de Polygon Mainnet
  const polygonMainnet = {
    chainId: '0x89', // 137 en hexadecimal
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com'], // Nodo RPC público
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    blockExplorerUrls: ['https://polygonscan.com'],
  };

  // Conectar MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Por favor instala MetaMask para donar.');
      return;
    }

    try {
      // Solicitar conexión
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Verificar red
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      if (network.chainId !== 137n) {
        // Cambiar a Polygon Mainnet
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
          });
        } catch (switchError) {
          // Si la red no está añadida, agregarla
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [polygonMainnet],
            });
          } else {
            throw switchError;
          }
        }
      }

      setConnected(true);
      setError(null);
    } catch (err) {
      setError('Error al conectar MetaMask: ' + err.message);
    }
  };

  // Enviar donación
  const donate = async () => {
    if (!connected) {
      setError('Por favor conecta MetaMask primero.');
      return;
    }

    if (!email) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: '0x2a0EeC585528C3FF59f957ca78acF3270163a6E8', // Tu dirección
        value: ethers.parseEther(amount), // Monto en MATIC
      });

      await tx.wait();
      setSuccess(true);
      setError(null);

      // Opcional: enviar correo a un backend para rastreo
      // await fetch('/api/save-donation', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, amount, txHash: tx.hash }),
      // });
    } catch (err) {
      setError('Error al enviar la donación: ' + err.message);
    }
  };

  return (
    <div className="donation-container">
      <h2>Apoya a Profesor de Ritmo</h2>
      <p>¡Dona con criptomonedas en Polygon Mainnet para mantener este proyecto gratuito!</p>
      <label>
        Correo electrónico (para agradecimientos):
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
        />
      </label>
      <label>
        Monto (MATIC):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          min="0.01"
        />
      </label>
      {!connected ? (
        <button onClick={connectWallet}>Conectar MetaMask</button>
      ) : (
        <button onClick={donate}>Donar {amount} MATIC</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green' }}>
          ¡Donación enviada! Gracias por apoyar Profesor de Ritmo.
        </p>
      )}
    </div>
  );
}

export default Donation;
