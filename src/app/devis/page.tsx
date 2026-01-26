'use client';
import React, { useState } from 'react';

// --- DONNÉES DE PRIX ---
const PRODUITS = [
  { id: 'tshirt', nom: 'T-shirt Bio', prixBase: 2.50, img: '👕' },
  { id: 'hoodie', nom: 'Sweat à capuche', prixBase: 7.47, img: '🧥' },
  { id: 'sweat', nom: 'Sweat col rond', prixBase: 5.50, img: '👕' },
  { id: 'totebag', nom: 'Tote bag coton', prixBase: 1.00, img: '👜' },
];

const FORFAITS_SERIGRAPHIE = [
  { qte: 10, couleurs: [37.10, 64, 90.9, 117.80, 144.7, 171.6, 198.5, 225.4] },
  { qte: 20, couleurs: [49.20, 78, 106.8, 135.60, 164.4, 193.2, 220, 250.8] },
  { qte: 30, couleurs: [61.30, 92, 122.7, 153.40, 184.5, 214.8, 245.5, 276.2] },
  { qte: 40, couleurs: [73.40, 106, 138.60, 171.20, 203.8, 236, 269, 301.6] },
  { qte: 50, couleurs: [67.00, 96, 125, 154, 183, 212, 241, 270] },
  { qte: 75, couleurs: [88.00, 119, 150, 181, 212, 243, 274, 305] },
  { qte: 100, couleurs: [79.00, 109, 139, 169, 199, 229, 259, 289] },
  { qte: 150, couleurs: [106.00, 138.5, 171, 203.5, 236, 268.5, 301, 333.5] },
  { qte: 200, couleurs: [133.00, 168, 203, 238, 273, 308, 343, 378] },
];

const FORFAITS_BRODERIE = [
  { qte: 10, emplacements: [69.2, 154.3, 165.8] },
  { qte: 20, emplacements: [98.4, 268.6, 291.6] },
  { qte: 30, emplacements: [127.6, 382.9, 417.4] },
  { qte: 40, emplacements: [156.80, 497.2, 543.2] },
  { qte: 50, emplacements: [156.50, 603, 659.5] },
  { qte: 75, emplacements: [214.75, 884.5, 969.25] },
  { qte: 100, emplacements: [241, 1110, 1217] },
  { qte: 150, emplacements: [341.5, 1645, 1805.5] },
  { qte: 200, emplacements: [442, 2180, 2394] },
];

export default function ConfigurateurFacultee() {
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  const [hasSerigraphie, setHasSerigraphie] = useState(false);
  const [nbCouleursSeri, setNbCouleursSeri] = useState(0);
  const [hasBroderie, setHasBroderie] = useState(false);
  const [emplacementBroderie, setEmplacementBroderie] = useState(0);

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];

  let prixSerigraphie = 0;
  if (hasSerigraphie) {
    const palier = [...FORFAITS_SERIGRAPHIE].reverse().find(f => quantite >= f.qte) || FORFAITS_SERIGRAPHIE[0];
    prixSerigraphie = palier.couleurs[nbCouleursSeri];
  }

  let prixBroderie = 0;
  if (hasBroderie) {
    const palier = [...FORFAITS_BRODERIE].reverse().find(f => quantite >= f.qte) || FORFAITS_BRODERIE[0];
    prixBroderie = palier.emplacements[emplacementBroderie];
  }

  const totalHT = (produit.prixBase * quantite) + prixSerigraphie + prixBroderie;
  const tva = totalHT * 0.20;
  const totalTTC = totalHT + tva;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        
        {/* COLONNE GAUCHE : OPTIONS */}
        <div className="space-y-10">
          <h1 className="text-3xl font-black tracking-tighter uppercase text-white border-l-4 border-white pl-4">
            FACULTEE <span className="text-slate-500 font-light">Devis</span>
          </h1>
          
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">1. Support</label>
            <div className="grid grid-cols-2 gap-3">
              {PRODUITS.map(p => (
                <button key={p.id} onClick={() => setProduitId(p.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${produitId === p.id ? 'border-white bg-white text-slate-900 scale-[1.02]' : 'border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                  <span className="text-xs font-black uppercase tracking-widest">{p.nom}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">2. Personnalisation</label>
            <div className="grid gap-4">
              <div className={`p-5 rounded-xl border-2 transition-all ${hasSerigraphie ? 'border-white bg-white/5' : 'border-slate-800'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-black uppercase tracking-widest">Sérigraphie</span>
                  <input type="checkbox" checked={hasSerigraphie} onChange={() => setHasSerigraphie(!hasSerigraphie)} className="w-6 h-6 accent-white" />
                </div>
                {hasSerigraphie && (
                  <select value={nbCouleursSeri} onChange={(e) => setNbCouleursSeri(Number(e.target.value))} className="w-full bg-slate-900 p-3 rounded-lg text-xs border border-slate-700 font-bold outline-none uppercase tracking-widest">
                    {[1,2,3,4,5,6,7,8].map((n, i) => <option key={n} value={i}>{n} Couleur(s)</option>)}
                  </select>
                )}
              </div>

              <div className={`p-5 rounded-xl border-2 transition-all ${hasBroderie ? 'border-white bg-white/5' : 'border-slate-800'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-black uppercase tracking-widest">Broderie</span>
                  <input type="checkbox" checked={hasBroderie} onChange={() => setHasBroderie(!hasBroderie)} className="w-6 h-6 accent-white" />
                </div>
                {hasBroderie && (
                  <select value={emplacementBroderie} onChange={(e) => setEmplacementBroderie(Number(e.target.value))} className="w-full bg-slate-900 p-3 rounded-lg text-xs border border-slate-700 font-bold outline-none uppercase tracking-widest">
                    {['Cœur', 'Central', 'Dos'].map((n, i) => <option key={n} value={i}>Emplacement : {n}</option>)}
                  </select>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold block">3. Quantité : {quantite}</label>
            <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full h-2 bg-slate-800 appearance-none accent-white cursor-pointer rounded-full" />
          </div>
        </div>

        {/* COLONNE DROITE : 3D + RÉCAP */}
        <div className="relative pt-20 md:pt-40">
          
          {/* PRODUIT 3D FLOTTANT */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 z-20 pointer-events-none">
            <div className="text-[120px] md:text-[180px] animate-float drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] flex items-center justify-center">
              {produit.img}
            </div>
          </div>

          {/* BLOC RÉCAPITULATIF BLANC */}
          <div className="bg-white text-slate-900 p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50"></div>
            
            <h2 className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-300 mb-10">Votre Configuration</h2>
            
            <div className="space-y-6 text-sm mb-12">
              <div className="flex justify-between border-b border-slate-50 pb-4">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{produit.nom} (x{quantite})</span>
                <span className="font-black italic">{(produit.prixBase * quantite).toFixed(2)} €</span>
              </div>
              {hasSerigraphie && (
                <div className="flex justify-between border-b border-slate-50 pb-4">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Sérigraphie</span>
                  <span className="font-black italic text-slate-900">+{prixSerigraphie.toFixed(2)} €</span>
                </div>
              )}
              {hasBroderie && (
                <div className="flex justify-between border-b border-slate-50 pb-4">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Broderie</span>
                  <span className="font-black italic text-slate-900">+{prixBroderie.toFixed(2)} €</span>
                </div>
              )}
            </div>

            <div className="space-y-1 text-right mb-10">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Total TTC (TVA 20% incluse)</p>
              <div className="text-6xl font-black tracking-tighter text-slate-900">
                {totalTTC.toFixed(2)}<span className="text-2xl ml-1 font-light italic">€</span>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl">
              Confirmer la demande
            </button>
          </div>
        </div>

      </div>

      {/* STYLES POUR L'ANIMATION 3D */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}