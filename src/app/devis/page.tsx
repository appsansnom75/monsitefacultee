'use client';
import React, { useState } from 'react';

// --- TES DONNÉES DE PRIX (Regroupées ici) ---
const PRODUITS = [
  { id: 'tshirt', nom: 'T-shirt Unisex', prixBase: 2.50 },
  { id: 'hoodie', nom: 'Sweat à capuche', prixBase: 7.47 },
  { id: 'sweat', nom: 'Sweat col rond', prixBase: 5.50 },
  { id: 'totebag', nom: 'Tote bag coton', prixBase: 1.00 },
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

const FORFAITS_TRANSFERT = [
  { qte: 10, prix: 47.10 }, { qte: 20, prix: 59.20 }, { qte: 30, prix: 71.30 },
  { qte: 40, prix: 83.40 }, { qte: 50, prix: 92.50 }, { qte: 75, prix: 121.25 },
  { qte: 100, prix: 144 }, { qte: 150, prix: 198.5 }, { qte: 200, prix: 253 }
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

// --- COMPOSANT DE LA PAGE ---
export default function ConfigurateurFacultee() {
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  const [technique, setTechnique] = useState('serigraphie');
  const [optionIndex, setOptionIndex] = useState(0); 

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];

  // Logique de calcul
  let prixMarquageForfait = 0;
  if (technique === 'serigraphie') {
    const palier = [...FORFAITS_SERIGRAPHIE].reverse().find(f => quantite >= f.qte) || FORFAITS_SERIGRAPHIE[0];
    prixMarquageForfait = palier.couleurs[optionIndex];
  } else if (technique === 'transfert') {
    const palier = [...FORFAITS_TRANSFERT].reverse().find(f => quantite >= f.qte) || FORFAITS_TRANSFERT[0];
    prixMarquageForfait = palier.prix;
  } else {
    const palier = [...FORFAITS_BRODERIE].reverse().find(f => quantite >= f.qte) || FORFAITS_BRODERIE[0];
    prixMarquageForfait = palier.emplacements[optionIndex];
  }

  const totalTextile = produit.prixBase * quantite;
  const totalGlobal = totalTextile + prixMarquageForfait;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* OPTIONS */}
        <div className="space-y-8">
          <h1 className="text-2xl font-bold tracking-[0.2em] uppercase opacity-90">Simulateur FACULTEE</h1>
          
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 block font-bold">1. Support Textile</label>
            <div className="grid grid-cols-1 gap-2">
              {PRODUITS.map(p => (
                <button key={p.id} onClick={() => setProduitId(p.id)}
                  className={`text-left p-4 rounded border transition-all ${produitId === p.id ? 'border-white bg-white/5' : 'border-slate-800 bg-slate-800/30 hover:border-slate-600'}`}>
                  <div className="text-sm font-bold">{p.nom}</div>
                  <div className="text-xs text-slate-500">{p.prixBase.toFixed(2)} € / unité</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 block font-bold">2. Technique de Marquage</label>
            <div className="flex gap-2">
              {['serigraphie', 'transfert', 'broderie'].map(t => (
                <button key={t} onClick={() => { setTechnique(t); setOptionIndex(0); }} 
                  className={`flex-1 py-3 rounded text-[10px] uppercase font-black border transition-all ${technique === t ? 'bg-white text-slate-900 border-white' : 'border-slate-800 text-slate-500 border-slate-800'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-3 block font-bold">3. Configuration</label>
            {technique === 'serigraphie' && (
              <select onChange={(e) => setOptionIndex(Number(e.target.value))} className="w-full bg-slate-900 p-4 rounded border border-slate-800 text-sm outline-none">
                {[1,2,3,4,5,6,7,8].map((n, i) => <option key={n} value={i}>{n} Couleur(s)</option>)}
              </select>
            )}
            {technique === 'broderie' && (
              <select onChange={(e) => setOptionIndex(Number(e.target.value))} className="w-full bg-slate-900 p-4 rounded border border-slate-800 text-sm outline-none">
                {['Cœur', 'Central', 'Dos'].map((n, i) => <option key={n} value={i}>Emplacement : {n}</option>)}
              </select>
            )}
            {technique === 'transfert' && <div className="p-4 bg-slate-800/30 border border-slate-800 rounded text-xs text-slate-500 italic">Transfert numérique couleur inclus</div>}
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-6 block font-bold">4. Quantité : <span className="text-white ml-2 text-base">{quantite}</span></label>
            <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full h-1.5 bg-slate-800 appearance-none accent-white cursor-pointer rounded-lg" />
            <div className="flex justify-between text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-widest"><span>Min: 10</span><span>Max: 200</span></div>
          </div>
        </div>

        {/* PANIER RÉCAPITULATIF */}
        <div className="bg-white text-slate-900 p-8 rounded shadow-2xl self-start sticky top-10">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-black uppercase text-xs tracking-widest text-slate-400">Récapitulatif HT</h2>
            <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold">FACULTEE.FR</span>
          </div>
          
          <div className="space-y-5 text-sm mb-10">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{produit.nom} <span className="text-[10px] ml-1">x{quantite}</span></span>
              <span className="font-bold tracking-tight">{totalTextile.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium uppercase text-[12px]">Forfait {technique}</span>
              <span className="font-bold tracking-tight">{prixMarquageForfait.toFixed(2)} €</span>
            </div>
          </div>

          <div className="border-t-[3px] border-slate-50 pt-8 flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Estimation Totale</span>
            <div className="text-right">
                <div className="text-4xl font-black tracking-tighter">{totalGlobal.toFixed(2)} €</div>
                <div className="text-[10px] text-slate-400 font-bold">Soit {(totalGlobal / quantite).toFixed(2)} € / unité</div>
            </div>
          </div>

          <button className="w-full mt-10 bg-slate-900 text-white py-5 rounded font-black uppercase text-[11px] tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-[0.98]">
            Valider ma commande
          </button>
        </div>

      </div>
    </div>
  );
}