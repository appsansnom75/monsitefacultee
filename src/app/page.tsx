'use client';
import React, { useState } from 'react';

// --- TYPES ---
interface Produit { id: string; nom: string; prixBase: number; image: string; }

// --- DATA ---
const PRODUITS: Produit[] = [
  { id: 'TSHIRT', nom: 'T-SHIRT UNISEX', prixBase: 3.60, image: '/trouge.png' },
  { id: 'HOODIE', nom: 'SWEAT À CAPUCHE', prixBase: 10.75, image: '/hvert.png' },
  { id: 'SWEAT', nom: 'SWEAT COL ROND', prixBase: 7.92, image: '/sjaune.png' },
  { id: 'TOTEBAG', nom: 'TOTE BAG', prixBase: 1.44, image: '/tblanc.png' },
];

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  const [showPopup, setShowPopup] = useState(false);

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];
  const estimationRapide = (produit.prixBase * quantite * 1.2).toFixed(2);

  return (
    <div className="min-h-screen bg-[#002344] text-white selection:bg-white selection:text-[#002344] font-sans overflow-x-hidden">
      
      {/* EFFETS DE LUMIÈRE EN ARRIÈRE-PLAN */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-8 py-12">
        
        {/* HEADER MINIMALISTE */}
        <header className="flex justify-between items-center mb-32">
          <img src="/logoweb.jpg" alt="Logo" className="h-12 w-auto object-contain" />
          <div className="hidden md:block h-[1px] w-24 bg-white/20"></div>
          <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">Production Studio 26</span>
        </header>

        {/* HERO TITLE */}
        <div className="mb-24">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic">
            Make it <br /> <span className="text-outline-white text-transparent">Iconic.</span>
          </h1>
        </div>

        {/* BENTO GRID STARTUP STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* CARTE 1 : LE CONFIGURATEUR (L'EXPÉRIENCE) */}
          <div className={`md:col-span-8 group relative rounded-[3rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/10 ${isOpen ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'}`}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full p-12 text-left flex flex-col justify-between min-h-[350px]"
            >
              <div className="flex justify-between items-start w-full">
                <div className="space-y-2">
                  <p className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">Step 01</p>
                  <h2 className="text-5xl font-black uppercase italic tracking-tight">The Lab</h2>
                </div>
                <div className={`w-14 h-14 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-white text-[#002344]' : 'group-hover:scale-110 group-hover:border-white'}`}>
                  <span className="text-3xl font-light">+</span>
                </div>
              </div>

              {!isOpen && (
                <div className="flex items-center gap-6 animate-in fade-in slide-in-from-left-4">
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase">Lancer la configuration</p>
                  <div className="h-[1px] flex-1 bg-white/20"></div>
                </div>
              )}
            </button>

            {/* CONTENU DÉPLOYABLE */}
            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-12 pb-12 space-y-12 border-t border-white/5 pt-12">
                
                {/* CHOIX DU TEXTILE */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {PRODUITS.map(p => (
                    <button key={p.id} onClick={() => setProduitId(p.id)} className={`group/item relative p-6 rounded-3xl border transition-all ${produitId === p.id ? 'bg-white border-white' : 'bg-[#002344] border-white/10 hover:border-white/30'}`}>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${produitId === p.id ? 'text-[#002344]' : 'text-white'}`}>{p.nom}</span>
                      {produitId === p.id && <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>}
                    </button>
                  ))}
                </div>

                {/* QUANTITÉ SLIDER */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Quantité désirée</span>
                    <span className="text-3xl font-black italic">{quantite} <small className="text-xs not-italic text-white/40">PCS</small></span>
                  </div>
                  <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full accent-white bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer" />
                </div>

                {/* BOUTON DEVIS DANS LE LAB */}
                <button onClick={() => setShowPopup(true)} className="w-full bg-white text-[#002344] py-8 rounded-[2rem] font-black uppercase text-xs tracking-[0.5em] hover:scale-[0.98] transition-transform shadow-xl shadow-white/5">
                  Recevoir mon chiffrage personnalisé
                </button>
              </div>
            </div>
          </div>

          {/* CARTE 2 : LE GUIDE (BLUEPRINT) */}
          <a href="/guide.pdf" download className="md:col-span-4 group relative overflow-hidden rounded-[3rem] bg-gradient-to-b from-[#00386e] to-[#002344] p-12 flex flex-col justify-between min-h-[350px] border border-white/10 hover:border-white/40 transition-all duration-500 shadow-2xl">
             <div className="absolute top-[-20%] right-[-20%] opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
             </div>
             <div className="relative z-10">
                <p className="text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">Step 02</p>
                <h2 className="text-4xl font-black uppercase italic mt-4 leading-tight">The <br /> Blueprint</h2>
             </div>
             <div className="relative z-10 space-y-4">
                <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Guide PDF : Réussir sa commande parfaite en 5 minutes.</p>
                <div className="flex items-center gap-3 font-black text-[11px] tracking-[0.3em] uppercase group-hover:translate-x-3 transition-transform">
                  Download <span className="text-lg">↓</span>
                </div>
             </div>
          </a>

        </div>

        {/* SECTION PRODUIT VISUEL */}
        <div className="mt-32 flex flex-col items-center">
             <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-1000"></div>
                <img src={produit.image} alt={produit.nom} className="h-[400px] w-auto object-contain relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700" />
             </div>
             <div className="mt-12 text-center">
                <p className="text-[10px] font-black tracking-[1em] text-white/30 uppercase mb-4">Estimation HT</p>
                <p className="text-5xl font-black italic">{estimationRapide}€</p>
             </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-48 border-t border-white/5 py-16 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity">
            <p className="text-[9px] font-black uppercase tracking-[0.5em]">Facultée Studio — All Rights Reserved</p>
            <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.3em] mt-8 md:mt-0">
                <a href="#" className="hover:underline">Contact</a>
                <a href="#" className="hover:underline">Legal</a>
                <a href="#" className="hover:underline">Instagram</a>
            </div>
        </footer>
      </div>

      {/* POPUP MODERNE GLASSMORPHISM */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#002344]/95 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white text-[#002344] w-full max-w-xl p-16 rounded-[4rem] relative z-10 animate-in zoom-in duration-500">
            <h3 className="text-6xl font-black uppercase tracking-tighter mb-8 italic">Next Step.</h3>
            <form className="space-y-6">
              <input type="text" placeholder="Prénom / Nom" className="w-full border-b-2 border-[#002344]/10 p-4 font-black uppercase text-xs outline-none focus:border-[#002344] transition-all" />
              <input type="email" placeholder="Email" className="w-full border-b-2 border-[#002344]/10 p-4 font-black uppercase text-xs outline-none focus:border-[#002344] transition-all" />
              <button className="w-full bg-[#002344] text-white py-8 rounded-3xl font-black uppercase text-[10px] tracking-[0.4em] mt-8 hover:scale-[0.98] transition-transform">
                Lancer la demande officielle
              </button>
            </form>
            <button onClick={() => setShowPopup(false)} className="absolute top-12 right-12 text-[#002344]/30 hover:text-[#002344]">✕</button>
          </div>
        </div>
      )}

      {/* STYLE CSS POUR L'EFFET TEXT-OUTLINE */}
      <style jsx>{`
        .text-outline-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}