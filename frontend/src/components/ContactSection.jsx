import { Send } from "lucide-react";
import {
  FaPinterestP,
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";
import { useSite } from "../SiteContext";

const socialIcons = {
  pinterest: FaPinterestP,
  x: FaXTwitter,
  facebook: FaFacebookF,
  instagram: FaInstagram,
};

export default function ContactSection() {
  const siteConfig = useSite(); const { contact } = siteConfig;

  return (
    <section
      className="app-section py-16"
      id="contact"
      style={{ backgroundColor: "var(--theme-page-bg)" }}
    >
      <div className="app-container">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <div
                className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                style={{ color: "var(--theme-heading)" }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "var(--theme-accent)" }}
                />
                <span>{contact.badge}</span>
              </div>

              <h2
                className="mt-8 max-w-155 text-[2.7rem] font-semibold leading-[0.98] tracking-tight sm:text-[3.2rem]"
                style={{ color: "var(--theme-heading)" }}
              >
                {contact.heading.lineOne}
                <span className="mt-3 block font-light italic">
                  {contact.heading.lineTwo}
                </span>
              </h2>

              <p
                className="mt-8 max-w-140 text-lg leading-8"
                style={{ color: "var(--theme-text-muted)" }}
              >
                {contact.description}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center text-[1.5rem] font-semibold tracking-tight transition-colors duration-200"
                  style={{ color: "var(--theme-heading)" }}
                >
                  <span>{contact.email}</span>
                </a>

                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="mt-5 inline-flex items-center text-xl transition-colors duration-200"
                  style={{ color: "var(--theme-heading)" }}
                >
                  <span>{contact.phone}</span>
                </a>
              </div>

              <div
                className="border-y py-8"
                style={{ borderColor: "var(--theme-border)" }}
              >
                <p
                  className="text-[2rem] font-semibold tracking-tight"
                  style={{ color: "var(--theme-heading)" }}
                >
                  {contact.addressLabel}
                </p>
                <div
                  className="inline-flex items-start gap-3 text-lg leading-8"
                  style={{ color: "var(--theme-text-muted)" }}
                >
                  <span>{contact.address}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {contact.socialLinks.map((link) => {
                  const IconComponent = socialIcons[link.icon];

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-label={link.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border bg-transparent transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                      style={{
                        borderColor: "var(--theme-border)",
                        color: "var(--theme-heading)",
                      }}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10 xl:p-14">
            <form className="space-y-7">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span
                    className="mb-3 block text-lg font-semibold"
                    style={{ color: "var(--theme-heading)" }}
                  >
                    {contact.form.firstNameLabel}
                  </span>
                  <input
                    type="text"
                    placeholder={contact.form.firstNamePlaceholder}
                    className="h-15 w-full rounded-[20px] border border-transparent px-6 text-lg outline-none transition focus:bg-white"
                    style={{
                      backgroundColor: "var(--theme-surface-soft)",
                      color: "var(--theme-heading)",
                    }}
                  />
                </label>

                <label className="block">
                  <span
                    className="mb-3 block text-lg font-semibold"
                    style={{ color: "var(--theme-heading)" }}
                  >
                    {contact.form.lastNameLabel}
                  </span>
                  <input
                    type="text"
                    placeholder={contact.form.lastNamePlaceholder}
                    className="h-15 w-full rounded-[20px] border border-transparent px-6 text-lg outline-none transition focus:bg-white"
                    style={{
                      backgroundColor: "var(--theme-surface-soft)",
                      color: "var(--theme-heading)",
                    }}
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="block">
                  <span
                    className="mb-3 block text-lg font-semibold"
                    style={{ color: "var(--theme-heading)" }}
                  >
                    {contact.form.emailLabel}
                  </span>
                  <input
                    type="email"
                    placeholder={contact.form.emailPlaceholder}
                    className="h-15 w-full rounded-[20px] border border-transparent px-6 text-lg outline-none transition focus:bg-white"
                    style={{
                      backgroundColor: "var(--theme-surface-soft)",
                      color: "var(--theme-heading)",
                    }}
                  />
                </label>

                <label className="block">
                  <span
                    className="mb-3 block text-lg font-semibold"
                    style={{ color: "var(--theme-heading)" }}
                  >
                    {contact.form.phoneLabel}
                  </span>
                  <input
                    type="tel"
                    placeholder={contact.form.phonePlaceholder}
                    className="h-15 w-full rounded-[20px] border border-transparent px-6 text-lg outline-none transition focus:bg-white"
                    style={{
                      backgroundColor: "var(--theme-surface-soft)",
                      color: "var(--theme-heading)",
                    }}
                  />
                </label>
              </div>

              <label className="block">
                <span
                  className="mb-3 block text-lg font-semibold"
                  style={{ color: "var(--theme-heading)" }}
                >
                  {contact.form.messageLabel}
                </span>
                <textarea
                  rows="2"
                  placeholder={contact.form.messagePlaceholder}
                  className="w-full resize-none rounded-[20px] border border-transparent px-6 py-6 text-lg outline-none transition focus:bg-white"
                  style={{
                    backgroundColor: "var(--theme-surface-soft)",
                    color: "var(--theme-heading)",
                  }}
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-3 rounded-full px-8 py-5 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--theme-primary)" }}
              >
                <span>{contact.form.submitLabel}</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
