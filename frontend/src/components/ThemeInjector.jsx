import { useEffect } from "react";

/**
 * Injects theme CSS variables from the site's DB config
 * into :root so all components pick them up automatically.
 */
export default function ThemeInjector({ theme }) {
  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;

    const map = {
      "--theme-page-bg":      theme.pageBackground,
      "--theme-accent":       theme.accent,
      "--theme-accent-strong":theme.accentStrong,
      "--theme-surface":      theme.surface,
      "--theme-surface-muted":theme.surfaceMuted,
      "--theme-surface-soft": theme.surfaceSoft,
      "--theme-text":         theme.text,
      "--theme-text-muted":   theme.textMuted,
      "--theme-heading":      theme.heading,
      "--theme-primary":      theme.primary,
      "--theme-primary-strong":theme.primaryStrong,
      "--theme-accent-soft":  theme.accentSoft,
    };

    Object.entries(map).forEach(([key, value]) => {
      if (value) root.style.setProperty(key, value);
    });

    return () => {
      // Reset to defaults on unmount
      Object.keys(map).forEach((key) => root.style.removeProperty(key));
    };
  }, [theme]);

  return null;
}
