export default function HomePage() {
  return (
    <>
      {/* Section Accueil (temporaire) */}
      <section
        id="accueil"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand to-accent"
      >
        <div className="container-custom text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Arbres du Lauragais
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-accent-light animate-fade-in">
            Élagage professionnel
          </p>
          <p className="text-lg md:text-xl text-white/90 animate-fade-in">
            Site en construction - Phase 2 terminée ✅
          </p>
        </div>
      </section>

      {/* Sections temporaires pour tester la navigation */}
      <section id="prestations" className="min-h-screen flex items-center justify-center bg-background">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-brand mb-4">Prestations</h2>
          <p className="text-text-secondary">Section à venir...</p>
        </div>
      </section>

      <section id="realisations" className="min-h-screen flex items-center justify-center bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-brand mb-4">Réalisations</h2>
          <p className="text-text-secondary">Section à venir...</p>
        </div>
      </section>

      <section id="avis" className="min-h-screen flex items-center justify-center bg-background">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-brand mb-4">Avis clients</h2>
          <p className="text-text-secondary">Section à venir...</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center bg-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-brand mb-4">Contact</h2>
          <p className="text-text-secondary">Section à venir...</p>
        </div>
      </section>
    </>
  );
}
