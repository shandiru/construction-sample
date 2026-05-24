import { useEffect, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import Navbar from "./Navbar";
import { useSite } from "../SiteContext";
import { getMediaUrl } from "../api";

const CounterValue = ({ value, suffix = "", duration = 1600, decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId;
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(updateValue);
      }
    };

    frameId = window.requestAnimationFrame(updateValue);
    return () => window.cancelAnimationFrame(frameId);
  }, [duration, value]);

  return (
    <span>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const HeroSection = () => {
  const siteConfig = useSite(); const { branding, hero } = siteConfig;
  const heroImage = getMediaUrl(hero.media.image);
  const heroVideo = getMediaUrl(hero.media.src);
  const heroPoster = getMediaUrl(hero.media.poster);

  return (
    <section
      id="/#"
      className="relative min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: "var(--theme-primary-strong)" }}
    >
      {hero.media.type === "video" && heroVideo ? (
        <video
          aria-label={hero.media.alt}
          className="absolute inset-0 h-full w-full object-cover"
          poster={heroPoster}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : heroImage ? (
        <img
          src={heroImage}
          alt={hero.media.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      <div className="absolute inset-0" style={{ background: "var(--theme-hero-overlay)" }} />
      <div className="absolute inset-0" style={{ background: "var(--theme-hero-glow)" }} />

      <Navbar overlay />

      <div className="app-section relative z-10 flex min-h-screen w-full items-end pb-10 pt-36 sm:pb-12 sm:pt-40 lg:pb-14 lg:pt-44">
        <div className="app-container">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(560px,0.95fr)] lg:items-end">
            <div className="max-w-190 text-left">
              <div
                className="hero-reveal inline-flex max-w-full items-center gap-2 rounded-full bg-gray-900/88 px-4 py-3 text-xs font-semibold text-white shadow-[0_16px_32px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:gap-3 sm:px-5 sm:text-sm"
                style={{ animationDelay: "0.08s" }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "var(--theme-accent)" }}
                />
                <span>{hero.badge}</span>
              </div>

              <div className="mt-8">
                <h1
                  className="hero-reveal text-[2.7rem] font-medium leading-[0.98] tracking-tight text-white min-[380px]:text-5xl"
                  style={{ animationDelay: "0.18s" }}
                >
                  {hero.title.lineOne}
                  <span className="mt-4 block font-light italic">
                    {hero.title.lineTwo}
                  </span>
                </h1>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              {/* Adjusted mobile grid alignment to look cleaner during the reveal animation */}
              <div
                className="hero-reveal grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-0"
                style={{ animationDelay: "0.56s" }}
              >
                {hero.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="hero-stat relative py-2 sm:px-8 sm:py-0"
                    style={{ animationDelay: `${0.68 + index * 0.12}s` }}
                  >
                    <p className="text-4xl font-semibold tracking-tight text-white min-[380px]:text-5xl lg:text-[3.5rem]">
                      <CounterValue value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-sm text-white/86 sm:mt-4 lg:text-[0.9rem]">
                      {stat.label}
                    </p>

                    {index < hero.stats.length - 1 && (
                      <div className="absolute right-0 top-1/2 hidden h-20 w-px -translate-y-1/2 rotate-15 bg-white/12 sm:block" />
                    )}
                  </div>
                ))}
              </div>

              <div
                className="hero-reveal mt-8 border-t border-white/12 pt-8"
                style={{ animationDelay: "0.92s" }}
              >
                <div className="flex flex-col gap-10 sm:flex-row sm:items-center">
                  {/* Added active: classes for crisp, instant mobile touch feedback alongside desktop hover states */}
                  <a
                    href={branding.primaryCtaHref}
                    className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-5 py-3 text-base font-semibold text-[#0B1224] transition-all duration-300 active:scale-[0.98] min-[420px]:w-fit sm:px-8"
                  >
                    <span
                      className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-active:translate-y-0"
                      style={{ backgroundColor: "var(--theme-accent)" }}
                    />

                    <span className="relative z-10 inline-flex items-center gap-3 transition-colors duration-300">
                      {branding.primaryCtaLabel}
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45 group-active:rotate-45" />
                    </span>
                  </a>

                  <div className="flex flex-col gap-2 sm:shrink-0">
                    <div className="flex items-center gap-3">
                      <p className="shrink-0 text-2xl font-semibold leading-none text-white">
                        {hero.rating.value}
                      </p>
                      <div
                        className="flex shrink-0 items-center gap-1"
                        style={{ color: "var(--theme-accent)" }}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-base leading-snug text-white/82">
                      {hero.rating.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0); /* Reduced slightly from 28px for smoother mobile tracking */
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .hero-reveal {
          opacity: 0;
          will-change: transform, opacity;
          animation: fadeInUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-stat {
          opacity: 0;
          will-change: transform, opacity;
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
