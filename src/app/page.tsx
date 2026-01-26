import React from 'react';

export default function WaitingScreen() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 text-center">
      
      {/* Titre FACULTEE - Sobre et élégant */}
      <h1 className="text-2xl md:text-3xl font-bold mb-16 tracking-[0.3em] text-white/90">
        FACULTEE
      </h1>

      {/* Formulaire de contact */}
      <div className="w-full max-w-md flex flex-col sm:flex-row gap-2">
        <input 
          type="email" 
          placeholder="Votre adresse email..." 
          className="flex-1 px-4 py-2.5 rounded bg-transparent border border-slate-700 text-white focus:outline-none focus:border-slate-500 transition-all placeholder:text-slate-600 text-sm"
        />
        <button className="px-8 py-2.5 bg-white text-slate-900 font-semibold rounded hover:bg-slate-200 transition-all text-sm">
          Me contacter
        </button>
      </div>

      {/* Footer minimaliste */}
      <footer className="absolute bottom-8 text-slate-600 text-[10px] tracking-[0.4em] uppercase">
        © 2026 FACULTEE
      </footer>
    </div>
  );
  }
