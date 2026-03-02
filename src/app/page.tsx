'use client';
import React, { useState } from 'react';

// --- TYPES ---
interface Produit { id: string; nom: string; prixBase: number; image: string; }
interface SeriChoice { place: string; colors: number; }

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

  const [seriChoices, setSeriChoices] = useState<SeriChoice[]>([]);
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

  return (
    <div className="min-h-screen bg-[#002344] text-white selection:bg-white selection:text-[#002344] font-sans overflow-x-hidden">
      
      <div className="relative max-w-6xl mx-auto px-8 py-12">
        
        <header className="flex justify-between items-center mb-32">
          <img src="/logoweb.jpg" alt="Logo" className="h-12 w-auto object-contain" />
          <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase italic">Atelier de Production 2026</span>
        </header>

        <div className="mb-24">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic">
            Créez <br /> <span className="text-outline-white text-transparent">L'Iconique.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* CARTE 1 : LE CONFIGURATEUR */}
          <div className={`md:col-span-8 group relative rounded-[3rem] transition-all duration-700 border border-white/10 ${isOpen ? 'bg-white/10 shadow-2xl shadow-blue-500/10' : 'bg-white/5 hover:bg-white/10'}`}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-12 text-left flex flex-col justify-between min-h-[350px]"
            >
              <div className="flex justify-between items-start w-full">
                <div className="space-y-2">
                  <p className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">Étape 01</p>
                  <h2 className="text-5xl font-black uppercase italic tracking-tight">Le Laboratoire</h2>
                </div>
                <div className={`w-14 h-14 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-white text-[#002344]' : 'group-hover:scale-110'}`}>
                  <span className="text-3xl font-light">+</span>
                </div>
              </div>

              {!isOpen && (
                <div className="flex items-center gap-6">
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase underline underline-offset-8 decoration-white/20">Ouvrir le configurateur</p>
                </div>
              )}
            </button>

            {/* OPTIONS COMPLÈTES RÉINTRÉGRÉES */}
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-12 pb-12 space-y-10 border-t border-white/5 pt-12">
                
                {/* 01. SUPPORTS */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">01. Choix du textile</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {PRODUITS.map(p => (
                      <button key={p.id} onClick={() => setProduitId(p.id)} className={`p-4 rounded-2xl border text-[9px] font-black transition-all ${produitId === p.id ? 'bg-white text-[#002344] border-white' : 'bg-transparent border-white/10 text-white hover:border-white/30'}`}>
                        {p.nom}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 02. MARQUAGES DÉTAILLÉS */}
                <div className="space-y-6">
                  <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">02. Personnalisation technique</p>
                  
                  {/* SÉRIGRAPHIE */}
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest">Sérigraphie</span>
                      <button onClick={() => setSeriChoices([...seriChoices, {place: 'CŒUR', colors: 0}])} className="bg-white text-[#002344] text-[9px] px-4 py-2 rounded-full font-black">AJOUTER</button>
                    </div>
                    {seriChoices.map((s, i) => (
                      <div key={i} className="flex gap-3 mb-3">
                        <select className="flex-1 bg-[#002344] p-3 rounded-xl text-[10px] font-black border-none uppercase" value={s.place} onChange={(e) => { const newC = [...seriChoices]; newC[i].place = e.target.value; setSeriChoices(newC); }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                        <select className="w-28 bg-[#002344] p-3 rounded-xl text-[10px] font-black border-none uppercase" value={s.colors} onChange={(e) => { const newC = [...seriChoices]; newC[i].colors = Number(e.target.value); setSeriChoices(newC); }}>{[1,2,3,4,5,6,7,8].map((n, idx) => <option key={idx} value={idx}>{n} COUL.</option>)}</select>
                        <button onClick={() => setSeriChoices(seriChoices.filter((_, idx) => idx !== i))} className="text-red-400 px-2 font-black">✕</button>
                      </div>
                    ))}
                  </div>

                  {/* NUMÉRIQUE & BRODERIE */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <button onClick={() => setNumChoices([...numChoices, 'CŒUR'])} className="bg-white/5 p-5 rounded-2xl text-[9px] font-black border border-white/5 hover:border-white/20 uppercase tracking-widest">Ajouter Numérique ({numChoices.length})</button>
                    <button onClick={() => setBroderieChoices([...broderieChoices, 0])} className="bg-white/5 p-5 rounded-2xl text-[9px] font-black border border-white/5 hover:border-white/20 uppercase tracking-widest">Ajouter Broderie ({broderieChoices.length})</button>
                  </div>
                </div>

                {/* 03. QUANTITÉ SLIDER */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">03. Volume de commande</span>
                    <span className="text-4xl font-black italic">{quantite}</span>
                  </div>
                  <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full accent-white bg-white/10 h-1 rounded-full appearance-none cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* CARTE 2 : LE GUIDE */}
          <a href="/guide.pdf" download className="md:col-span-4 group relative overflow-hidden rounded-[3rem] bg-gradient-to-b from-[#00386e] to-[#002344] p-12 flex flex-col justify-between min-h-[350px] border border-white/10 shadow-2xl">
             <div className="relative z-10">
                <p className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">Étape 02</p>
                <h2 className="text-4xl font-black uppercase italic mt-4 leading-tight">Le Guide <br /> Ultime</h2>
             </div>
             <div className="relative z-10 space-y-6">
                <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase leading-relaxed">Réussir sa commande parfaite : <br /> Les secrets de l'impression textile.</p>
                <div className="flex items-center gap-3 font-black text-[11px] tracking-[0.3em] uppercase group-hover:translate-x-3 transition-transform">
                  Télécharger le PDF <span>↓</span>
                </div>
             </div>
          </a>
        </div>

        {/* AFFICHAGE DU PRIX & PRODUIT */}
        <div className="mt-32 flex flex-col items-center">
             <img src={produit.image} alt={produit.nom} className="h-[400px] w-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]" />
             <div className="mt-12 text-center">
                <p className="text-[10px] font-black tracking-[1em] text-white/30 uppercase mb-4">Estimation Totale TTC</p>
                <p className="text-7xl font-black italic">{totalTTC.toFixed(2)}€</p>
                <button onClick={() => setShowPopup(true)} className="mt-10 bg-white text-[#002344] px-12 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.5em] hover:scale-105 transition-transform">
                  Valider le projet
                </button>
             </div>
        </div>

        <footer className="mt-48 border-t border-white/5 py-16 flex flex-col md:flex-row justify-between items-center opacity-30">
            <p className="text-[9px] font-black uppercase tracking-[0.5em]">FACULTÉE STUDIO — 2026</p>
            <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.3em] mt-8 md:mt-0">
                <p>Facultée@outlook.com</p>
                <p>Europe / Livraison incluse</p>
            </div>
        </footer>
      </div>

      {/* POPUP DEVIS */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#002344]/95 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white text-[#002344] w-full max-w-xl p-16 rounded-[4rem] relative z-10 animate-in zoom-in duration-300">
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 italic italic">C'est parti.</h3>
            <form className="space-y-6">
              <input type="text" placeholder="NOM ET PRÉNOM" className="w-full border-b-2 border-[#002344]/10 p-4 font-black uppercase text-xs outline-none focus:border-[#002344]" />
              <input type="email" placeholder="VOTRE ADRESSE MAIL" className="w-full border-b-2 border-[#002344]/10 p-4 font-black uppercase text-xs outline-none focus:border-[#002344]" />
              <button className="w-full bg-[#002344] text-white py-8 rounded-3xl font-black uppercase text-[10px] tracking-[0.4em] mt-8">
                Envoyer ma demande
              </button>
            </form>
            <button onClick={() => setShowPopup(false)} className="absolute top-12 right-12 text-[#002344]/20 hover:text-[#002344]">FERMER [✕]</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-outline-white { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4); }
      `}</style>
    </div>
  );
}