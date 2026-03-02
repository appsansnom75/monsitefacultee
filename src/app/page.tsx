'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// --- DONNÉES DE PRIX ---
const PRODUITS = [
  { id: 'TSHIRT', nom: 'T-SHIRT UNISEX', prixBase: 3.60, image: '/trouge.png' },
  { id: 'HOODIE', nom: 'SWEAT À CAPUCHE', prixBase: 10.75, image: '/hvert.png' },
  { id: 'SWEAT', nom: 'SWEAT COL ROND', prixBase: 7.92, image: '/sjaune.png' },
  { id: 'TOTEBAG', nom: 'TOTE BAG', prixBase: 1.44, image: '/tblanc.png' },
];

const FORFAITS_SERIGRAPHIE = [
  { qte: 10, couleurs: [53.42, 92.16, 130.90, 169.63, 208.37, 247.10, 285.84, 324.58] },
  { qte: 20, couleurs: [70.85, 112.32, 153.79, 195.26, 236.74, 278.21, 316.80, 361.15] },
  { qte: 50, couleurs: [96.48, 138.24, 180.00, 221.76, 263.52, 305.28, 347.04, 388.80] },
  { qte: 100, couleurs: [113.76, 156.96, 200.16, 243.36, 286.56, 329.76, 372.96, 416.16] },
  { qte: 200, couleurs: [191.52, 241.92, 292.32, 342.72, 393.12, 443.52, 493.92, 544.32] },
];

const FORFAITS_NUMERIQUE = [
  { qte: 10, prix: 67.82 }, { qte: 20, prix: 85.25 }, { qte: 50, prix: 133.20 },
  { qte: 100, prix: 207.36 }, { qte: 200, prix: 364.32 }
];

const FORFAITS_BRODERIE = [
  { qte: 10, emplacements: [99.65, 222.19, 238.75] },
  { qte: 20, emplacements: [141.70, 386.78, 419.90] },
  { qte: 50, emplacements: [225.36, 868.32, 949.68] },
  { qte: 100, emplacements: [347.04, 1598.40, 1752.48] },
  { qte: 200, emplacements: [636.48, 3139.20, 3447.36] },
];

const EMPLACEMENTS = ['COEUR', 'CENTRAL', 'DOS', 'MANCHE'];

export default function HomePage() {
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("https://formspree.io/f/xwvobjgj", {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      setIsSubmitted(true);
      setTimeout(() => { setShowPopup(false); setIsSubmitted(false); }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#002344] text-white p-6 md:p-12 font-sans selection:bg-white selection:text-slate-900">
      <div className="max-w-6xl mx-auto mb-20">
        
        {/* HEADER AVEC LOGO AGRANDI x3 */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="relative">
             <img 
               src="/logo.png" 
               alt="FACULTEE Logo" 
               className="h-36 w-auto object-contain"
             />
          </div>
          <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">STUDIO DE PERSONNALISATION TEXTILE</p>
        </header>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* COLONNE GAUCHE : OPTIONS */}
          <div className="space-y-12">
            
            {/* 01 SUPPORT TEXTILE */}
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
              <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">02. MARQUAGES</label>
              
              <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-black text-xs tracking-widest uppercase">SERIGRAPHIE</span>
                  <button onClick={() => setSeriChoices([...seriChoices, {place: 'COEUR', colors: 0}])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black uppercase">AJOUTER</button>
                </div>
                {seriChoices.map((s, i) => (
                  <div key={i} className="flex gap-2 mt-2 animate-in slide-in-from-left duration-300">
                    <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={s.place} onChange={(e) => {
                      const newC = [...seriChoices]; newC[i].place = e.target.value; setSeriChoices(newC);
                    }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                    <select className="w-24 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={s.colors} onChange={(e) => {
                      const newC = [...seriChoices]; newC[i].colors = Number(e.target.value); setSeriChoices(newC);
                    }}>{[1,2,3,4,5,6,7,8].map((n, idx) => <option key={idx} value={idx}>{n} COUL.</option>)}</select>
                    <button onClick={() => setSeriChoices(seriChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2">X</button>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-black text-xs tracking-widest uppercase">NUMERIQUE</span>
                  <button onClick={() => setNumChoices([...numChoices, 'COEUR'])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black uppercase">AJOUTER</button>
                </div>
                {numChoices.map((n, i) => (
                  <div key={i} className="flex gap-2 mt-2 animate-in slide-in-from-left duration-300">
                    <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={n} onChange={(e) => {
                      const newC = [...numChoices]; newC[i] = e.target.value; setNumChoices(newC);
                    }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                    <button onClick={() => setNumChoices(numChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2">X</button>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-black text-xs tracking-widest uppercase">BRODERIE</span>
                  <button onClick={() => setBroderieChoices([...broderieChoices, 0])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black uppercase">AJOUTER</button>
                </div>
                {broderieChoices.map((b, i) => (
                  <div key={i} className="flex gap-2 mt-2 animate-in slide-in-from-left duration-300">
                    <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={b} onChange={(e) => {
                      const newC = [...broderieChoices]; newC[i] = Number(e.target.value); setBroderieChoices(newC);
                    }}>
                      <option value={0}>COEUR</option><option value={1}>CENTRAL</option><option value={2}>DOS</option>
                    </select>
                    <button onClick={() => setBroderieChoices(broderieChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2">X</button>
                  </div>
                ))}
              </div>
            </div>

            {/* 03 QUANTITÉ */}
            <div className="space-y-6">
              <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">03. QUANTITE : {quantite}</label>
              <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full h-3 bg-slate-800 appearance-none accent-white cursor-pointer rounded-full" />
              <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase tracking-widest">
                <span>Min: 10</span>
                <span>Max: 200+</span>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : RÉCAPITULATIF + IMAGE */}
          <div className="sticky top-12">
            <div className="flex justify-center mb-[-40px] relative z-10 pointer-events-none">
              <img 
                key={produit.id}
                src={produit.image} 
                alt={produit.nom}
                className="h-64 w-auto object-contain animate-in fade-in zoom-in duration-500"
                style={{ filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.4))" }}
              />
            </div>

            <div className="bg-white text-slate-900 p-10 rounded-[2.5rem] shadow-3xl border-t-[12px] border-slate-50">
              <h2 className="font-black uppercase text-[10px] tracking-[0.5em] text-slate-300 mb-10 text-center">VOTRE ESTIMATION HT</h2>
              
              <div className="space-y-4 mb-12">
                 <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">{produit.nom} (x{quantite})</span><span>{(produit.prixBase * quantite).toFixed(2)} €</span></div>
                 {totalSerigraphie > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL SERIGRAPHIE</span><span>{totalSerigraphie.toFixed(2)} €</span></div>}
                 {totalNumerique > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL NUMERIQUE</span><span>{totalNumerique.toFixed(2)} €</span></div>}
                 {totalBroderie > 0 && <div className="flex justify-between text-[11px] font-black uppercase"><span className="text-slate-400">TOTAL BRODERIE</span><span>{totalBroderie.toFixed(2)} €</span></div>}
              </div>

              <div className="text-center space-y-4 border-t-2 border-slate-50 pt-8">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">TOTAL TTC (TVA 20%)</p>
                <div className="text-7xl font-black tracking-tighter text-slate-900">{totalTTC.toFixed(2)}€</div>
                <div className="flex flex-col items-center gap-3 pt-4">
                  <span className="bg-slate-900 text-white px-5 py-2 text-[10px] font-black uppercase rounded-full tracking-widest">SOIT {prixUnitaireTTC.toFixed(2)} € / UNITE</span>
                </div>
              </div>

              <button onClick={() => setShowPopup(true)} className="w-full mt-12 bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:bg-slate-800 transition-all shadow-2xl active:scale-95">
                RECEVOIR MON DEVIS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto border-t border-slate-800 pt-20 pb-10 px-6">
        <div className="grid md:grid-cols-3 gap-12 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
          <div>
            <p className="text-white text-[10px] mb-4">MENTIONS LEGALES</p>
            <p>FACULTEE.FR - SIRET : 92031761700016</p>
            <p className="mt-2">PROPRIÉTÉ DE FACULTEE STUDIO</p>
          </div>
          <div>
            <p className="text-white text-[10px] mb-4">LIVRAISON</p>
            <p>OFFERTE SUR TOUTE L'EUROPE.</p>
            <p className="mt-2">DÉLAI MOYEN : 5 À 10 JOURS OUVRES.</p>
          </div>
          <div>
            <p className="text-white text-[10px] mb-4">CONTACT</p>
            <p>FACULTEE@OUTLOOK.COM</p>
            <p className="mt-2">INSTAGRAM : @FACULTEE.FR</p>
          </div>
        </div>
      </footer>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white text-slate-900 w-full max-w-lg p-12 rounded-[3rem] relative z-10 shadow-2xl border-t-[10px] border-slate-900 animate-in zoom-in duration-300">
            {!isSubmitted ? (
              <>
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-10">VOTRE PROJET.</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="Produit" value={produit.nom} />
                  <input type="hidden" name="Quantite" value={quantite} />
                  <input type="hidden" name="Estimation_TTC" value={`${totalTTC.toFixed(2)}€`} />
                  <input type="text" name="Nom" required placeholder="NOM ET PRENOM" className="w-full border-2 border-slate-100 p-6 rounded-2xl font-black uppercase text-xs outline-none focus:border-slate-900" />
                  <input type="text" name="Contact" required placeholder="MAIL OU TELEPHONE" className="w-full border-2 border-slate-100 p-6 rounded-2xl font-black uppercase text-xs outline-none focus:border-slate-900" />
                  <textarea name="Message" placeholder="DÉTAILS (COULEURS, AUTRE PRODUIT, LOGOS...)" rows={3} className="w-full border-2 border-slate-100 p-6 rounded-2xl font-black uppercase text-xs outline-none focus:border-slate-900" />
                  <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl active:scale-95">ENVOYER LA DEMANDE</button>
                </form>
              </>
            ) : (
              <div className="py-20 text-center">
                <div className="text-5xl mb-6">✅</div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">C'EST ENVOYÉ !</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ON VOUS RECONTACTE TRÈS VITE.</p>
              </div>
            )}
            <button onClick={() => setShowPopup(false)} className="absolute top-8 right-10 font-black text-slate-300 hover:text-slate-900 uppercase text-[9px] transition-colors">FERMER [X]</button>
          </div>
        </div>
      )}
    </div>
  );
}