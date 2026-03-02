'use client';
import React, { useState } from 'react';

// --- TYPES ---
interface Produit { id: string; nom: string; prixBase: number; image: string; }
interface SeriChoice { place: string; colors: number; }
interface SimpleChoice { place: string; }

// --- DONNÉES ---
const PRODUITS: Produit[] = [
  { id: 'TSHIRT', nom: 'T-SHIRT UNISEXE', prixBase: 3.60, image: '/trouge.png' },
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

const EMPLACEMENTS = ['CŒUR', 'CENTRAL', 'DOS', 'MANCHE'];

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  const [showPopup, setShowPopup] = useState(false);

  // ÉTATS DES MARQUAGES
  const [seriChoices, setSeriChoices] = useState<SeriChoice[]>([]);
  const [numChoices, setNumChoices] = useState<SimpleChoice[]>([]);
  const [broderieChoices, setBroderieChoices] = useState<number[]>([]); // Index de l'emplacement

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];
  const getPalier = (arr: any[]) => [...arr].reverse().find(f => quantite >= f.qte) || arr[0];

  const totalSerigraphie = seriChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_SERIGRAPHIE).couleurs[curr.colors], 0);
  const totalNumerique = numChoices.length * getPalier(FORFAITS_NUMERIQUE).prix;
  const totalBroderie = broderieChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_BRODERIE).emplacements[curr], 0);

  const totalHT = (produit.prixBase * quantite) + totalSerigraphie + totalNumerique + totalBroderie;
  const totalTTC = totalHT * 1.20;

  return (
    <div className="min-h-screen bg-[#002344] text-white selection:bg-white selection:text-[#002344] font-sans">
      
      <div className="max-w-6xl mx-auto px-8 py-12">
        
        <header className="flex justify-between items-center mb-24">
          <img src="/logoweb.jpg" alt="Logo" className="h-10 w-auto object-contain" />
          <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase italic">Studio de Personnalisation Textile</span>
        </header>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic mb-20">
          Créez <br /> <span className="text-outline-white text-transparent">L'Iconique.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* CARTE CONFIGURATEUR */}
          <div className={`md:col-span-8 rounded-[3.5rem] transition-all duration-700 border border-white/10 ${isOpen ? 'bg-white/10' : 'bg-white/5'}`}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-12 text-left flex justify-between items-center"
            >
              <div className="space-y-2">
                <p className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">Étape 01</p>
                <h2 className="text-4xl font-black uppercase italic tracking-tight text-white">Le Laboratoire</h2>
              </div>
              <div className={`w-14 h-14 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-white text-[#002344]' : ''}`}>
                <span className="text-3xl font-light">+</span>
              </div>
            </button>

            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-12 pb-12 space-y-12 border-t border-white/5 pt-12">
                
                {/* 1. CHOIX DU VÊTEMENT */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">01. Choix du textile</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {PRODUITS.map(p => (
                      <button key={p.id} onClick={() => setProduitId(p.id)} className={`flex flex-col items-center p-4 rounded-3xl border transition-all ${produitId === p.id ? 'bg-white text-[#002344] border-white' : 'bg-transparent border-white/10 text-white hover:border-white/30'}`}>
                        <img src={p.image} alt={p.nom} className="h-16 w-auto mb-3 object-contain" />
                        <span className="text-[8px] font-black uppercase text-center leading-tight">{p.nom}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. SÉRIGRAPHIE */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">02. Sérigraphie</p>
                        <button onClick={() => setSeriChoices([...seriChoices, {place: 'CŒUR', colors: 0}])} className="text-[9px] font-black bg-white text-[#002344] px-4 py-2 rounded-full">+ AJOUTER</button>
                    </div>
                    {seriChoices.map((s, i) => (
                        <div key={i} className="flex gap-3 bg-white/5 p-3 rounded-2xl animate-in fade-in zoom-in duration-300">
                            <select className="flex-1 bg-[#002344] p-3 rounded-xl text-[10px] font-black uppercase border-none text-white" value={s.place} onChange={(e) => { const newC = [...seriChoices]; newC[i].place = e.target.value; setSeriChoices(newC); }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                            <select className="w-24 bg-[#002344] p-3 rounded-xl text-[10px] font-black uppercase border-none text-white" value={s.colors} onChange={(e) => { const newC = [...seriChoices]; newC[i].colors = Number(e.target.value); setSeriChoices(newC); }}>{[1,2,3,4,5,6,7,8].map((n, idx) => <option key={idx} value={idx}>{n} COUL.</option>)}</select>
                            <button onClick={() => setSeriChoices(seriChoices.filter((_, idx) => idx !== i))} className="text-red-400 px-2 font-black">✕</button>
                        </div>
                    ))}
                </div>

                {/* 3. NUMÉRIQUE */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">03. Impression Numérique</p>
                        <button onClick={() => setNumChoices([...numChoices, {place: 'CŒUR'}])} className="text-[9px] font-black bg-white text-[#002344] px-4 py-2 rounded-full">+ AJOUTER</button>
                    </div>
                    {numChoices.map((n, i) => (
                        <div key={i} className="flex gap-3 bg-white/5 p-3 rounded-2xl animate-in fade-in zoom-in duration-300">
                            <select className="flex-1 bg-[#002344] p-3 rounded-xl text-[10px] font-black uppercase border-none text-white" value={n.place} onChange={(e) => { const newC = [...numChoices]; newC[i].place = e.target.value; setNumChoices(newC); }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                            <button onClick={() => setNumChoices(numChoices.filter((_, idx) => idx !== i))} className="text-red-400 px-2 font-black">✕</button>
                        </div>
                    ))}
                </div>

                {/* 4. BRODERIE */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">04. Broderie</p>
                        <button onClick={() => setBroderieChoices([...broderieChoices, 0])} className="text-[9px] font-black bg-white text-[#002344] px-4 py-2 rounded-full">+ AJOUTER</button>
                    </div>
                    {broderieChoices.map((b, i) => (
                        <div key={i} className="flex gap-3 bg-white/5 p-3 rounded-2xl animate-in fade-in zoom-in duration-300">
                            <select className="flex-1 bg-[#002344] p-3 rounded-xl text-[10px] font-black uppercase border-none text-white" value={b} onChange={(e) => { const newC = [...broderieChoices]; newC[i] = Number(e.target.value); setBroderieChoices(newC); }}>
                                <option value={0}>CŒUR</option>
                                <option value={1}>CENTRAL</option>
                                <option value={2}>DOS</option>
                            </select>
                            <button onClick={() => setBroderieChoices(broderieChoices.filter((_, idx) => idx !== i))} className="text-red-400 px-2 font-black">✕</button>
                        </div>
                    ))}
                </div>

                {/* 5. VOLUME */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">05. Volume de commande</span>
                    <span className="text-4xl font-black italic">{quantite} <span className="text-[10px] not-italic text-white/30 uppercase">unités</span></span>
                  </div>
                  <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full accent-white bg-white/10 h-1 rounded-full appearance-none cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* CARTE GUIDE */}
          <div className="md:col-span-4 space-y-6">
              <a href="/guide.pdf" download className="block group relative overflow-hidden rounded-[3rem] bg-gradient-to-b from-[#00386e] to-[#002344] p-12 min-h-[300px] border border-white/10 shadow-2xl transition-all hover:scale-[0.98]">
                <p className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">Étape 02</p>
                <h2 className="text-4xl font-black uppercase italic mt-4 leading-tight">Le Guide <br /> Ultime</h2>
                <div className="mt-12 flex items-center gap-3 font-black text-[10px] tracking-[0.3em] uppercase group-hover:translate-x-3 transition-transform">
                  Télécharger <span>↓</span>
                </div>
              </a>

              {/* RÉCAPITULATIF PRIX FIXÉ SUR LE CÔTÉ */}
              <div className="bg-white text-[#002344] p-10 rounded-[3rem] shadow-2xl">
                <p className="text-[10px] font-black text-[#002344]/40 uppercase tracking-widest text-center mb-6">Estimation TTC</p>
                <p className="text-5xl font-black italic text-center mb-8 tracking-tighter">{totalTTC.toFixed(2)}€</p>
                <button onClick={() => setShowPopup(true)} className="w-full bg-[#002344] text-white py-6 rounded-3xl font-black uppercase text-[10px] tracking-[0.4em] hover:scale-105 transition-transform">
                  Valider mon projet
                </button>
              </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-40 border-t border-white/5 py-12 flex justify-between items-center opacity-30 text-[9px] font-black uppercase tracking-[0.5em]">
            <p>FACULTEE STUDIO — 2026</p>
            <p>FACULTEE@OUTLOOK.COM</p>
        </footer>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#002344]/95 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white text-[#002344] w-full max-w-xl p-16 rounded-[4rem] relative z-10 animate-in zoom-in duration-300 text-center">
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 italic">C'est parti.</h3>
            <form className="space-y-4">
              <input type="text" placeholder="NOM COMPLET" className="w-full border-b-2 border-[#002344]/10 p-5 font-black uppercase text-xs outline-none focus:border-[#002344]" />
              <input type="email" placeholder="VOTRE ADRESSE MAIL" className="w-full border-b-2 border-[#002344]/10 p-5 font-black uppercase text-xs outline-none focus:border-[#002344]" />
              <button className="w-full bg-[#002344] text-white py-8 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.5em] mt-8 transition-all active:scale-95">Envoyer la demande</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-outline-white { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4); }
      `}</style>
    </div>
  );
}