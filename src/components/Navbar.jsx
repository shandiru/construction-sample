import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { getMediaUrl } from "../api";
import { useSite } from "../SiteContext";

const Navbar = ({ overlay = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const siteConfig = useSite(); const { branding, navigation } = siteConfig;
  const logoUrl = getMediaUrl(branding.logo);

  // Optimized smooth scroll helper that ensures the mobile menu closes seamlessly
  const handleScroll = (el) => {
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header
      className={`app-section inset-x-0 z-50 w-full ${
        overlay ? "absolute top-3 sm:top-6" : "fixed top-3 left-0 sm:top-5"
      }`}
    >
      <div
        className={`app-container flex items-center justify-between ${
          overlay
            ? "rounded-[1.2rem] border px-3.5 py-3.5 shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:rounded-4xl sm:px-8 sm:py-4 lg:rounded-[2.6rem] lg:px-10"
            : "rounded-full border px-3.5 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.16)] backdrop-blur-md sm:px-7 lg:px-10"
        }`}
        style={{
          backgroundColor: "var(--theme-page-bg)",
          borderColor: "var(--theme-border)",
        }}
      >
        <HashLink smooth to="/#top" className="flex items-center">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={branding.logoAlt}
              className="h-11 w-auto object-contain sm:h-12 lg:h-24"
            />
          )}
        </HashLink>

        {/* Desktop Links: Handled via safe CSS-driven hover effects */}
        <nav
          className={`hidden items-center text-[1.05rem] font-medium xl:flex ${
            overlay ? "gap-10" : "gap-8"
          }`}
          style={{ color: "var(--theme-text)" }}
        >
          {navigation.links.map((link) => (
            <HashLink
              key={link.href}
              smooth
              to={`/#${link.href}`}
              scroll={handleScroll}
              className="transition-colors duration-200 hover:text-(--theme-accent-strong)"
            >
              {link.label}
            </HashLink>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden items-center gap-6 xl:flex">
          <a
            href={branding.primaryCtaHref}
            className={`group inline-flex items-center gap-3 rounded-full font-semibold text-white transition-all duration-200 hover:bg-(--theme-accent-strong) hover:text-(--theme-primary-strong) ${
              overlay ? "px-6 py-3 text-sm lg:px-8 lg:text-base" : "px-6 py-3"
            }`}
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            {branding.primaryCtaLabel}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </div>

        {/* Hamburger Trigger with touch feedback scales */}
        <button
          className="transition-transform duration-200 active:scale-95 xl:hidden"
          style={{ color: "var(--theme-text)" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Section */}
      {isOpen && (
        <div
          className={`app-container nav-mobile-fade-in mt-3 flex flex-col gap-4 px-4 shadow-[0_20px_60px_rgba(15,23,42,0.14)] xl:hidden sm:px-6 ${
            overlay
              ? "rounded-4xl border py-6 text-base"
              : "items-center rounded-4xl border py-6 text-lg"
          }`}
          style={{
            backgroundColor: "var(--theme-surface)",
            color: "var(--theme-text)",
            borderColor: "var(--theme-border)",
          }}
        >
          {navigation.links.map((link) => (
            <HashLink
              key={link.href}
              smooth
              to={`/#${link.href}`}
              scroll={handleScroll}
              className="w-full text-center font-medium transition-colors duration-200 py-1 active:text-(--theme-accent-strong)"
            >
              {link.label}
            </HashLink>
          ))}
          
          {/* Mobile Target CTA with active touch press effect */}
          <a
            href={branding.primaryCtaHref}
            className={`group inline-flex items-center justify-center gap-3 rounded-full font-semibold text-white transition-all duration-200 active:scale-[0.98] active:bg-(--theme-accent-strong) active:text-(--theme-primary-strong)] ${
              overlay ? "mt-2 w-full py-3 text-sm" : "px-5 py-3 w-full"
            }`}
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            {branding.primaryCtaLabel}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-active:rotate-45" />
          </a>
        </div>
      )}

      <style>{`
        @keyframes navSlideIn {
          from {
            opacity: 0;
            transform: translate3d(0, -10px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .nav-mobile-fade-in {
          will-change: transform, opacity;
          animation: navSlideIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
