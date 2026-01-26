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
  { qte: 50, couleurs: [67.00, 96, 125, 154, 183, 212, 241, 270] },
  { qte: 100, couleurs: [79.00, 109, 139, 169, 199, 229, 259, 289] },
  { qte: 200, couleurs: [133.00, 168, 203, 238, 273, 308, 343, 378] },
];

const FORFAITS_TRANSFERT = [
  { qte: 10, prix: 47.10 }, { qte: 20, prix: 59.20 }, { qte: 50, prix: 92.50 },
  { qte: 100, prix: 144 }, { qte: 200, prix: 253 }
];

const FORFAITS_BRODERIE = [
  { qte: 10, emplacements: [69.2, 154.3, 165.8] },
  { qte: 20, emplacements: [98.4, 268.6, 291.6] },
  { qte: 50, emplacements: [156.50, 603, 659.5] },
  { qte: 100, emplacements: [241, 1110, 1217] },
  { qte: 200, emplacements: [442, 2180, 2394] },
];

const EMPLACEMENTS = ['Cœur', 'Central', 'Dos', 'Manche'];

export default function ConfigurateurFacultee() {
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  
  const [hasSerigraphie, setHasSerigraphie] = useState(false);
  const [nbCouleursSeri, setNbCouleursSeri] = useState(0);
  const [placeSeri, setPlaceSeri] = useState('Cœur');

  const [hasNumerique, setHasNumerique] = useState(false);
  const [placeNum, setPlaceNum] = useState('Cœur');

  const [hasBroderie, setHasBroderie] = useState(false);
  const [placeBroderieIdx, setPlaceBroderieIdx] = useState(0);

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];

  const palierIdx = (arr: any[]) => [...arr].reverse().find(f => quantite >= f.qte) || arr[0];

  const prixSerigraphie = hasSerigraphie ? palierIdx(FORFAITS_SERIGRAPHIE).couleurs[nbCouleursSeri] : 0;
  const prixNumerique = hasNumerique ? palierIdx(FORFAITS_TRANSFERT).prix : 0;
  const prixBroderie = hasBroderie ? palierIdx(FORFAITS_BRODERIE).emplacements[placeBroderieIdx] : 0;

  const totalHT = (produit.prixBase * quantite) + prixSerigraphie + prixNumerique + prixBroderie;
  const tva = totalHT * 0.20;
  const totalTTC = totalHT + tva;
  
  // NOUVEAU : Calcul de l'unité TTC
  const prixUnitaireTTC = totalTTC / quantite;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans pb-32 text-slate-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start mb-20">
        
        {/* COLONNE GAUCHE */}
        <div className="space-y-10">
          <h1 className="text-3xl font-black tracking-tighter uppercase border-l-4 border-white pl-4 italic">FACULTEE DEVIS</h1>
          
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">1. Support</label>
            <div className="grid grid-cols-2 gap-3 font-bold uppercase italic tracking-widest text-[10px]">
              {PRODUITS.map(p => (
                <button key={p.id} onClick={() => setProduitId(p.id)} className={`p-4 rounded-xl border-2 transition-all ${produitId === p.id ? 'border-white bg-white text-slate-900' : 'border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                  {p.nom}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">2. Personnalisation (Cumulable)</label>
            
            {/* SERIGRAPHIE */}
            <div className={`p-5 rounded-xl border-2 transition-all mb-4 ${hasSerigraphie ? 'border-white bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black uppercase tracking-widest italic">Sérigraphie</span>
                <input type="checkbox" checked={hasSerigraphie} onChange={() => setHasSerigraphie(!hasSerigraphie)} className="w-6 h-6 accent-white" />
              </div>
              {hasSerigraphie && (
                <div className="grid grid-cols-2 gap-2">
                  <select value={nbCouleursSeri} onChange={(e) => setNbCouleursSeri(Number(e.target.value))} className="bg-slate-900 p-3 rounded-lg text-[10px] border border-slate-700 font-bold uppercase outline-none">
                    {[1,2,3,4,5,6,7,8].map((n, i) => <option key={n} value={i}>{n} Coul.</option>)}
                  </select>
                  <select value={placeSeri} onChange={(e) => setPlaceSeri(e.target.value)} className="bg-slate-900 p-3 rounded-lg text-[10px] border border-slate-700 font-bold uppercase outline-none">
                    {EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              )}
            </div>

            {/* NUMERIQUE */}
            <div className={`p-5 rounded-xl border-2 transition-all mb-4 ${hasNumerique ? 'border-white bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black uppercase tracking-widest italic">Numérique</span>
                <input type="checkbox" checked={hasNumerique} onChange={() => setHasNumerique(!hasNumerique)} className="w-6 h-6 accent-white" />
              </div>
              {hasNumerique && (
                <select value={placeNum} onChange={(e) => setPlaceNum(e.target.value)} className="w-full bg-slate-900 p-3 rounded-lg text-[10px] border border-slate-700 font-bold uppercase outline-none">
                  {EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              )}
            </div>

            {/* BRODERIE */}
            <div className={`p-5 rounded-xl border-2 transition-all ${hasBroderie ? 'border-white bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black uppercase tracking-widest italic">Broderie</span>
                <input type="checkbox" checked={hasBroderie} onChange={() => setHasBroderie(!hasBroderie)} className="w-6 h-6 accent-white" />
              </div>
              {hasBroderie && (
                <select value={placeBroderieIdx} onChange={(e) => setPlaceBroderieIdx(Number(e.target.value))} className="w-full bg-slate-900 p-3 rounded-lg text-[10px] border border-slate-700 font-bold uppercase outline-none">
                  {['Cœur', 'Central', 'Dos'].map((n, i) => <option key={n} value={i}>{n}</option>)}
                </select>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold block">3. Quantité : {quantite}</label>
            <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full h-2 bg-slate-800 appearance-none accent-white cursor-pointer rounded-full" />
          </div>
        </div>

        {/* COLONNE DROITE */}
        <div className="relative pt-20 md:pt-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 z-20 pointer-events-none">
            <div className="text-[120px] md:text-[180px] animate-float drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]">
              {produit.img}
            </div>
          </div>

          <div className="bg-white text-slate-900 p-8 md:p-12 rounded-[2rem] shadow-2xl relative z-10">
            <h2 className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-300 mb-8 italic">Détails de l'estimation</h2>
            <div className="space-y-4 text-sm mb-10">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-400 font-bold uppercase text-[9px]">{produit.nom} (x{quantite})</span>
                <span className="font-black italic">{(produit.prixBase * quantite).toFixed(2)} €</span>
              </div>
              {hasSerigraphie && <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-400 font-bold uppercase text-[9px]">Sérigraphie - {placeSeri}</span><span className="font-black italic text-slate-900">+{prixSerigraphie.toFixed(2)} €</span></div>}
              {hasNumerique && <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-400 font-bold uppercase text-[9px]">Numérique - {placeNum}</span><span className="font-black italic text-slate-900">+{prixNumerique.toFixed(2)} €</span></div>}
              {hasBroderie && <div className="flex justify-between border-b border-slate-50 pb-2"><span className="text-slate-400 font-bold uppercase text-[9px]">Broderie - {['Cœur', 'Central', 'Dos'][placeBroderieIdx]}</span><span className="font-black italic text-slate-900">+{prixBroderie.toFixed(2)} €</span></div>}
            </div>

            <div className="space-y-1 text-right border-t-2 border-slate-900 pt-6">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Prix Total TTC</p>
              <div className="text-6xl font-black tracking-tighter text-slate-900 leading-none">
                {totalTTC.toFixed(2)}<span className="text-2xl ml-1 font-light italic text-slate-400">€</span>
              </div>
              {/* PRIX À L'UNITÉ RÉINTÉGRÉ ICI */}
              <div className="pt-4">
                <span className="bg-slate-900 text-white px-3 py-1 text-[10px] font-black uppercase italic tracking-[0.2em] rounded">
                  Soit {prixUnitaireTTC.toFixed(2)} € / Unité TTC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 to-slate-950 p-8 md:p-14 rounded-[3.5rem] border border-slate-800 shadow-3xl text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Un projet sur-mesure ?</h3>
            <p className="text-slate-500 text-[10px] leading-relaxed uppercase tracking-[0.2em] font-bold">
              Besoin de quantités plus importantes ou de techniques spécifiques ? Laisse tes coordonnées, on t'appelle.
            </p>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="MAIL OU TÉLÉPHONE" className="w-full bg-slate-900 border border-slate-800 p-6 rounded-2xl text-[10px] font-black tracking-widest uppercase focus:border-white outline-none transition-all placeholder:text-slate-700" />
            <button className="w-full bg-white text-slate-900 py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-slate-200 transition-all hover:scale-[1.02] active:scale-95">
              Envoyer la demande
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite !important; display: inline-block; }
      `}} />
    </div>
  );
}