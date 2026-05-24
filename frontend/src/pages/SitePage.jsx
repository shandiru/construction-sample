import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sitesApi } from "../api";
import { SiteContext } from "../SiteContext";
import ThemeInjector from "../components/ThemeInjector";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServiceSection";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

export default function SitePage() {
  const { slug } = useParams();
  const [siteConfig, setSiteConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    sitesApi
      .getBySlug(slug)
      .then((data) => {
        setSiteConfig(data);
        // Update page title
        document.title = data.branding?.companyName || "Site";
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Site not found");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: "var(--theme-page-bg)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
            style={{ borderColor: "var(--theme-accent)", borderTopColor: "transparent" }}
          />
          <p style={{ color: "var(--theme-text-muted)" }}>Loading site…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-6 text-center">
        <div className="text-6xl">🏗️</div>
        <h1 className="text-3xl font-bold text-gray-900">Site not found</h1>
        <p className="text-gray-500">{error}</p>
        <a
          href="/"
          className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          ← Back to Home
        </a>
      </div>
    );
  }

  return (
    <SiteContext.Provider value={siteConfig}>
      <ThemeInjector theme={siteConfig.theme} />
      <div>
        <HeroSection />
        <ServicesSection />
        <ContactSection />
        <FooterSection />
      </div>
    </SiteContext.Provider>
  );
}
