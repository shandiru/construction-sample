import express from "express";
import slugify from "slugify";
import SiteConfig from "../models/SiteConfig.js";

const router = express.Router();

// ── Default data template ──────────────────────────────────────────────────
const getDefaultConfig = (companyName, slug) => ({
  slug,
  branding: {
    companyName,
    logo: "/logo.png",
    logoAlt: "Logo",
    primaryCtaLabel: "Get a Free Quote",
    primaryCtaHref: "mailto:info@example.com",
  },
  navigation: {
    links: [
      { label: "Home", href: "" },
      { label: "Services", href: "services" },
      { label: "Contact", href: "contact" },
    ],
  },
  hero: {
    badge: "Professional Services",
    title: { lineOne: "Safe & Reliable", lineTwo: "Solutions" },
    media: { type: "image", src: "", poster: "", image: "", alt: "Background" },
    stats: [
      { value: 25, suffix: "+", label: "Years Experience" },
      { value: 100, suffix: "%", label: "Satisfaction Rate" },
      { value: 500, suffix: "+", label: "Projects Done" },
    ],
    rating: { value: "5.0", label: "Based on Customer Reviews" },
  },
  services: {
    badge: "Our Services",
    heading: "Reliable services for every project",
    ctaLabel: "Learn More",
    summary: "Services across the country",
    summaryLinkLabel: "View All Services",
    rating: { value: "5/5", label: "Based on Customer Reviews", stars: 5 },
    clients: [],
    cards: [
      {
        title: "Service One",
        description: "Description of your first service.",
        icon: "building",
        image: "",
      },
      {
        title: "Service Two",
        description: "Description of your second service.",
        icon: "wrench",
        image: "",
      },
    ],
  },
  contact: {
    badge: "Contact Us",
    heading: { lineOne: "We're ready to build", lineTwo: "your future together" },
    description: "We partner with you to deliver high-quality projects.",
    email: "info@example.com",
    phone: "+1 234 567 8900",
    addressLabel: "Address:",
    address: "123 Main Street, City Name",
    socialLinks: [
      { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    ],
    form: {
      firstNameLabel: "First Name:",
      firstNamePlaceholder: "Enter First Name*",
      lastNameLabel: "Last Name:",
      lastNamePlaceholder: "Enter Last Name*",
      emailLabel: "Email Address:",
      emailPlaceholder: "Enter Email Address*",
      phoneLabel: "Phone Number:",
      phonePlaceholder: "Enter Phone Number*",
      messageLabel: "Message:",
      messagePlaceholder: "Any Additional Message...",
      submitLabel: "Send Message",
    },
  },
  footer: {
    introTitle: `Hello, We Are ${companyName}`,
    introDescription: "Quality services delivered with care.",
    officeTitle: "Office",
    officeLocation: "City",
    officeEmail: "office@example.com",
    officePhone: "+1 234 567 8900",
    linksTitle: "Links",
    socialTitle: "Get In Touch",
    brandName: companyName,
    copyrightYear: "2026",
    poweredBy: "Powered by Ansely",
    socialLinks: [
      { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    ],
  },
  theme: {
    pageBackground: "#f4f1ea",
    accent: "#7a990c",
    accentStrong: "#65b905",
    surface: "#ffffff",
    surfaceMuted: "#ebe6db",
    surfaceSoft: "#f7f3ec",
    text: "#171717",
    textMuted: "#6c675f",
    heading: "#101114",
    primary: "#111827",
    primaryStrong: "#050816",
    accentSoft: "#eef8b8",
  },
});

// ── POST /api/sites — Create new site ──────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName || !companyName.trim()) {
      return res.status(400).json({ error: "Company name is required" });
    }

    const slug = slugify(companyName.trim(), { lower: true, strict: true });

    const existing = await SiteConfig.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        error: "A site with this name already exists",
        slug,
        siteUrl: `/site/${slug}`,
      });
    }

    const config = getDefaultConfig(companyName.trim(), slug);
    const site = await SiteConfig.create(config);

    res.status(201).json({
      message: "Site created successfully",
      slug: site.slug,
      siteUrl: `/site/${slug}`,
      editUrl: `/admin/edit/${slug}`,
      site,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ── GET /api/sites — List all sites ────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const sites = await SiteConfig.find(
      {},
      { slug: 1, "branding.companyName": 1, createdAt: 1, updatedAt: 1 }
    ).sort({ createdAt: -1 });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ── GET /api/sites/:slug — Get site config ─────────────────────────────────
router.get("/:slug", async (req, res) => {
  try {
    const site = await SiteConfig.findOne({ slug: req.params.slug });
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ── PUT /api/sites/:slug — Full update ────────────────────────────────────
router.put("/:slug", async (req, res) => {
  try {
    const site = await SiteConfig.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json({ message: "Site updated successfully", site });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ── PATCH /api/sites/:slug — Partial update (single section) ──────────────
router.patch("/:slug", async (req, res) => {
  try {
    const site = await SiteConfig.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true }
    );
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json({ message: "Section updated", site });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ── DELETE /api/sites/:slug ────────────────────────────────────────────────
router.delete("/:slug", async (req, res) => {
  try {
    const site = await SiteConfig.findOneAndDelete({ slug: req.params.slug });
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json({ message: "Site deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
