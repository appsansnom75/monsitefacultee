import React from 'react';

export default function WaitingScreen() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 text-center">
      {/* Badge de statut */}
      <div className="mb-8 px-4 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium animate-pulse">
        Site en cours de création
      </div>

      {/* Titre principal avec effet de lueur et dégradé */}
      <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-white drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
        FACULTEE
      </h1>

      {/* Description courte */}
      <p className="max-w-md text-slate-400 text-lg mb-12 italic">
        Personnalisation textile haut de gamme.
      </p>

      {/* Formulaire de contact */}
      <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
        <input 
          type="email" 
          placeholder="Votre adresse email..." 
          className="flex-1 px-5 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
        />
        <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-all active:scale-95">
          Me contacter
        </button>
      </div>

      {/* Footer mis à jour */}
      <footer className="absolute bottom-8 text-slate-500 text-sm tracking-widest uppercase">
        © 2026 FACULTEE
      </footer>
    </div>
  );
}