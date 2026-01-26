'use client';
import React, { useState, useEffect } from 'react';

// --- DONNÉES DE PRIX ---
const PRODUITS = [
  { id: 'TSHIRT', nom: 'TSHIRT BIO', prixBase: 2.50, img: '👕' },
  { id: 'HOODIE', nom: 'SWEAT À CAPUCHE', prixBase: 7.47, img: '🧥' },
  { id: 'SWEAT', nom: 'SWEAT COL ROND', prixBase: 5.50, img: '👕' },
  { id: 'TOTEBAG', nom: 'TOTE BAG COTON', prixBase: 1.00, img: '👜' },
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
  { qte: 10, emplacements: [69.2, 154.3, 165.8] }, // Coeur, Central, Dos
  { qte: 20, emplacements: [98.4, 268.6, 291.6] },
  { qte: 50, emplacements: [156.50, 603, 659.5] },
  { qte: 100, emplacements: [241, 1110, 1217] },
  { qte: 200, emplacements: [442, 2180, 2394] },
];

const EMPLACEMENTS = ['COEUR', 'CENTRAL', 'DOS', 'MANCHE'];

export default function ConfigurateurFacultee() {
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  const [showPopup, setShowPopup] = useState(false);

  // Sélections multiples pour Sérigraphie
  const [seriChoices, setSeriChoices] = useState<{place: string, colors: number}[]>([]);
  // Sélections multiples pour Numérique
  const [numChoices, setNumChoices] = useState<string[]>([]);
  // Sélections multiples pour Broderie (on stocke l'index du type : 0=coeur, 1=central, 2=dos)
  const [broderieChoices, setBroderieChoices] = useState<number[]>([]);

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];

  // Fonctions de calcul
  const getPalier = (arr: any[]) => [...arr].reverse().find(f => quantite >= f.qte) || arr[0];

  const totalSerigraphie = seriChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_SERIGRAPHIE).couleurs[curr.colors], 0);
  const totalNumerique = numChoices.length * getPalier(FORFAITS_TRANSFERT).prix;
  const totalBroderie = broderieChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_BRODERIE).emplacements[curr], 0);

  const totalHT = (produit.prixBase * quantite) + totalSerigraphie + totalNumerique + totalBroderie;
  const tva = totalHT * 0.20;
  const totalTTC = totalHT + tva;
  const prixUnitaireTTC = totalTTC / quantite;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans pb-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start mb-20">
        
        {/* GAUCHE : CONFIGURATION */}
        <div className="space-y-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase border-l-8 border-white pl-6">FACULTEE DEVIS</h1>
          
          {/* SUPPORTS */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">01. SUPPORT TEXTILE</label>
            <div className="grid grid-cols-2 gap-3">
              {PRODUITS.map(p => (
                <button key={p.id} onClick={() => setProduitId(p.id)} 
                  className={`p-5 rounded-xl border-2 transition-all font-black text-[10px] tracking-widest ${produitId === p.id ? 'border-white bg-white text-slate-900' : 'border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                  {p.nom}
                </button>
              ))}
              <button onClick={() => setShowPopup(true)} className="p-5 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 font-black text-[10px] tracking-widest hover:border-white hover:text-white transition-all">AUTRES +</button>
            </div>
          </div>

          {/* PERSONNALISATION MULTIPLE */}
          <div className="space-y-6">
            <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">02. MARQUAGES CUMULABLES</label>
            
            {/* SÉRIGRAPHIE MULTIPLE */}
            <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
              <div className="flex justify-between items-center mb-4">
                <span className="font-black text-xs tracking-widest uppercase">SÉRIGRAPHIE</span>
                <button onClick={() => setSeriChoices([...seriChoices, {place: 'COEUR', colors: 0}])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black">+ AJOUTER ZONE</button>
              </div>
              {seriChoices.map((s, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-bold border border-slate-800 uppercase" value={s.place} onChange={(e) => {
                    const newC = [...seriChoices]; newC[i].place = e.target.value; setSeriChoices(newC);
                  }}>
                    {EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <select className="w-24 bg-slate-950 p-2 rounded text-[10px] font-bold border border-slate-800 uppercase" value={s.colors} onChange={(e) => {
                    const newC = [...seriChoices]; newC[i].colors = Number(e.target.value); setSeriChoices(newC);
                  }}>
                    {[1,2,3,4,5,6,7,8].map((n, idx) => <option key={idx} value={idx}>{n} COUL.</option>)}
                  </select>
                  <button onClick={() => setSeriChoices(seriChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-bold px-2">✕</button>
                </div>
              ))}
            </div>

            {/* NUMÉRIQUE MULTIPLE */}
            <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
              <div className="flex justify-between items-center mb-4">
                <span className="font-black text-xs tracking-widest uppercase">NUMÉRIQUE</span>
                <button onClick={() => setNumChoices([...numChoices, 'COEUR'])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black">+ AJOUTER ZONE</button>
              </div>
              {numChoices.map((n, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-bold border border-slate-800 uppercase" value={n} onChange={(e) => {
                    const newC = [...numChoices]; newC[i] = e.target.value; setNumChoices(newC);
                  }}>
                    {EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <button onClick={() => setNumChoices(numChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-bold px-2">✕</button>
                </div>
              ))}
            </div>

            {/* BRODERIE MULTIPLE */}
            <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
              <div className="flex justify-between items-center mb-4">
                <span className="font-black text-xs tracking-widest uppercase">BRODERIE</span>
                <button onClick={() => setBroderieChoices([...broderieChoices, 0])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black">+ AJOUTER ZONE</button>
              </div>
              {broderieChoices.map((b, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-bold border border-slate-800 uppercase" value={b} onChange={(e) => {
                    const newC = [...broderieChoices]; newC[i] = Number(e.target.value); setBroderieChoices(newC);
                  }}>
                    <option value={0}>COEUR</option><option value={1}>CENTRAL</option><option value={2}>DOS</option>
                  </select>
                  <button onClick={() => setBroderieChoices(broderieChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-bold px-2">✕</button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">03. QUANTITÉ : {quantite}</label>
            <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full h-3 bg-slate-800 appearance-none accent-white cursor-pointer rounded-full" />
          </div>
        </div>

        {/* DROITE : PRIX & FLOTTANT */}
        <div className="relative pt-20 md:pt-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 z-20 pointer-events-none">
            <div className="text-[130px] md:text-[200px] animate-float drop-shadow-2xl">{produit.img}</div>
          </div>

          <div className="bg-white text-slate-900 p-10 rounded-[2.5rem] shadow-3xl relative z-10 border-t-[12px] border-slate-100">
            <h2 className="font-black uppercase text-[10px] tracking-[0.5em] text-slate-300 mb-10 text-center">RÉCAPITULATIF PROVISOIRE</h2>
            
            <div className="space-y-4 mb-12">
               <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">{produit.nom} (x{quantite})</span><span>{(produit.prixBase * quantite).toFixed(2)} €</span></div>
               {totalSerigraphie > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL SÉRIGRAPHIE</span><span>{totalSerigraphie.toFixed(2)} €</span></div>}
               {totalNumerique > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL NUMÉRIQUE</span><span>{totalNumerique.toFixed(2)} €</span></div>}
               {totalBroderie > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL BRODERIE</span><span>{totalBroderie.toFixed(2)} €</span></div>}
            </div>

            <div className="text-center space-y-2 border-t-2 border-slate-50 pt-8">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ESTIMATION TTC</p>
              <div className="text-7xl font-black tracking-tighter text-slate-900">{totalTTC.toFixed(2)}€</div>
              <div className="pt-4"><span className="bg-slate-900 text-white px-5 py-2 text-[10px] font-black uppercase rounded-full">SOIT {prixUnitaireTTC.toFixed(2)} € / UNITÉ</span></div>
            </div>

            <button onClick={() => setShowPopup(true)} className="w-full mt-12 bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:bg-slate-800 transition-all hover:scale-[1.03] shadow-2xl">
              CONFIRMER & RECEVOIR
            </button>
          </div>
        </div>
      </div>

      {/* POPUP MODAL SMOOTH */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white text-slate-900 w-full max-w-lg p-10 rounded-[3rem] relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 leading-none">PARLONS DE VOTRE PROJET.</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Nous reviendrons vers vous sous 24h.</p>
            
            <div className="space-y-4">
              <input type="text" placeholder="MAIL OU TÉLÉPHONE" className="w-full border-2 border-slate-100 p-5 rounded-2xl font-black uppercase text-xs outline-none focus:border-slate-900 transition-all" />
              <textarea placeholder="VOTRE PROJET EN QUELQUES MOTS (FACULTATIF)" rows={3} className="w-full border-2 border-slate-100 p-5 rounded-2xl font-black uppercase text-xs outline-none focus:border-slate-900 transition-all" />
              <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:invert transition-all">ENVOYER LA DEMANDE</button>
            </div>
            <button onClick={() => setShowPopup(false)} className="absolute top-6 right-8 font-black text-slate-300 hover:text-slate-900 transition-all uppercase text-[10px] tracking-widest">FERMER</button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(5deg); } 100% { transform: translateY(0px) rotate(0deg); } }
        .animate-float { animation: float 6s ease-in-out infinite !important; display: inline-block; }
        .animate-in { animation: zoomIn 0.3s ease-out; }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}} />
    </div>
  );
}