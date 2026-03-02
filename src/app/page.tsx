'use client';
import React, { useState } from 'react';

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
  const [activeSection, setActiveSection] = useState('support'); // 'support', 'marquage', 'quantite'
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [seriChoices, setSeriChoices] = useState([]);
  const [numChoices, setNumChoices] = useState([]);
  const [broderieChoices, setBroderieChoices] = useState([]);

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];
  const getPalier = (arr) => [...arr].reverse().find(f => quantite >= f.qte) || arr[0];

  const totalSerigraphie = seriChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_SERIGRAPHIE).couleurs[curr.colors], 0);
  const totalNumerique = numChoices.length * getPalier(FORFAITS_NUMERIQUE).prix;
  const totalBroderie = broderieChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_BRODERIE).emplacements[curr], 0);

  const totalHT = (produit.prixBase * quantite) + totalSerigraphie + totalNumerique + totalBroderie;
  const tva = totalHT * 0.20;
  const totalTTC = totalHT + tva;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("https://formspree.io/f/xwvobjgj", {
      method: "POST", body: formData, headers: { 'Accept': 'application/json' }
    });
    if (response.ok) { setIsSubmitted(true); setTimeout(() => { setShowPopup(false); setIsSubmitted(false); }, 3000); }
  };

  return (
    <div className="min-h-screen bg-[#002344] text-white p-6 md:p-12 font-sans selection:bg-white selection:text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <img src="/logoweb.jpg" alt="FACULTEE Logo" className="h-14 w-auto object-contain" />
          <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">STUDIO DE PERSONNALISATION TEXTILE</p>
        </header>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
          
          {/* COLONNE GAUCHE : ACCORDÉON CONFIGURATEUR */}
          <div className="space-y-4">
            
            {/* 01. SUPPORT */}
            <div className={`border-2 rounded-3xl transition-all duration-500 ${activeSection === 'support' ? 'border-white bg-white/5' : 'border-slate-800'}`}>
              <button 
                onClick={() => setActiveSection(activeSection === 'support' ? '' : 'support')}
                className="w-full p-8 flex justify-between items-center text-left"
              >
                <div>
                  <span className="text-[10px] font-black text-slate-500 block mb-1">01. SUPPORT</span>
                  <span className="font-black text-xs tracking-widest uppercase">{produit.nom}</span>
                </div>
                <span className={`transition-transform duration-300 ${activeSection === 'support' ? 'rotate-180' : ''}`}>↓</span>
              </button>
              
              {activeSection === 'support' && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-2 gap-3">
                    {PRODUITS.map(p => (
                      <button key={p.id} onClick={() => setProduitId(p.id)} 
                        className={`p-4 rounded-xl border-2 transition-all font-black text-[9px] tracking-widest ${produitId === p.id ? 'border-white bg-white text-slate-900' : 'border-slate-800 text-slate-400 hover:border-slate-700'}`}>
                        {p.nom}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 02. MARQUAGES */}
            <div className={`border-2 rounded-3xl transition-all duration-500 ${activeSection === 'marquage' ? 'border-white bg-white/5' : 'border-slate-800'}`}>
              <button 
                onClick={() => setActiveSection(activeSection === 'marquage' ? '' : 'marquage')}
                className="w-full p-8 flex justify-between items-center text-left"
              >
                <div>
                  <span className="text-[10px] font-black text-slate-500 block mb-1">02. PERSONNALISATION</span>
                  <span className="font-black text-xs tracking-widest uppercase">
                    {seriChoices.length + numChoices.length + broderieChoices.length} MARQUAGE(S) SÉLECTIONNÉ(S)
                  </span>
                </div>
                <span className={`transition-transform duration-300 ${activeSection === 'marquage' ? 'rotate-180' : ''}`}>↓</span>
              </button>
              
              {activeSection === 'marquage' && (
                <div className="px-8 pb-8 space-y-6 animate-in fade-in slide-in-from-top-2">
                  {/* SERIGRAPHIE */}
                  <div className="p-4 rounded-2xl bg-slate-900/50">
                    <div className="flex justify-between items-center mb-4 text-[10px] font-black uppercase tracking-widest">SÉRIGRAPHIE <button onClick={() => setSeriChoices([...seriChoices, {place: 'COEUR', colors: 0}])} className="text-white border border-white/20 px-2 py-1 rounded">+</button></div>
                    {seriChoices.map((s, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <select className="flex-1 bg-slate-950 p-2 rounded text-[9px] font-black border-none uppercase" value={s.place} onChange={(e) => { const newC = [...seriChoices]; newC[i].place = e.target.value; setSeriChoices(newC); }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                        <select className="w-20 bg-slate-950 p-2 rounded text-[9px] font-black border-none uppercase" value={s.colors} onChange={(e) => { const newC = [...seriChoices]; newC[i].colors = Number(e.target.value); setSeriChoices(newC); }}>{[1,2,3,4,5,6,7,8].map((n, idx) => <option key={idx} value={idx}>{n} C.</option>)}</select>
                        <button onClick={() => setSeriChoices(seriChoices.filter((_, idx) => idx !== i))} className="text-red-500 px-1">✕</button>
                      </div>
                    ))}
                  </div>
                  {/* NUMERIQUE & BRODERIE (Simplifiés pour le gain de place) */}
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setNumChoices([...numChoices, 'COEUR'])} className="p-4 rounded-2xl bg-slate-900/50 text-[9px] font-black uppercase tracking-widest border border-transparent hover:border-white/20">+ Numérique</button>
                    <button onClick={() => setBroderieChoices([...broderieChoices, 0])} className="p-4 rounded-2xl bg-slate-900/50 text-[9px] font-black uppercase tracking-widest border border-transparent hover:border-white/20">+ Broderie</button>
                  </div>
                </div>
              )}
            </div>

            {/* 03. QUANTITÉ */}
            <div className={`border-2 rounded-3xl transition-all duration-500 ${activeSection === 'quantite' ? 'border-white bg-white/5' : 'border-slate-800'}`}>
              <button 
                onClick={() => setActiveSection(activeSection === 'quantite' ? '' : 'quantite')}
                className="w-full p-8 flex justify-between items-center text-left"
              >
                <div>
                  <span className="text-[10px] font-black text-slate-500 block mb-1">03. VOLUME</span>
                  <span className="font-black text-xs tracking-widest uppercase">{quantite} UNITÉS</span>
                </div>
                <span className={`transition-transform duration-300 ${activeSection === 'quantite' ? 'rotate-180' : ''}`}>↓</span>
              </button>
              
              {activeSection === 'quantite' && (
                <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2">
                  <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full h-2 bg-slate-800 appearance-none accent-white cursor-pointer rounded-full" />
                  <div className="flex justify-between mt-4 text-[9px] font-black text-slate-500 uppercase"><span>10 pcs</span><span>200+ pcs</span></div>
                </div>
              )}
            </div>
          </div>

          {/* RÉCAPITULATIF DROITE */}
          <div className="sticky top-12">
            <div className="flex justify-center mb-[-40px] relative z-10 pointer-events-none">
              <img key={produit.id} src={produit.image} alt={produit.nom} className="h-64 w-auto object-contain drop-shadow-2xl" />
            </div>

            <div className="bg-white text-slate-900 p-10 rounded-[2.5rem] shadow-2xl">
              <h2 className="font-black uppercase text-[10px] tracking-[0.5em] text-slate-300 mb-8 text-center">ESTIMATION</h2>
              <div className="text-center space-y-4 mb-8">
                <div className="text-7xl font-black tracking-tighter">{totalTTC.toFixed(2)}€</div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest underline decoration-slate-200 underline-offset-4">Total TTC avec livraison</p>
              </div>

              <a href="/guide.pdf" download className="block w-full border-2 border-slate-100 text-slate-400 py-3 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] text-center hover:bg-slate-50 mb-4 transition-all">
                📥 Guide : La commande parfaite
              </a>

              <button onClick={() => setShowPopup(true)} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:scale-[1.02] active:scale-95 transition-all">
                DEMANDER UN DEVIS
              </button>
            </div>
          </div>
        </div>

        {/* SECTION PROCESSUS */}
        <div className="grid md:grid-cols-3 gap-8 mb-32 border-t border-slate-800 pt-20">
            {['Config', 'Design', 'Prod'].map((step, i) => (
                <div key={i} className="text-center md:text-left">
                    <span className="text-slate-700 font-black text-4xl mb-4 block">0{i+1}</span>
                    <h4 className="font-black text-xs tracking-widest uppercase mb-2">{step}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black leading-relaxed">Notre équipe valide chaque étape avec vous.</p>
                </div>
            ))}
        </div>
      </div>

      {/* FOOTER & POPUP (Identiques) */}
      <footer className="max-w-6xl mx-auto border-t border-slate-800 py-10 text-[9px] font-black uppercase tracking-widest text-slate-600 flex justify-between">
        <span>FACULTEE STUDIO © 2026</span>
        <span>FACULTEE@OUTLOOK.COM</span>
      </footer>

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white text-slate-900 w-full max-w-lg p-12 rounded-[3rem] relative z-10">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-8">VOTRE PROJET</h3>
                <input type="text" name="Nom" required placeholder="NOM / PRÉNOM" className="w-full border-2 border-slate-100 p-5 rounded-xl font-black uppercase text-xs outline-none focus:border-slate-900" />
                <input type="text" name="Contact" required placeholder="EMAIL" className="w-full border-2 border-slate-100 p-5 rounded-xl font-black uppercase text-xs outline-none focus:border-slate-900" />
                <textarea name="Message" placeholder="VOS IDÉES..." rows={3} className="w-full border-2 border-slate-100 p-5 rounded-xl font-black uppercase text-xs outline-none focus:border-slate-900" />
                <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em]">VALIDER LA DEMANDE</button>
              </form>
            ) : (
              <div className="py-20 text-center"><h3 className="text-2xl font-black">ENVOYÉ !</h3></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}