import React from 'react';

export default function WaitingScreen() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 text-center">
      {/* Badge de statut */}
      <div className="mb-6 px-4 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium animate-pulse">
        Lancement prochainement
      </div>

      {/* Titre principal */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
        Ton Textile <span className="text-cyan-500 underline decoration-2 underline-offset-8">Sur Mesure</span>.
      </h1>

      {/* Description */}
      <p className="max-w-xl text-slate-400 text-lg mb-10">
        Nous préparons un configurateur révolutionnaire pour vos sweats, t-shirts et accessoires. 
        Sérigraphie, Broderie et Transfert numérique au meilleur prix.
      </p>

      {/* Formulaire Email (Capture de leads) */}
      <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
        <input 
          type="email" 
          placeholder="Ton adresse email..." 
          className="flex-1 px-5 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
        />
        <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-all">
          M'avertir
        </button>
      </div>

      {/* Footer minimaliste */}
      <footer className="absolute bottom-8 text-slate-500 text-sm">
        &copy; 2026 TonEntreprise - Devis instantané en préparation.
      </footer>
    </div>
  );
}