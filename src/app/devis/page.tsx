'use client';
import React, { useState } from 'react';

export default function CalculateurDevis() {
  const [quantite, setQuantite] = useState(10);
  const [typeMarquage, setTypeMarquage] = useState('serigraphie');

  // Exemple de calcul simple (on affinera avec tes vrais tarifs après)
  const prixBaseTextile = 12; // Prix d'un sweat par exemple
  const prixMarquage = typeMarquage === 'serigraphie' ? 3 : 5;
  const total = (prixBaseTextile + prixMarquage) * quantite;

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold mb-8">Simulateur de Devis - FACULTEE</h1>

        {/* Choix de la quantité */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Quantité : {quantite}</label>
          <input 
            type="range" min="10" max="500" step="10"
            value={quantite}
            onChange={(e) => setQuantite(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
        </div>

        {/* Choix du marquage */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-4">Technique de marquage :</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setTypeMarquage('serigraphie')}
              className={`p-4 border rounded-lg text-sm font-semibold transition-all ${typeMarquage === 'serigraphie' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 hover:border-slate-400'}`}
            >
              Sérigraphie
            </button>
            <button 
              onClick={() => setTypeMarquage('broderie')}
              className={`p-4 border rounded-lg text-sm font-semibold transition-all ${typeMarquage === 'broderie' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 hover:border-slate-400'}`}
            >
              Broderie
            </button>
          </div>
        </div>

        {/* Résultat */}
        <div className="border-t border-slate-100 pt-6">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Estimation totale :</span>
            <span className="text-emerald-600">{total} € HT</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">*Prix indicatif hors frais de port et frais techniques.</p>
        </div>
      </div>
    </div>
  );
}