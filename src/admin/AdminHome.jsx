import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sitesApi } from "../api";
import { ArrowUpRight, Plus, Globe, Pencil, Trash2, ExternalLink } from "lucide-react";

export default function AdminHome() {
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [sites, setSites] = useState([]);
  const [sitesLoading, setSitesLoading] = useState(true);
  const navigate = useNavigate();

  const loadSites = () => {
    setSitesLoading(true);
    sitesApi
      .getAll()
      .then(setSites)
      .catch(() => {})
      .finally(() => setSitesLoading(false));
  };

  useEffect(() => {
    loadSites();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) return;
    setLoading(true);
    setError("");
    setSuccess(null);

    try {
      const result = await sitesApi.create(companyName.trim());
      setSuccess(result);
      setCompanyName("");
      loadSites();
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong";
      setError(msg);
      // If site already exists, still show the URL
      if (err.response?.data?.slug) {
        setSuccess({ slug: err.response.data.slug, siteUrl: err.response.data.siteUrl });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await sitesApi.delete(slug);
      loadSites();
    } catch (err) {
      alert("Failed to delete site");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Site Builder</h1>
            <p className="text-sm text-white/50">Dynamic website management</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Admin
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 space-y-14">
        {/* ── Create new site ── */}
        <section>
          <h2 className="mb-2 text-2xl font-bold">Create a New Website</h2>
          <p className="mb-8 text-white/50 text-sm">
            Enter a business name → get a unique URL for the website
          </p>

          <form onSubmit={handleCreate} className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-1">
              <input
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setError("");
                  setSuccess(null);
                }}
                placeholder="e.g. Empire Scaffolding"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-lg text-white placeholder-white/25 outline-none transition focus:border-emerald-500/60 focus:bg-white/8"
                disabled={loading}
              />
              {/* Preview slug */}
              {companyName && (
                <p className="mt-2 pl-1 text-sm text-white/40">
                  URL will be:{" "}
                  <span className="text-emerald-400 font-mono">
                    /site/{companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
                  </span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !companyName.trim()}
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-base font-semibold text-black transition hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              {loading ? "Creating…" : "Create Site"}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-5">
              <p className="text-sm font-semibold text-emerald-400 mb-3">
                ✅ Site created successfully!
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={success.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition"
                >
                  <Globe className="h-4 w-4" />
                  View Website
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
                <Link
                  to={`/admin/edit/${success.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
                >
                  <Pencil className="h-4 w-4" />
                  Edit Site
                </Link>
              </div>
              <p className="mt-3 font-mono text-xs text-white/40 break-all">
                {window.location.origin}{success.siteUrl}
              </p>
            </div>
          )}
        </section>

        {/* ── Existing sites ── */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">All Websites</h2>

          {sitesLoading ? (
            <div className="flex items-center gap-3 text-white/40">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
              <span className="text-sm">Loading sites…</span>
            </div>
          ) : sites.length === 0 ? (
            <div className="rounded-2xl border border-white/8 bg-white/4 px-6 py-10 text-center">
              <p className="text-white/40">No websites yet. Create your first one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sites.map((site) => (
                <div
                  key={site._id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/4 px-5 py-4 transition hover:bg-white/6"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">
                      {site.branding?.companyName || site.slug}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-white/40 truncate">
                      /site/{site.slug}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={`/site/${site.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View website"
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-white/60 transition hover:bg-white/12 hover:text-white"
                    >
                      <Globe className="h-4 w-4" />
                    </a>

                    <Link
                      to={`/admin/edit/${site.slug}`}
                      title="Edit site"
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-white/60 transition hover:bg-emerald-500/20 hover:text-emerald-400"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>

                    <button
                      onClick={() => handleDelete(site.slug, site.branding?.companyName)}
                      title="Delete site"
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-white/60 transition hover:bg-red-500/20 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
