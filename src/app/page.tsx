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

const FAQS = [
  { q: "Quels types de produits proposez-vous ?", a: "Nous proposons des T-shirts, sweats, polos, casquettes, tote bags et divers goodies personnalisables sur mesure." },
  { q: "Quelles techniques de personnalisation utilisez-vous ?", a: "Nous utilisons la sérigraphie, la broderie, le flocage et l’impression numérique, et bien d'autres techniques selon les produits, vos besoins et votre budget." },
  { q: "Quelle est la quantité minimum pour une commande ?", a: "Aucune quantité minimum obligatoire pour certaines références, et nous proposons des tarifs adaptés pour les commandes en petite ou grande série." },
  { q: "Quels sont les délais de production et de livraison ?", a: "Le devis est généralement fourni sous 24h maximum, la production dure environ 5 à 7 jours ouvrés selon la quantité, et la livraison s’effectue en France et à l’international." },
  { q: "Puis-je voir un aperçu de mon design avant de commander ?", a: "Oui ! Nous fournissons un aperçu numérique de votre design sur le produit choisi avant de lancer la production." },
  { q: "Proposez-vous des produits éco-responsables ?", a: "Oui, nous proposons une sélection de produits biologiques et recyclés, ainsi que des techniques d’impression respectueuses de l’environnement." },
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
  const [produitId, setProduitId] = useState(PRODUITS[0].id);
  const [quantite, setQuantite] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [seriChoices, setSeriChoices] = useState<SeriChoice[]>([]);
  const [numChoices, setNumChoices] = useState<SimpleChoice[]>([]);
  const [broderieChoices, setBroderieChoices] = useState<number[]>([]);

  const produit = PRODUITS.find(p => p.id === produitId) || PRODUITS[0];
  const getPalier = (arr: any[]) => [...arr].reverse().find(f => quantite >= f.qte) || arr[0];

  const totalSerigraphie = seriChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_SERIGRAPHIE).couleurs[curr.colors], 0);
  const totalNumerique = numChoices.length * getPalier(FORFAITS_NUMERIQUE).prix;
  const totalBroderie = broderieChoices.reduce((acc, curr) => acc + getPalier(FORFAITS_BRODERIE).emplacements[curr], 0);

  const totalHT = (produit.prixBase * quantite) + totalSerigraphie + totalNumerique + totalBroderie;
  const totalTTC = totalHT * 1.20;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("https://formspree.io/f/xwvobjgj", {
      method: "POST", body: formData, headers: { 'Accept': 'application/json' }
    });
    if (response.ok) { 
        setIsSubmitted(true); 
        setTimeout(() => { setShowPopup(false); setIsSubmitted(false); }, 3000); 
    }
  };

  return (
    <div className="min-h-screen bg-[#002344] text-white selection:bg-white selection:text-[#002344] font-sans pb-12">
      
      <div className="max-w-6xl mx-auto px-8 py-12">
        
        <header className="flex justify-between items-center mb-24">
          <img src="/logoweb.jpg" alt="FACULTEE Logo" className="h-14 w-auto object-contain" />
          <p className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase">Studio de Personnalisation Textile & Goodies</p>
        </header>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic mb-20">
          Créez <br /> <span className="text-outline-white text-transparent">L'Iconique.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          <div className="md:col-span-8 bg-white/5 rounded-[3.5rem] border border-white/10 p-12 space-y-12 shadow-2xl">
            
            <div className="space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-tight">LE STUDIO</h2>
              <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">01. Sélection du support</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {PRODUITS.map(p => (
                  <button key={p.id} onClick={() => setProduitId(p.id)} className={`flex flex-col items-center p-5 rounded-3xl border transition-all ${produitId === p.id ? 'bg-white text-[#002344] border-white shadow-lg' : 'bg-transparent border-white/10 text-white hover:border-white/30'}`}>
                    <img src={p.image} alt={p.nom} className="h-16 w-auto mb-4 object-contain" />
                    <span className="text-[8px] font-black uppercase text-center leading-tight">{p.nom}</span>
                  </button>
                ))}
                
                <button 
                  onClick={() => setShowPopup(true)} 
                  className="flex flex-col items-center justify-center p-5 rounded-3xl border border-dashed border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white transition-all group"
                >
                  <span className="text-[8px] font-black uppercase text-center leading-tight">Projet<br/>Sur-Mesure</span>
                  <span className="text-[6px] font-black opacity-30 mt-1 uppercase tracking-widest text-center">Goodies & autres</span>
                </button>
              </div>
            </div>

            {/* --- SECTION 02 : MARQUAGES MODERNISÉS --- */}
            <div className="space-y-8">
              <p className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">02. Personnalisation technique</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* CARTE SÉRIGRAPHIE */}
                <div 
                  onClick={() => setSeriChoices([...seriChoices, {place: 'CŒUR', colors: 0}])}
                  className="group cursor-pointer bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.08]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-widest block">Sérigraphie</span>
                      <span className="text-[8px] font-bold text-white/30 uppercase italic">Volumes +</span>
                    </div>
                    <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#002344] transition-colors text-xs font-black">+</div>
                  </div>
                  
                  {seriChoices.length > 0 && (
                    <div className="space-y-3 mt-6 pt-6 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                      {seriChoices.map((s, i) => (
                        <div key={i} className="flex gap-2 animate-in slide-in-from-top-2">
                          <select className="flex-1 bg-[#002344] py-2 px-3 rounded-xl text-[9px] font-black uppercase border border-white/10 text-white focus:ring-0 appearance-none" value={s.place} onChange={(e) => { const newC = [...seriChoices]; newC[i].place = e.target.value; setSeriChoices(newC); }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                          <select className="w-20 bg-[#002344] py-2 px-3 rounded-xl text-[9px] font-black uppercase border border-white/10 text-white focus:ring-0 appearance-none" value={s.colors} onChange={(e) => { const newC = [...seriChoices]; newC[i].colors = Number(e.target.value); setSeriChoices(newC); }}>{[1,2,3,4,5,6,7,8].map((n, idx) => <option key={idx} value={idx}>{n} C.</option>)}</select>
                          <button onClick={() => setSeriChoices(seriChoices.filter((_, idx) => idx !== i))} className="text-red-400/50 hover:text-red-400 px-1 font-black">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CARTE NUMÉRIQUE */}
                <div 
                  onClick={() => setNumChoices([...numChoices, {place: 'CŒUR'}])}
                  className="group cursor-pointer bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.08]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-widest block">Numérique</span>
                      <span className="text-[8px] font-bold text-white/30 uppercase italic">Couleurs +</span>
                    </div>
                    <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#002344] transition-colors text-xs font-black">+</div>
                  </div>
                  
                  {numChoices.length > 0 && (
                    <div className="space-y-3 mt-6 pt-6 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                      {numChoices.map((n, i) => (
                        <div key={i} className="flex gap-2 animate-in slide-in-from-top-2">
                          <select className="flex-1 bg-[#002344] py-2 px-3 rounded-xl text-[9px] font-black uppercase border border-white/10 text-white focus:ring-0 appearance-none" value={n.place} onChange={(e) => { const newC = [...numChoices]; newC[i].place = e.target.value; setNumChoices(newC); }}>{EMPLACEMENTS.map(e => <option key={e} value={e}>{e}</option>)}</select>
                          <button onClick={() => setNumChoices(numChoices.filter((_, idx) => idx !== i))} className="text-red-400/50 hover:text-red-400 px-1 font-black">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CARTE BRODERIE */}
                <div 
                  onClick={() => setBroderieChoices([...broderieChoices, 0])}
                  className="group cursor-pointer bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.08]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-widest block">Broderie</span>
                      <span className="text-[8px] font-bold text-white/30 uppercase italic">Premium</span>
                    </div>
                    <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#002344] transition-colors text-xs font-black">+</div>
                  </div>
                  
                  {broderieChoices.length > 0 && (
                    <div className="space-y-3 mt-6 pt-6 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                      {broderieChoices.map((b, i) => (
                        <div key={i} className="flex gap-2 animate-in slide-in-from-top-2">
                          <select className="flex-1 bg-[#002344] py-2 px-3 rounded-xl text-[9px] font-black uppercase border border-white/10 text-white focus:ring-0 appearance-none" value={b} onChange={(e) => { const newC = [...broderieChoices]; newC[i] = Number(e.target.value); setBroderieChoices(newC); }}>
                            <option value={0}>CŒUR</option>
                            <option value={1}>CENTRAL</option>
                            <option value={2}>DOS</option>
                          </select>
                          <button onClick={() => setBroderieChoices(broderieChoices.filter((_, idx) => idx !== i))} className="text-red-400/50 hover:text-red-400 px-1 font-black">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/5">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">03. Volume de commande</span>
                    <span className="text-5xl font-black">{quantite} <span className="text-[10px] text-white/30">UNITÉS</span></span>
                </div>
                <input type="range" min="10" max="200" step="10" value={quantite} onChange={(e) => setQuantite(Number(e.target.value))} className="w-full accent-white bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer" />
            </div>
          </div>

          <div className="md:col-span-4 space-y-8 sticky top-12">
              <div className="bg-white text-[#002344] p-12 rounded-[3.5rem] shadow-2xl">
                <p className="text-[10px] font-black text-[#002344]/40 uppercase tracking-widest text-center mb-8">Votre Estimation</p>
                <p className="text-6xl font-black text-center mb-10 tracking-tighter">{totalTTC.toFixed(2)}€</p>
                <button onClick={() => setShowPopup(true)} className="w-full bg-[#002344] text-white py-8 rounded-[2.5rem] font-black uppercase text-[10px] tracking-[0.5em] hover:scale-[1.02] transition-transform shadow-xl">
                  Valider le projet
                </button>
              </div>

              <a href="/guide.pdf" download className="group block bg-gradient-to-br from-[#00488d] to-[#002344] p-10 rounded-[3rem] border border-white/10 transition-all hover:scale-[0.98]">
                <h3 className="text-3xl font-black uppercase leading-tight text-white mb-6">Besoin d'aide <br /> pour votre projet ?</h3>
                <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase mb-8">Le guide exclusif pour réussir votre configuration.</p>
                <div className="flex items-center gap-3 font-black text-[10px] tracking-[0.4em] uppercase group-hover:translate-x-3 transition-transform">
                  Télécharger le guide <span>↓</span>
                </div>
              </a>
          </div>
        </div>

        {/* --- SECTION FAQ --- */}
        <div className="mt-40 space-y-12">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">Questions fréquentes</h2>
          <div className="grid grid-cols-1 gap-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border-b border-white/10 pb-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center py-4 text-left group"
                >
                  <span className={`text-xs md:text-sm font-black uppercase tracking-widest transition-colors ${openFaq === idx ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {faq.q}
                  </span>
                  <span className={`text-xl font-black transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed text-white/40 max-w-2xl">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-20 border-t border-white/10 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div>
              <img src="/logoweb.jpg" alt="Logo" className="h-10 w-auto mb-8 opacity-80" />
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-relaxed">
                Facultee spécialisé dans la personnalisation textiles & goodies et l'accompagnement créatif.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80">Contact</h4>
              <p className="text-xs font-black uppercase">Facultee@outlook.com</p>
              <p className="text-xs font-black uppercase">06 37 84 58 16</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/80">Réseaux</h4>
              <div className="flex gap-8 text-xs font-black uppercase">
                <a href="https://www.instagram.com/facultee.fr" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
            <span>© 2026 FACULTEE </span>
          </div>
        </footer>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#002344]/95 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white text-[#002344] w-full max-w-xl p-16 rounded-[4rem] relative z-10 animate-in zoom-in duration-300">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-5xl font-black uppercase tracking-tighter mb-8">L'Iconique.</h3>
                <input type="text" name="Nom" required placeholder="NOM COMPLET" className="w-full border-b-2 border-[#002344]/10 p-5 font-black uppercase text-xs outline-none focus:border-[#002344]" />
                <input type="email" name="Email" required placeholder="ADRESSE MAIL" className="w-full border-b-2 border-[#002344]/10 p-5 font-black uppercase text-xs outline-none focus:border-[#002344]" />
                <textarea name="Message" placeholder="DÉTAILS DU PROJET (VÊTEMENTS SPÉCIFIQUES, GOODIES, LOGOS...)" rows={4} className="w-full border-b-2 border-[#002344]/10 p-5 font-black uppercase text-xs outline-none focus:border-[#002344] resize-none" />
                <button type="submit" className="w-full bg-[#002344] text-white py-8 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.5em] mt-8 hover:scale-[1.02] transition-transform">Envoyer la demande</button>
              </form>
            ) : (
              <div className="py-20 text-center space-y-4">
                <h3 className="text-4xl font-black uppercase">Transmis.</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#002344]/40">Nous revenons vers vous très vite.</p>
              </div>
            )}
            <button onClick={() => setShowPopup(false)} className="absolute top-12 right-12 text-[#002344]/20 hover:text-[#002344] font-black text-xs uppercase tracking-widest">Fermer [✕]</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-outline-white { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4); }
      `}</style>
    </div>
  );
}