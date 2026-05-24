import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useSite } from "../SiteContext";

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
};

export default function FooterSection() {
  const siteConfig = useSite(); const { footer, navigation } = siteConfig;

  return (
    <footer className="app-section bg-black py-16 text-white">
      <div className="app-container">
        <div className="grid gap-12 border-b border-white/12 pb-14 sm:grid-cols-2 xl:grid-cols-4 xl:gap-16">
          <div>
            <h2 className="max-w-70 text-[1.5rem] font-semibold uppercase leading-[1.2] tracking-[0.03em]">
              {footer.introTitle}
            </h2>
            <p className="mt-10 max-w-[320px] text-[1.05rem] leading-9 text-white/74">
              {footer.introDescription}
            </p>
          </div>

          <div>
            <h3 className="text-[1.5rem] font-semibold uppercase tracking-[0.03em]">
              {footer.officeTitle}
            </h3>
            <div className="mt-10 space-y-7 text-[1.05rem] text-white/78">
              <p>{footer.officeLocation}</p>
              <a
                href={`mailto:${footer.officeEmail}`}
                className="block transition-colors duration-200 hover:text-white"
              >
                {footer.officeEmail}
              </a>
              <a
                href={`tel:${footer.officePhone.replace(/\s+/g, "")}`}
                className="block text-[1.2rem] font-semibold tracking-tight text-white transition-colors duration-200 hover:text-white/80"
              >
                {footer.officePhone}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[1.5rem] font-semibold uppercase tracking-[0.03em]">
              {footer.linksTitle}
            </h3>
            <nav className="mt-10 flex flex-col gap-6 text-[1.05rem] text-white/78">
              {navigation.links.slice(0, 4).map((link) => (
                <a
                  key={link.label}
                  href={`#${link.href}`}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-[1.5rem] font-semibold uppercase tracking-[0.03em]">
              {footer.socialTitle}
            </h3>
            <div className="mt-10 flex flex-col gap-6">
              {footer.socialLinks.map((link) => {
                const SocialIcon = socialIcons[link.icon];

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-4 text-[1.05rem] text-white/78 transition-colors duration-200 hover:text-white"
                  >
                    <span className="flex items-center justify-center text-white/80 transition-colors duration-200 group-hover:text-white">
                      <SocialIcon size={20} />
                    </span>
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm text-white/72 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {footer.brandName} (c) {footer.copyrightYear}. All rights reserved.
          </p>
          <p>{footer.poweredBy}</p>
        </div>
      </div>
    </footer>
  );
}
