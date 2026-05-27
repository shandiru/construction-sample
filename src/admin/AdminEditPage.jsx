import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getMediaUrl, sitesApi, uploadFile } from "../api";
import {
  ArrowLeft,
  Save,
  Globe,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Check,
  Loader2,
  Upload,
  X,
  Image,
  Film,
} from "lucide-react";

// ── Small helpers ─────────────────────────────────────────────────────────

const defaultServiceCards = [
  {
    title: "Traditional Tube & Fit Scaffolding",
    description:
      "Standard scaffolding for various commercial, domestic, and industrial construction needs.",
    icon: "building",
    image: "/8.jpg",
  },
  {
    title: "Full Supply, Erection & Dismantling",
    description:
      "We handle all stages of scaffolding work, from initial supply through to safe dismantling.",
    icon: "wrench",
    image: "/8.jpg",
  },
  {
    title: "Projects of Any Size",
    description:
      "From small domestic towers to large-scale high-rise commercial buildings.",
    icon: "clipboard",
    image: "/8.jpg",
  },
  {
    title: "Plettac System Scaffolding",
    description:
      "Modular system scaffolding suitable for complex or high-rise projects.",
    icon: "panels",
    image: "/8.jpg",
  },
];

function shouldReplaceWithDefaultServiceCards(cards) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return true;
  }

  if (cards.length >= defaultServiceCards.length) {
    return false;
  }

  return cards.every((card) => {
    const title = card?.title?.trim() ?? "";
    const description = card?.description?.trim() ?? "";

    return (
      /^service\b/i.test(title) ||
      /^description of your/i.test(description) ||
      !title ||
      !description
    );
  });
}

function Field({ label, value, onChange, type = "text", placeholder, rows }) {
  const base =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-emerald-500/50 focus:bg-white/8";
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</span>
      {rows ? (
        <textarea
          className={base}
          rows={rows}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={base}
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function ColorField({ label, hint, value, onChange }) {
  return (
    <label className="min-w-0 flex flex-col gap-1.5">
      <span className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</span>
      {hint && <span className="text-xs leading-snug text-white/35">{hint}</span>}
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="color"
          value={value ?? "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent p-1 sm:w-14 sm:shrink-0"
        />
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
          placeholder="#000000"
        />
      </div>
    </label>
  );
}

// accept: "image" | "video" | "both"
function ImageUploadField({ label, value, onChange, accept = "image", placeholder }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const acceptAttr =
    accept === "image"
      ? "image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
      : accept === "video"
      ? "video/mp4,video/webm,video/ogg"
      : "image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/mp4,video/webm,video/ogg";

  const isVideo = (url) =>
    url && /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  const isImage = (url) =>
    url && /\.(jpe?g|png|webp|gif|svg)(\?.*)?$/i.test(url);

  useEffect(() => {
    if (value && (isImage(value) || isVideo(value))) {
      setPreview(getMediaUrl(value));
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadFile(file);
      onChange(result.url);
      setPreview(getMediaUrl(result.url));
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleClear = () => {
    onChange("");
    setPreview(null);
  };

  const base =
    "flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-emerald-500/50 focus:bg-white/8";

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-white/50 uppercase tracking-wider">{label}</span>

      {/* URL input + upload button row */}
      <div className="flex items-center gap-2">
        <input
          className={base}
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "/path/to/file"}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-white/8 px-3 text-sm text-white/60 hover:bg-white/14 hover:text-white transition disabled:opacity-50"
          title={`Upload ${accept === "video" ? "video" : accept === "both" ? "image / video" : "image"}`}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : accept === "video" ? (
            <Film className="h-4 w-4" />
          ) : accept === "both" ? (
            <Upload className="h-4 w-4" />
          ) : (
            <Image className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {uploading ? "Uploading…" : "Upload"}
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={acceptAttr}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative mt-1 overflow-hidden rounded-xl border border-white/10 bg-white/4">
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/80 hover:text-white transition"
            title="Remove"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          {isVideo(preview) ? (
            <video
              src={preview}
              className="max-h-36 w-full object-contain"
              muted
              controls={false}
              playsInline
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="max-h-36 w-full object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-white/4"
      >
        <span className="font-semibold text-white">{title}</span>
        {open ? (
          <ChevronDown className="h-4 w-4 text-white/40" />
        ) : (
          <ChevronRight className="h-4 w-4 text-white/40" />
        )}
      </button>
      {open && <div className="border-t border-white/8 px-6 py-6 space-y-5">{children}</div>}
    </div>
  );
}

// ── Main Editor ───────────────────────────────────────────────────────────

export default function AdminEditPage() {
  const { slug } = useParams();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    sitesApi
      .getBySlug(slug)
      .then((data) => {
        const next = structuredClone(data);

        if (!next.services) {
          next.services = {};
        }

        if (shouldReplaceWithDefaultServiceCards(next.services.cards)) {
          next.services.cards = structuredClone(defaultServiceCards);
        }

        setConfig(next);
      })
      .catch(() => setError("Site not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  const set = (path, value) => {
    setConfig((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const setArr = (path, index, field, value) => {
    setConfig((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let arr = next;
      for (const k of keys) arr = arr[k];
      arr[index][field] = value;
      return next;
    });
  };

  const addToArr = (path, template) => {
    setConfig((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let arr = next;
      for (const k of keys) arr = arr[k];
      arr.push(template);
      return next;
    });
  };

  const removeFromArr = (path, index) => {
    setConfig((prev) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let arr = next;
      for (const k of keys) arr = arr[k];
      arr.splice(index, 1);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await sitesApi.update(slug, config);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Save failed: " + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-white/30" />
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-950 text-white">
        <p className="text-red-400">{error}</p>
        <Link to="/admin" className="text-sm text-white/50 hover:text-white">
          ← Back to Admin
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/90 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              to="/admin"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-white/60 hover:bg-white/10 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-bold leading-none">{config.branding?.companyName}</h1>
              <p className="mt-0.5 font-mono text-xs text-white/40">/site/{slug}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`/site/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm text-white/60 hover:border-white/20 hover:text-white transition"
            >
              <Globe className="h-4 w-4" />
              Preview
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex h-9 items-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-50 transition"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : saved ? (
                <Check className="h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 px-4 py-8 sm:px-6 sm:py-10">

        {/* ── Branding ── */}
        <Section title="🏢 Branding" defaultOpen>
          <Field label="Company Name" value={config.branding?.companyName} onChange={(v) => set("branding.companyName", v)} />
          <ImageUploadField label="Logo" value={config.branding?.logo} onChange={(v) => set("branding.logo", v)} accept="image" placeholder="/logo.png" />
          <Field label="Logo Alt Text" value={config.branding?.logoAlt} onChange={(v) => set("branding.logoAlt", v)} />
          <Field label="CTA Button Label" value={config.branding?.primaryCtaLabel} onChange={(v) => set("branding.primaryCtaLabel", v)} />
          <Field label="CTA Button Link (href)" value={config.branding?.primaryCtaHref} onChange={(v) => set("branding.primaryCtaHref", v)} placeholder="mailto:info@example.com" />
        </Section>

        {/* ── Navigation ── */}
        <Section title="🔗 Navigation Links">
          <div className="space-y-3">
            {(config.navigation?.links || []).map((link, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
                  placeholder="Label"
                  value={link.label ?? ""}
                  onChange={(e) => setArr("navigation.links", i, "label", e.target.value)}
                />
                <input
                  type="text"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white outline-none focus:border-emerald-500/50"
                  placeholder="Href (e.g. services)"
                  value={link.href ?? ""}
                  onChange={(e) => setArr("navigation.links", i, "href", e.target.value)}
                />
                <button
                  onClick={() => removeFromArr("navigation.links", i)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/6 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addToArr("navigation.links", { label: "New Link", href: "" })}
              className="flex items-center gap-2 rounded-xl bg-white/6 px-4 py-2.5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition"
            >
              <Plus className="h-4 w-4" /> Add Link
            </button>
          </div>
        </Section>

        {/* ── Hero ── */}
        <Section title="🦸 Hero Section">
          <Field label="Badge Text" value={config.hero?.badge} onChange={(v) => set("hero.badge", v)} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Title Line 1" value={config.hero?.title?.lineOne} onChange={(v) => set("hero.title.lineOne", v)} />
            <Field label="Title Line 2 (italic)" value={config.hero?.title?.lineTwo} onChange={(v) => set("hero.title.lineTwo", v)} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">Media Type</p>
              <div className="flex gap-2">
                {["image", "video"].map((t) => (
                  <button
                    key={t}
                    onClick={() => set("hero.media.type", t)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${config.hero?.media?.type === t ? "bg-emerald-500 text-black" : "bg-white/6 text-white/60 hover:bg-white/10"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Rating Value" value={config.hero?.rating?.value} onChange={(v) => set("hero.rating.value", v)} placeholder="5.0" />
          </div>

          <ImageUploadField label="Background Image" value={config.hero?.media?.image} onChange={(v) => set("hero.media.image", v)} accept="image" placeholder="/your-image.jpg" />
          {config.hero?.media?.type === "video" && (
            <ImageUploadField label="Background Video" value={config.hero?.media?.src} onChange={(v) => set("hero.media.src", v)} accept="video" placeholder="/background.mp4" />
          )}
          <Field label="Rating Label" value={config.hero?.rating?.label} onChange={(v) => set("hero.rating.label", v)} />

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/50">Stats</p>
            <div className="space-y-3">
              {(config.hero?.stats || []).map((stat, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-3">
                  <input type="number" className="w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" placeholder="Value" value={stat.value ?? ""} onChange={(e) => setArr("hero.stats", i, "value", Number(e.target.value))} />
                  <input type="text" className="w-16 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" placeholder="+" value={stat.suffix ?? ""} onChange={(e) => setArr("hero.stats", i, "suffix", e.target.value)} />
                  <input type="text" className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" placeholder="Label" value={stat.label ?? ""} onChange={(e) => setArr("hero.stats", i, "label", e.target.value)} />
                  <button onClick={() => removeFromArr("hero.stats", i)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/6 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={() => addToArr("hero.stats", { value: 0, suffix: "", label: "New Stat" })} className="flex items-center gap-2 rounded-xl bg-white/6 px-4 py-2.5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition">
                <Plus className="h-4 w-4" /> Add Stat
              </button>
            </div>
          </div>
        </Section>

        {/* ── Services ── */}
        <Section title="🔧 Services Section">
          <Field label="Badge" value={config.services?.badge} onChange={(v) => set("services.badge", v)} />
          <Field label="Heading" value={config.services?.heading} onChange={(v) => set("services.heading", v)} />
          <Field label="Summary Text" value={config.services?.summary} onChange={(v) => set("services.summary", v)} />
          <Field label="Summary Link Label" value={config.services?.summaryLinkLabel} onChange={(v) => set("services.summaryLinkLabel", v)} />
          <Field label="Card CTA Label" value={config.services?.ctaLabel} onChange={(v) => set("services.ctaLabel", v)} />

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/50">Service Cards</p>
            <div className="space-y-4">
              {(config.services?.cards || []).map((card, i) => (
                <div key={i} className="rounded-xl border border-white/8 bg-white/3 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/60">Card {i + 1}</span>
                    <button onClick={() => removeFromArr("services.cards", i)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/6 text-white/40 hover:bg-red-500/20 hover:text-red-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                  <input type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" placeholder="Title" value={card.title ?? ""} onChange={(e) => setArr("services.cards", i, "title", e.target.value)} />
                  <textarea className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" rows={2} placeholder="Description" value={card.description ?? ""} onChange={(e) => setArr("services.cards", i, "description", e.target.value)} />
                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-xs text-white/40">Icon (building/wrench/clipboard/panels)</p>
                      <input type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/50" placeholder="building" value={card.icon ?? ""} onChange={(e) => setArr("services.cards", i, "icon", e.target.value)} />
                    </div>
                    <div>
                      <ImageUploadField label="Card Image" value={card.image} onChange={(v) => setArr("services.cards", i, "image", v)} accept="image" placeholder="/image.jpg" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => addToArr("services.cards", { title: "New Service", description: "Describe this service.", icon: "building", image: "" })} className="flex items-center gap-2 rounded-xl bg-white/6 px-4 py-2.5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition">
                <Plus className="h-4 w-4" /> Add Service Card
              </button>
            </div>
          </div>
        </Section>

        {/* ── Contact ── */}
        <Section title="📬 Contact Section">
          <Field label="Badge" value={config.contact?.badge} onChange={(v) => set("contact.badge", v)} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Heading Line 1" value={config.contact?.heading?.lineOne} onChange={(v) => set("contact.heading.lineOne", v)} />
            <Field label="Heading Line 2 (italic)" value={config.contact?.heading?.lineTwo} onChange={(v) => set("contact.heading.lineTwo", v)} />
          </div>
          <Field label="Description" value={config.contact?.description} onChange={(v) => set("contact.description", v)} rows={3} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email" value={config.contact?.email} onChange={(v) => set("contact.email", v)} type="email" />
            <Field label="Phone" value={config.contact?.phone} onChange={(v) => set("contact.phone", v)} />
          </div>
          <Field label="Address Label" value={config.contact?.addressLabel} onChange={(v) => set("contact.addressLabel", v)} />
          <Field label="Address" value={config.contact?.address} onChange={(v) => set("contact.address", v)} />
        </Section>

        {/* ── Footer ── */}
        <Section title="🦶 Footer">
          <Field label="Intro Title" value={config.footer?.introTitle} onChange={(v) => set("footer.introTitle", v)} />
          <Field label="Intro Description" value={config.footer?.introDescription} onChange={(v) => set("footer.introDescription", v)} rows={2} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Brand Name" value={config.footer?.brandName} onChange={(v) => set("footer.brandName", v)} />
            <Field label="Copyright Year" value={config.footer?.copyrightYear} onChange={(v) => set("footer.copyrightYear", v)} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Office Location" value={config.footer?.officeLocation} onChange={(v) => set("footer.officeLocation", v)} />
            <Field label="Office Email" value={config.footer?.officeEmail} onChange={(v) => set("footer.officeEmail", v)} />
          </div>
          <Field label="Office Phone" value={config.footer?.officePhone} onChange={(v) => set("footer.officePhone", v)} />
          <Field label="Powered By Text" value={config.footer?.poweredBy} onChange={(v) => set("footer.poweredBy", v)} />
        </Section>

        {/* ── Theme / CSS Variables ── */}
        <Section title="🎨 Website Colors">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ColorField label="Main Page Background" hint="Body, navbar background, contact area" value={config.theme?.pageBackground} onChange={(v) => set("theme.pageBackground", v)} />
            <ColorField label="Button / Highlight Color" hint="CTA buttons, dots, stars, active icons" value={config.theme?.accent} onChange={(v) => set("theme.accent", v)} />
            <ColorField label="Button Hover Color" hint="Hover/active color for buttons and links" value={config.theme?.accentStrong} onChange={(v) => set("theme.accentStrong", v)} />
            <ColorField label="Card Background" hint="White panels and mobile menu background" value={config.theme?.surface} onChange={(v) => set("theme.surface", v)} />
            <ColorField label="Light Section Background" hint="Services section and form input backgrounds" value={config.theme?.surfaceSoft} onChange={(v) => set("theme.surfaceSoft", v)} />
            <ColorField label="Muted Surface Color" hint="Secondary soft background color" value={config.theme?.surfaceMuted} onChange={(v) => set("theme.surfaceMuted", v)} />
            <ColorField label="Normal Text Color" hint="Navbar links and regular text" value={config.theme?.text} onChange={(v) => set("theme.text", v)} />
            <ColorField label="Small / Description Text" hint="Paragraphs, helper text, loading text" value={config.theme?.textMuted} onChange={(v) => set("theme.textMuted", v)} />
            <ColorField label="Heading Text Color" hint="Section titles, card titles, contact labels" value={config.theme?.heading} onChange={(v) => set("theme.heading", v)} />
            <ColorField label="Dark Button / Footer Color" hint="Contact submit button and dark accents" value={config.theme?.primary} onChange={(v) => set("theme.primary", v)} />
            <ColorField label="Hero Background Color" hint="Fallback behind hero image/video" value={config.theme?.primaryStrong} onChange={(v) => set("theme.primaryStrong", v)} />
            <ColorField label="Soft Highlight Color" hint="Light accent shade for future badges/backgrounds" value={config.theme?.accentSoft} onChange={(v) => set("theme.accentSoft", v)} />
          </div>
        </Section>

        {/* Bottom Save Button */}
        <div className="flex justify-end pt-4 pb-16">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-base font-semibold text-black hover:bg-emerald-400 disabled:opacity-50 transition"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : saved ? <Check className="h-5 w-5" /> : <Save className="h-5 w-5" />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save All Changes"}
          </button>
        </div>
      </main>
    </div>
  );
}
