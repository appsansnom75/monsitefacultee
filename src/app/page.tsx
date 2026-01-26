'use client';
import React, { useState } from 'react';

// --- DONNÉES DE PRIX (+20%) ---
const PRODUITS = [
  { id: 'TSHIRT', nom: 'TSHIRT BIO', prixBase: 3.00 },
  { id: 'HOODIE', nom: 'SWEAT À CAPUCHE', prixBase: 8.96 },
  { id: 'SWEAT', nom: 'SWEAT COL ROND', prixBase: 6.60 },
  { id: 'TOTEBAG', nom: 'TOTE BAG COTON', prixBase: 1.20 },
];

const FORFAITS_SERIGRAPHIE = [
  { qte: 10, couleurs: [44.52, 76.80, 109.08, 141.36, 173.64, 205.92, 238.20, 270.48] },
  { qte: 20, couleurs: [59.04, 93.60, 128.16, 162.72, 197.28, 231.84, 264.00, 300.96] },
  { qte: 50, couleurs: [80.40, 115.20, 150.00, 184.80, 219.60, 254.40, 289.20, 324.00] },
  { qte: 100, couleurs: [94.80, 130.80, 166.80, 202.80, 238.80, 274.80, 310.80, 346.80] },
  { qte: 200, couleurs: [159.60, 201.60, 243.60, 285.60, 327.60, 369.60, 411.60, 453.60] },
];

const FORFAITS_NUMERIQUE = [
  { qte: 10, prix: 56.52 }, { qte: 20, prix: 71.04 }, { qte: 50, prix: 111.00 },
  { qte: 100, prix: 172.80 }, { qte: 200, prix: 303.60 }
];

const FORFAITS_BRODERIE = [
  { qte: 10, emplacements: [83.04, 185.16, 198.96] },
  { qte: 20, emplacements: [118.08, 322.32, 349.92] },
  { qte: 50, emplacements: [187.80, 723.60, 791.40] },
  { qte: 100, emplacements: [289.20, 1332.00, 1460.40] },
  { qte: 200, emplacements: [530.40, 2616.00, 2872.80] },
];

const EMPLACEMENTS = ['COEUR', 'CENTRAL', 'DOS', 'MANCHE'];

export default function HomePage() {
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState<string | null>(null);

  const [seriChoices, setSeriChoices] = useState<{place: string, colors: number}[]>([]);
  const [numChoices, setNumChoices] = useState<string[]>([]);
  const [broderieChoices, setBroderieChoices] = useState<number[]>([]);

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];

  const getPalier = (arr: any[]) => [...arr].reverse().find(f => quantite >= f.qte) || arr[0];

  const totalSerigraphie = seriChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_SERIGRAPHIE).couleurs[curr.colors], 0);
  const totalNumerique = numChoices.length * getPalier(FORFAITS_NUMERIQUE).prix;
  const totalBroderie = broderieChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_BRODERIE).emplacements[curr], 0);

  const totalHT = (produit.prixBase * quantite) + totalSerigraphie + totalNumerique + totalBroderie;
  const tva = totalHT * 0.20;
  const totalTTC = totalHT + tva;
  const prixUnitaireTTC = totalTTC / quantite;

  const definitions = {
    SERI: "Idéal pour les grandes quantités : rendu éclatant, résistant et économique par couleur.",
    NUM: "Parfait pour les logos multicolores ou photos : impression directe dans la fibre sans limite de couleurs.",
    BROD: "Le marquage haut de gamme : relief élégant et durabilité exceptionnelle pour un rendu pro."
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans selection:bg-white selection:text-slate-900">
      <div className="max-w-6xl mx-auto mb-20">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase border-l-8 border-white pl-6">FACULTEE</h1>
          <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">Studio de personnalisation textile</p>
        </header>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-12">
            {/* 01 SUPPORT */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">01. SUPPORT TEXTILE</label>
              <div className="grid grid-cols-2 gap-3">
                {PRODUITS.map(p => (
                  <button key={p.id} onClick={() => setProduitId(p.id)} 
                    className={`p-5 rounded-xl border-2 transition-all font-black text-[10px] tracking-widest ${produitId === p.id ? 'border-white bg-white text-slate-900' : 'border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                    {p.nom}
                  </button>
                ))}
                <button onClick={() => setShowPopup(true)} className="p-5 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 font-black text-[10px] tracking-widest hover:border-white hover:text-white transition-all uppercase">AUTRES +</button>
              </div>
            </div>

            {/* 02 MARQUAGES */}
            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">02. MARQUAGES CUMULABLES</label>
              
              {/* TOOLTIP DISPLAY */}
              {infoTooltip && (
                <div className="bg-white text-slate-900 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest animate-in slide-in-from-top-2">
                   💡 {infoTooltip}
                </div>
              )}

              {/* SÉRIGRAPHIE */}
              <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs tracking-widest uppercase">SÉRIGRAPHIE</span>
                    <button onClick={() => setInfoTooltip(infoTooltip === definitions.SERI ? null : definitions.SERI)} className="w-4 h-4 rounded-full border border-slate-500 text-[10px] flex items-center justify-center text-slate-500 hover:text-white hover:border-white">?</button>
                  </div>
                  <button onClick={() => setSeriChoices([...seriChoices, {place: 'COEUR', colors: 0}])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black uppercase">AJOUTER</button>
                </div>
                {seriChoices.map((s, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={s.place} onChange={(e) => {
                      const newC = [...seriChoices]; newC[i].place = e.target.value; setSeriChoices(newC);
                    }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                    <select className="w-24 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={s.colors} onChange={(e) => {
                      const newC = [...seriChoices]; newC[i].colors = Number(e.target.value); setSeriChoices(newC);
                    }}>{[1,2,3,4,5,6,7,8].map((n, idx) => <option key={idx} value={idx}>{n} COUL.</option>)}</select>
                    <button onClick={() => setSeriChoices(seriChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2">✕</button>
                  </div>
                ))}
              </div>

              {/* NUMÉRIQUE */}
              <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs tracking-widest uppercase">NUMÉRIQUE</span>
                    <button onClick={() => setInfoTooltip(infoTooltip === definitions.NUM ? null : definitions.NUM)} className="w-4 h-4 rounded-full border border-slate-500 text-[10px] flex items-center justify-center text-slate-500 hover:text-white hover:border-white">?</button>
                  </div>
                  <button onClick={() => setNumChoices([...numChoices, 'COEUR'])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black uppercase">AJOUTER</button>
                </div>
                {numChoices.map((n, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={n} onChange={(e) => {
                      const newC = [...numChoices]; newC[i] = e.target.value; setNumChoices(newC);
                    }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                    <button onClick={() => setNumChoices(numChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2">✕</button>
                  </div>
                ))}
              </div>

              {/* BRODERIE */}
              <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs tracking-widest uppercase">BRODERIE</span>
                    <button onClick={() => setInfoTooltip(infoTooltip === definitions.BROD ? null : definitions.BROD)} className="w-4 h-4 rounded-full border border-slate-500 text-[10px] flex items-center justify-center text-slate-500 hover:text-white hover:border-white">?</button>
                  </div>
                  <button onClick={() => setBroderieChoices([...broderieChoices, 0])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black uppercase">AJOUTER</button>
                </div>
                {broderieChoices.map((b, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={b} onChange={(e) => {
                      const newC = [...broderieChoices]; newC[i] = Number(e.target.value); setBroderieChoices(newC);
                    }}>
                      <option value={0}>COEUR</option><option value={1}>CENTRAL</option><option value={2}>DOS</option>
                    </select>
                    <button onClick={() => setBroderieChoices(broderieChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2">✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 03 QUANTITÉ */}
            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">03. QUANTITÉ : {quantite}</label>
              <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full h-3 bg-slate-800 appearance-none accent-white cursor-pointer rounded-full" />
            </div>
          </div>

          {/* RÉCAPITULATIF STICKY */}
          <div className="bg-white text-slate-900 p-10 rounded-[2.5rem] shadow-3xl sticky top-12 border-t-[12px] border-slate-50">
            <h2 className="font-black uppercase text-[10px] tracking-[0.5em] text-slate-300 mb-10 text-center">VOTRE ESTIMATION HT</h2>
            
            <div className="space-y-4 mb-12">
               <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">{produit.nom} (x{quantite})</span><span>{(produit.prixBase * quantite).toFixed(2)} €</span></div>
               {totalSerigraphie > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL SÉRIGRAPHIE</span><span>{totalSerigraphie.toFixed(2)} €</span></div>}
               {totalNumerique > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL NUMÉRIQUE</span><span>{totalNumerique.toFixed(2)} €</span></div>}
               {totalBroderie > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL BRODERIE</span><span>{totalBroderie.toFixed(2)} €</span></div>}
            </div>

            <div className="text-center space-y-4 border-t-2 border-slate-50 pt-8">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">TOTAL TTC (TVA 20%)</p>
              <div className="text-7xl font-black tracking-tighter text-slate-900">{totalTTC.toFixed(2)}€</div>
              
              <div className="flex flex-col items-center gap-3 pt-4">
                <span className="bg-slate-900 text-white px-5 py-2 text-[10px] font-black uppercase rounded-full tracking-widest">SOIT {prixUnitaireTTC.toFixed(2)} € / UNITÉ</span>
                <span className="flex items-center gap-2 text-emerald-600 font-black text-[11px] tracking-[0.2em] uppercase bg-emerald-50 px-4 py-1.5 rounded-lg border border-emerald-100">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  LIVRAISON OFFERTE
                </span>
              </div>
            </div>

            <button onClick={() => setShowPopup(true)} className="w-full mt-12 bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:bg-slate-800 transition-all shadow-2xl">
              RECEVOIR MON DEVIS
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER - ALIGNÉ À GAUCHE */}
      <footer className="max-w-6xl mx-auto border-t border-slate-800 pt-20 pb-10">
        <div className="grid md:grid-cols-3 gap-12 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
          {/* Bloc 1 */}
          <div className="space-y-4 text-left">
            <p className="text-white text-[10px]">MENTIONS LÉGALES</p>
            <p>FACULTEE.FR - STUDIO DE PERSONNALISATION TEXTILE</p>
            <p>SIRET : 92031761700016</p>
            <p>SIÈGE SOCIAL : FRANCE</p>
          </div>
          
          {/* Bloc 2 */}
          <div className="space-y-4 text-left">
            <p className="text-white text-[10px]">LIVRAISON</p>
            <p>OFFERTE SUR TOUTE LA FRANCE MÉTROPOLITAINE.</p>
            <p>DÉLAIS : 10 À 15 JOURS OUVRÉS APRÈS VALIDATION.</p>
          </div>
          
          {/* Bloc 3 */}
          <div className="space-y-4 text-left">
            <p className="text-white text-[10px]">CONTACT</p>
            <p>HELLO@FACULTEE.FR</p>
            <p>© 2024 FACULTEE. TOUS DROITS RÉSERVÉS.</p>
          </div>
        </div>
      </footer>

      {/* MODAL CONTACT */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white text-slate-900 w-full max-w-lg p-12 rounded-[3rem] relative z-10 shadow-2xl border-t-[10px] border-slate-900 animate-in zoom-in duration-200">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none">VOTRE PROJET.</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">On vous rappelle pour valider les détails.</p>
            <div className="space-y-4">
              <input type="text" placeholder="MAIL OU TÉLÉPHONE" className="w-full border-2 border-slate-100 p-6 rounded-2xl font-black uppercase text-xs outline-none focus:border-slate-900 transition-all" />
              <textarea placeholder="VOTRE PROJET EN QUELQUES MOTS..." rows={3} className="w-full border-2 border-slate-100 p-6 rounded-2xl font-black uppercase text-xs outline-none focus:border-slate-900 transition-all" />
              <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:invert transition-all">ENVOYER LA DEMANDE</button>
            </div>
            <button onClick={() => setShowPopup(false)} className="absolute top-8 right-10 font-black text-slate-200 hover:text-slate-900 transition-all uppercase text-[9px] tracking-widest">FERMER</button>
          </div>
        </div>
      )}
    </div>
  );
}