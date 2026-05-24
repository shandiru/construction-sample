import {
    ArrowUpRight,
    Building2,
    ClipboardList,
    PanelsTopLeft,
    Wrench,
} from "lucide-react";
import { getMediaUrl } from "../api";
import { useSite } from "../SiteContext";

const iconMap = {
    building: Building2,
    wrench: Wrench,
    clipboard: ClipboardList,
    panels: PanelsTopLeft,
};

export default function ServicesSection() {
    const siteConfig = useSite(); const { branding, services } = siteConfig;

    return (
        <section
            className="app-section py-16"
            id="services"
            style={{ backgroundColor: "var(--theme-surface-soft)" }}
        >
            <div className="app-container">
                <div className="mb-14 text-center">
                    <div
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-[11px] font-medium shadow-sm"
                        style={{ color: "var(--theme-primary)" }}
                    >
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: "var(--theme-accent)" }}
                        />
                        <span>{services.badge}</span>
                    </div>

                    <h2
                        className="mx-auto max-w-190 text-[34px] font-bold leading-[1.1] tracking-[-1px] md:text-[48px]"
                        style={{ color: "var(--theme-heading)" }}
                    >
                        {services.heading}
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {services.cards.map((service, index) => {
                        const Icon = iconMap[service.icon];
                        const serviceImage = getMediaUrl(service.image);

                        return (
                            <div
                                key={index}
                                className="group relative flex min-h-90 flex-col overflow-hidden rounded-[28px] border bg-white p-8 shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.14)] active:scale-[0.99] active:shadow-[0_22px_60px_rgba(0,0,0,0.14)]"
                                style={{ borderColor: "rgba(16,17,20,0.08)" }}
                            >
                                {/* Background Image container with bottom-to-top slide reveal */}
                                {serviceImage && (
                                    <div className="absolute inset-0 z-0 opacity-0 transition-all duration-500 ease-out translate-y-4 scale-105 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-active:opacity-100 group-active:translate-y-0 group-active:scale-100">
                                        <img
                                            src={serviceImage}
                                            alt={`${service.title} by ${branding.companyName}`}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                            "linear-gradient(180deg, rgba(28, 48, 82, 0.96) 0%, rgba(28, 48, 82, 0.9) 25%, rgba(16, 24, 41, 0.42) 46%, rgba(8, 12, 22, 0.26) 58%, rgba(8, 12, 22, 0.7) 72%, rgba(8, 12, 22, 0.88) 100%)",
                                        }}
                                    />
                                    </div>
                                )}

                                <div className="relative z-10 flex flex-1 flex-col justify-between">
                                    <div className="transition-all duration-500 group-hover:translate-y-1 group-active:translate-y-1">
                                        <div
                                            className="service-icon mb-8 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500 ease-out"
                                            style={{
                                                backgroundColor: "var(--theme-surface-soft)",
                                                color: "var(--theme-heading)",
                                            }}
                                        >
                                            <Icon size={24} />
                                        </div>

                                        <h3
                                            className="mb-4 max-w-60 text-[22px] font-bold leading-[1.18] transition-colors duration-500 group-hover:text-white group-active:text-white"
                                            style={{ color: "var(--theme-heading)" }}
                                        >
                                            {service.title}
                                        </h3>

                                        <p
                                            className="service-description max-w-60 text-[14px] leading-[1.75] transition-colors duration-500"
                                            style={{ color: "var(--theme-text-muted)" }}
                                        >
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="mt-10 pt-4">
                                        <button
                                            className="service-cta inline-flex items-center gap-3 text-[15px] font-medium transition-colors duration-500"
                                            style={{ color: "var(--theme-heading)" }}
                                        >
                                            {services.ctaLabel}
                                            <span
                                                className="service-arrow flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 ease-out"
                                                style={{
                                                    backgroundColor: "var(--theme-surface-soft)",
                                                    color: "var(--theme-heading)",
                                                }}
                                            >
                                                <ArrowUpRight
                                                    size={16}
                                                    className="transition-transform duration-500 ease-out group-hover:rotate-45 group-active:rotate-45"
                                                />
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100">
                                    <div
                                        className="m-4 h-[calc(100%-2rem)] rounded-3xl"
                                        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
                                    />
                                </div>

                                <style>{`
                                    .group:hover .service-icon,
                                    .group:hover .service-arrow,
                                    .group:active .service-icon,
                                    .group:active .service-arrow {
                                        background-color: var(--theme-accent) !important;
                                        color: #0b1224 !important;
                                    }
                                    .group:hover .service-description,
                                    .group:active .service-description {
                                        color: rgba(255, 255, 255, 0.92) !important;
                                    }
                                    .group:hover .service-cta,
                                    .group:active .service-cta {
                                        color: rgba(255, 255, 255, 1) !important;
                                    }
                                `}</style>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-14 flex flex-col items-center justify-center gap-5 text-center">
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex -space-x-3">
                            {services.clients.map((client) => (
                                <img
                                    key={client.alt}
                                    src={getMediaUrl(client.image)}
                                    alt={client.alt}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                                    loading="lazy"
                                />
                            ))}
                        </div>

                        <p
                            className="max-w-135 text-sm"
                            style={{ color: "var(--theme-text-muted)" }}
                        >
                            {services.summary} -{" "}
                            <span
                                className="font-semibold underline underline-offset-4"
                                style={{ color: "var(--theme-heading)" }}
                            >
                                {services.summaryLinkLabel}
                            </span>
                        </p>
                    </div>

                    <div
                        className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold"
                        style={{ color: "var(--theme-heading)" }}
                    >
                        <span className="text-[20px]">{services.rating.value}</span>
                        <div
                            className="flex items-center gap-1"
                            style={{ color: "var(--theme-accent)" }}
                        >
                            {Array.from({ length: services.rating.stars }).map((_, index) => (
                                <span key={index}>★</span>
                            ))}
                        </div>
                        <span>{services.rating.label}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
