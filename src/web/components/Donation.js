import React, { useState } from 'react';
import { ethers } from 'ethers';
import { loadStripe } from '@stripe/stripe-js';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const stripe = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // Reemplaza con tu clave pública de Stripe

  const donateWithMetaMask = async () => {
    if (!window.ethereum) {
      alert('Por favor, instala MetaMask');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const recipient = '0x2a0EeC585528C3FF59f957ca78acF3270163a6E8';
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount || '0.01'),
      });
      alert(`Donación enviada: ${tx.hash}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const donateWithStripe = async () => {
    try {
      const response = await fetch('http://localhost:3001/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount || '10') * 100 }),
      });
      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) alert(result.error.message);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Apoya el Proyecto</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Cantidad (MATIC o USD)"
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={donateWithMetaMask}
        className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
      >
        Donar con MetaMask
      </button>
      <button
        onClick={donateWithStripe}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Donar con Visa
      </button>
    </div>
  );
};

export default Donation;
