"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import SphereHero from "@/components/sphere-hero";
import { MatrixText } from "@/components/ui/matrix-text";
import { Button } from "@/components/ui/neon-button";

// ─── Fade-in hook ───────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ width, height }: { width: number; height: number }) {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center bg-blue-900/40 border border-blue-700/50 rounded-lg text-blue-300 font-bold text-sm tracking-widest"
      >
        LOGO
      </div>
    );
  }

  return (
    <div style={{ width, height, position: "relative" }}>
      <Image
        src="/logo.png"
        alt="Informatica ST logo"
        fill
        style={{ objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(96,165,250,0.5))" }}
        priority
        onError={() => setError(true)}
      />
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030d1a]/90 backdrop-blur border-b border-blue-900/30">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo width={120} height={48} />
          <span className="text-white font-semibold text-lg tracking-wide hidden sm:block">
            Informatica ST
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-blue-200">
          {[
            { label: "Servizi", href: "#servizi" },
            { label: "Riparazioni", href: "#riparazioni" },
            { label: "Chi siamo", href: "#chi-siamo" },
            { label: "Contatti", href: "#contatti" },
          ].map(({ label, href }) => (
            <a key={href} href={href} className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>
        <a href="tel:0346060642">
          <Button variant="solid" size="sm">Chiamaci ora</Button>
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col text-center px-4">
      {/* Sfera: copre tutto lo spazio hero, inclusa la zona badge */}
      <SphereHero />

      {/* Contenuto sovrapposto, distribuito verticalmente */}
      <div className="relative z-20 flex flex-col items-center justify-between h-full pt-24 pb-8">
        {/* Centro: logo + titolo + sottotitolo + CTA */}
        <div className="flex flex-col items-center gap-6 my-auto">
          <div style={{ width: 220, height: 220, position: "relative" }}>
            <Image
              src="/logo-globe.png"
              alt="Informatica ST globo"
              fill
              style={{ objectFit: "contain", filter: "drop-shadow(0 0 30px rgba(30,95,168,0.8))" }}
              priority
            />
          </div>
          <MatrixText
            text="INFORMATICA ST"
            className="text-5xl md:text-7xl font-bold text-white"
            initialDelay={400}
            letterInterval={80}
          />
          <p className="text-[#8a9ab0] text-lg md:text-xl max-w-lg">
            Assistenza informatica professionale a Clusone dal 2000
          </p>
          <a href="#servizi">
            <Button size="lg" variant="default">Scopri i nostri servizi</Button>
          </a>
        </div>

        {/* Badge in fondo alla hero */}
        <div className="flex flex-wrap justify-center gap-3">
          {["Oltre 20 anni di esperienza", "Assistenza on-site", "Privati & Aziende"].map(
            (badge) => (
              <span
                key={badge}
                className="text-xs text-blue-300 border border-blue-700/50 bg-blue-950/50 px-3 py-1 rounded-full"
              >
                {badge}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Servizi ─────────────────────────────────────────────────────────────────
const services = [
  { icon: "🖥️", title: "Riparazione Computer", desc: "Diagnosi e riparazione PC desktop e portatili di qualsiasi marca e modello." },
  { icon: "📱", title: "Smartphone & Tablet", desc: "Riparazione display, sostituzione batterie e recupero dati su dispositivi mobili." },
  { icon: "🖨️", title: "Stampanti", desc: "Assistenza e riparazione stampanti, plotter e periferiche di stampa." },
  { icon: "🏢", title: "Assistenza Aziende", desc: "Supporto IT on-site per aziende e professionisti: reti, server e workstation." },
  { icon: "🛒", title: "Vendita Hardware", desc: "PC, notebook, smartphone, tablet, accessori e componenti originali." },
  { icon: "🌐", title: "Siti Internet", desc: "Realizzazione siti web professionali per aziende e attività locali della Val Seriana." },
];

function Servizi() {
  const ref = useFadeIn();
  return (
    <section
      id="servizi"
      ref={ref as React.RefObject<HTMLElement>}
      className="fade-in-section bg-[#050f1f] py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          I nostri servizi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-blue-950/40 border border-blue-800/30 rounded-xl p-6 hover:border-blue-500/50 hover:bg-blue-900/30 transition-all"
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-[#8a9ab0] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Come funziona ────────────────────────────────────────────────────────────
const steps = [
  { n: "1", title: "Analisi guasto", desc: "Porta il dispositivo: analizziamo il problema con strumenti professionali." },
  { n: "2", title: "Preventivo gratuito", desc: "Ricevi un preventivo chiaro e trasparente, senza impegno." },
  { n: "3", title: "Riparazione", desc: "Lavoriamo con cura e ti avvisiamo non appena il dispositivo è pronto." },
];

function ComeFunziona() {
  const ref = useFadeIn();
  return (
    <section
      id="riparazioni"
      ref={ref as React.RefObject<HTMLElement>}
      className="fade-in-section bg-[#030d1a] py-24 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Come funziona la riparazione
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          {steps.map((step, i) => (
            <div key={step.n} className="flex flex-col md:flex-row items-center flex-1 w-full">
              <div className="flex flex-col items-center text-center flex-1 px-4">
                <div className="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg shadow-blue-900/50">
                  {step.n}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-[#8a9ab0] text-sm leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <>
                  <div className="hidden md:flex items-center text-blue-600 text-2xl font-light mx-2">
                    →
                  </div>
                  <div className="md:hidden text-blue-600 text-2xl my-4">↓</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Chi siamo ────────────────────────────────────────────────────────────────
const stats = [
  { value: "20+", label: "anni di attività" },
  { value: "500+", label: "clienti soddisfatti" },
  { value: "Clusone & Valle", label: "zona di copertura" },
  { value: "On-site", label: "assistenza a domicilio" },
];

function ChiSiamo() {
  const ref = useFadeIn();
  return (
    <section
      id="chi-siamo"
      ref={ref as React.RefObject<HTMLElement>}
      className="fade-in-section bg-[#050f1f] py-24 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Chi siamo</h2>
        <p className="text-[#8a9ab0] text-base md:text-lg leading-relaxed mb-12">
          Informatica ST SNC è un punto di riferimento per l&apos;assistenza informatica in Val Seriana.
          Dal 2000 offriamo supporto tecnico qualificato a privati e aziende della zona di Clusone,
          Rovetta, Cerete e dintorni. Siamo rivenditori autorizzati e offriamo contratti internet con
          Eolo e altri operatori fibra.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-blue-950/40 border border-blue-800/30 rounded-xl p-5">
              <div className="text-2xl font-bold text-blue-400 mb-1">{value}</div>
              <div className="text-[#8a9ab0] text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contatti ─────────────────────────────────────────────────────────────────
const contactInfo = [
  { icon: "📞", label: "Telefono", value: "0346-060642", href: "tel:0346060642" },
  { icon: "✉️", label: "Email", value: "info@informaticast.it", href: "mailto:info@informaticast.it" },
  { icon: "📍", label: "Indirizzo", value: "Clusone (BG)", href: undefined },
  { icon: "🕐", label: "Orari", value: "Lun-Sab 9:00-12:30 / 14:30-18:30", href: undefined },
];

function Contatti() {
  const ref = useFadeIn();
  return (
    <section
      id="contatti"
      ref={ref as React.RefObject<HTMLElement>}
      className="fade-in-section bg-[#030d1a] py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Contatti</h2>
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {/* Info */}
          <div className="flex flex-col gap-5">
            {contactInfo.map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
                    {label}
                  </div>
                  {href ? (
                    <a href={href} className="text-white hover:text-blue-300 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <span className="text-white">{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Il tuo nome"
              className="bg-blue-950/40 border border-blue-800/40 rounded-lg px-4 py-3 text-white placeholder:text-[#8a9ab0] focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="email"
              placeholder="La tua email"
              className="bg-blue-950/40 border border-blue-800/40 rounded-lg px-4 py-3 text-white placeholder:text-[#8a9ab0] focus:outline-none focus:border-blue-500 transition-colors"
            />
            <textarea
              rows={5}
              placeholder="Il tuo messaggio..."
              className="bg-blue-950/40 border border-blue-800/40 rounded-lg px-4 py-3 text-white placeholder:text-[#8a9ab0] focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
            <Button type="submit" variant="solid" size="lg" className="w-full">
              Invia messaggio
            </Button>
          </form>
        </div>

        {/* Google Maps */}
        <div className="w-full rounded-xl overflow-hidden border border-blue-800/30 h-72">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1651.2988298749801!2d9.938670515623722!3d45.88846234496868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4783e6fe2ca5cf29%3A0x491561fc3d04e4af!2sInformatica+St+Snc+Di+Sidoni+%26+Trussardi!5e0!3m2!1sit!2sit!4v1451841795070"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Informatica ST SNC - Google Maps"
          />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#020a14] border-t border-blue-900/20 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8a9ab0] text-sm">
        <span>© 2025 Informatica ST SNC | P.IVA [da inserire]</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
import React from "react";

export default function Home() {
  return (
    <main className="bg-[#030d1a] min-h-screen">
      <Navbar />
      <Hero />
      <Servizi />
      <ComeFunziona />
      <ChiSiamo />
      <Contatti />
      <Footer />
    </main>
  );
}
