'use client';
import React, { useState } from 'react';

// --- DONNÉES DE PRIX (Liens vers tes fichiers du dossier public) ---
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
  const [infoTooltip, setInfoTooltip] = useState<string | null>(null);
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
      setTimeout(() => {
        setShowPopup(false);
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-12 font-sans selection:bg-white selection:text-slate-900">
      
      {/* Animation de flottement injectée en CSS */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-product-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto mb-20">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase border-l-8 border-white pl-6">FACULTEE</h1>
          <p className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">STUDIO DE PERSONNALISATION TEXTILE</p>
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

            {/* (Le reste de tes étapes 02 et 03 reste identique...) */}
            {/* ... code pour les marquages et la quantité ... */}
          </div>

          {/* RÉCAPITULATIF STICKY AVEC IMAGE DYNAMIQUE */}
          <div className="sticky top-12">
            
            {/* VISUEL DU PRODUIT QUI FLOTTE */}
            <div className="flex justify-center mb-[-50px] relative z-10 pointer-events-none">
              <img 
                key={produit.id}
                src={produit.image} 
                alt={produit.nom}
                className="h-64 w-auto object-contain animate-product-float animate-in fade-in zoom-in duration-700"
                style={{ filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.3))" }}
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

              <button onClick={() => setShowPopup(true)} className="w-full mt-12 bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.4em] hover:bg-slate-800 transition-all shadow-2xl">
                RECEVOIR MON DEVIS
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ... (Footer et Popup identiques) ... */}
    </div>
  );
}