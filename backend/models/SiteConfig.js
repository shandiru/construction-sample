import mongoose from "mongoose";

const siteConfigSchema = new mongoose.Schema(
  {
    // Unique URL slug - e.g. "empire-scaffolding" => /site/empire-scaffolding
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ── global.js: siteConfig ──────────────────────────────────────────────
    branding: {
      companyName: { type: String, default: "My Company" },
      logo: { type: String, default: "/logo.png" },
      logoAlt: { type: String, default: "Logo" },
      primaryCtaLabel: { type: String, default: "Get a Free Quote" },
      primaryCtaHref: { type: String, default: "mailto:info@example.com" },
    },

    navigation: {
      links: [
        {
          label: String,
          href: String,
        },
      ],
    },

    hero: {
      badge: { type: String, default: "Professional Services" },
      title: {
        lineOne: { type: String, default: "Safe & Reliable" },
        lineTwo: { type: String, default: "Solutions" },
      },
      media: {
        type: { type: String, enum: ["video", "image"], default: "image" },
        src: { type: String, default: "" },
        poster: { type: String, default: "" },
        image: { type: String, default: "" },
        alt: { type: String, default: "Background" },
      },
      stats: [
        {
          value: Number,
          suffix: String,
          label: String,
        },
      ],
      rating: {
        value: { type: String, default: "5.0" },
        label: { type: String, default: "Based on Customer Reviews" },
      },
    },

    services: {
      badge: { type: String, default: "Our Services" },
      heading: { type: String, default: "Reliable services for every project" },
      ctaLabel: { type: String, default: "Learn More" },
      summary: { type: String, default: "Services across the country" },
      summaryLinkLabel: { type: String, default: "View All Services" },
      rating: {
        value: { type: String, default: "5/5" },
        label: { type: String, default: "Based on Customer Reviews" },
        stars: { type: Number, default: 5 },
      },
      clients: [
        {
          image: String,
          alt: String,
        },
      ],
      cards: [
        {
          title: String,
          description: String,
          icon: String,
          image: String,
        },
      ],
    },

    contact: {
      badge: { type: String, default: "Contact Us" },
      heading: {
        lineOne: { type: String, default: "We're ready to build" },
        lineTwo: { type: String, default: "your future together" },
      },
      description: { type: String, default: "" },
      email: { type: String, default: "info@example.com" },
      phone: { type: String, default: "+1 234 567 8900" },
      addressLabel: { type: String, default: "Address:" },
      address: { type: String, default: "123 Main Street, City" },
      socialLinks: [
        {
          label: String,
          href: String,
          icon: String,
        },
      ],
      form: {
        firstNameLabel: { type: String, default: "First Name:" },
        firstNamePlaceholder: { type: String, default: "Enter First Name*" },
        lastNameLabel: { type: String, default: "Last Name:" },
        lastNamePlaceholder: { type: String, default: "Enter Last Name*" },
        emailLabel: { type: String, default: "Email Address:" },
        emailPlaceholder: { type: String, default: "Enter Email Address*" },
        phoneLabel: { type: String, default: "Phone Number:" },
        phonePlaceholder: { type: String, default: "Enter Phone Number*" },
        messageLabel: { type: String, default: "Message:" },
        messagePlaceholder: { type: String, default: "Any Additional Message..." },
        submitLabel: { type: String, default: "Send Message" },
      },
    },

    footer: {
      introTitle: { type: String, default: "Hello, We Are" },
      introDescription: { type: String, default: "Quality services for you." },
      officeTitle: { type: String, default: "Office" },
      officeLocation: { type: String, default: "City" },
      officeEmail: { type: String, default: "office@example.com" },
      officePhone: { type: String, default: "+1 234 567 8900" },
      linksTitle: { type: String, default: "Links" },
      socialTitle: { type: String, default: "Get In Touch" },
      brandName: { type: String, default: "My Company" },
      copyrightYear: { type: String, default: "2026" },
      poweredBy: { type: String, default: "Powered by Ansely" },
      socialLinks: [
        {
          label: String,
          href: String,
          icon: String,
        },
      ],
    },

    // ── global.css: CSS variables ──────────────────────────────────────────
    theme: {
      pageBackground: { type: String, default: "#f4f1ea" },
      accent: { type: String, default: "#7a990c" },
      accentStrong: { type: String, default: "#65b905" },
      surface: { type: String, default: "#ffffff" },
      surfaceMuted: { type: String, default: "#ebe6db" },
      surfaceSoft: { type: String, default: "#f7f3ec" },
      text: { type: String, default: "#171717" },
      textMuted: { type: String, default: "#6c675f" },
      heading: { type: String, default: "#101114" },
      primary: { type: String, default: "#111827" },
      primaryStrong: { type: String, default: "#050816" },
      accentSoft: { type: String, default: "#eef8b8" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SiteConfig", siteConfigSchema);
