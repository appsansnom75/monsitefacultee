'use client';
import React, { useState } from 'react';

const PRODUITS = [
  { id: 'TSHIRT', nom: 'T-SHIRT UNISEX', prixBase: 3.60, imageBase: '/sansimpression.png' },
  { id: 'HOODIE', nom: 'SWEAT À CAPUCHE', prixBase: 10.75, imageBase: '/hvert.png' },
  { id: 'SWEAT', nom: 'SWEAT COL ROND', prixBase: 7.92, imageBase: '/sjaune.png' },
  { id: 'TOTEBAG', nom: 'TOTE BAG', prixBase: 1.44, imageBase: '/tblanc.png' },
];

const EMPLACEMENTS = ['COEUR', 'CENTRAL', 'DOS'];

export default function HomePage() {
  const [produitId, setProduitId] = useState('TSHIRT');
  const [quantite, setQuantite] = useState(10);
  const [seriChoices, setSeriChoices] = useState<{place: string}[]>([]);
  const [numChoices, setNumChoices] = useState<string[]>([]);
  const [broderieChoices, setBroderieChoices] = useState<{place: string}[]>([]);

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];

  // --- LOGIQUE D'AFFICHAGE DES IMAGES ---
  const getDisplayImage = () => {
    // CONDITION : Si c'est le T-shirt, on applique la logique de combinaisons
    if (produitId === 'TSHIRT') {
      const selected = Array.from(new Set([
        ...seriChoices.map(s => s.place.toLowerCase()),
        ...numChoices.map(n => n.toLowerCase()),
        ...broderieChoices.map(b => b.place.toLowerCase())
      ]));

      if (selected.length === 0) return '/sansimpression.png';

      // Tri pour correspondre à tes noms de fichiers (coeur > central > dos)
      const order = ['coeur', 'central', 'dos'];
      const sorted = selected.sort((a, b) => order.indexOf(a) - order.indexOf(b));
      
      return `/${sorted.join('+')}.png`;
    }

    // CONDITION : Pour tous les autres produits, on reste sur l'image de base
    return produit.imageBase;
  };

  const currentImage = getDisplayImage();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 flex justify-between items-center">
          <h1 className="text-4xl font-black tracking-tighter border-l-8 border-white pl-6">FACULTEE</h1>
          <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">STUDIO DE PERSONNALISATION</p>
        </header>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* CONFIGURATION */}
          <div className="space-y-12">
            <section className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">01. CHOIX DU PRODUIT</label>
              <div className="grid grid-cols-2 gap-3">
                {PRODUITS.map(p => (
                  <button key={p.id} onClick={() => setProduitId(p.id)} 
                    className={`p-5 rounded-xl border-2 font-black text-[10px] tracking-widest transition-all ${produitId === p.id ? 'border-white bg-white text-slate-900' : 'border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                    {p.nom}
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">02. PERSONNALISATION</label>
              
              {/* SÉRIGRAPHIE */}
              <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-black text-xs tracking-widest uppercase">SÉRIGRAPHIE</span>
                  <button onClick={() => setSeriChoices([...seriChoices, {place: 'COEUR'}])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black">AJOUTER</button>
                </div>
                {seriChoices.map((s, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={s.place} onChange={(e) => {
                      const newC = [...seriChoices]; newC[i].place = e.target.value; setSeriChoices(newC);
                    }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                    <button onClick={() => setSeriChoices(seriChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2 text-[10px]">X</button>
                  </div>
                ))}
              </div>

              {/* BRODERIE */}
              <div className="p-6 rounded-2xl border-2 border-slate-800 bg-slate-900/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-black text-xs tracking-widest uppercase">BRODERIE</span>
                  <button onClick={() => setBroderieChoices([...broderieChoices, {place: 'COEUR'}])} className="bg-white text-slate-900 text-[9px] px-3 py-1 rounded font-black">AJOUTER</button>
                </div>
                {broderieChoices.map((b, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <select className="flex-1 bg-slate-950 p-2 rounded text-[10px] font-black border border-slate-800 uppercase" value={b.place} onChange={(e) => {
                      const newC = [...broderieChoices]; newC[i].place = e.target.value; setBroderieChoices(newC);
                    }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                    <button onClick={() => setBroderieChoices(broderieChoices.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2 text-[10px]">X</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <label className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-black">03. QUANTITÉ : {quantite}</label>
              <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full h-3 bg-slate-800 appearance-none accent-white cursor-pointer rounded-full" />
            </section>
          </div>

          {/* VISUEL ET PRIX */}
          <div className="sticky top-12 flex flex-col items-center">
            <div className="w-full h-80 flex justify-center items-center mb-[-40px] relative z-10 pointer-events-none">
              <img 
                key={currentImage}
                src={currentImage} 
                alt="Aperçu"
                className="h-full w-auto object-contain transition-all duration-300 animate-in fade-in zoom-in"
                style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" }}
                onError={(e) => { e.currentTarget.src = '/sansimpression.png'; }}
              />
            </div>

            <div className="w-full bg-white text-slate-900 p-10 rounded-[2.5rem] shadow-2xl">
              <h2 className="font-black uppercase text-[10px] tracking-[0.5em] text-slate-300 mb-10 text-center border-b pb-4">ESTIMATION HT</h2>
              <div className="text-center py-6">
                <div className="text-7xl font-black tracking-tighter">{(produit.prixBase * quantite).toFixed(2)}€</div>
                <p className="text-[10px] font-black text-slate-400 mt-4 tracking-widest uppercase">PRIX BASE SANS MARQUAGE</p>
              </div>
              <button className="w-full mt-8 bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all">
                DEMANDER UN DEVIS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}