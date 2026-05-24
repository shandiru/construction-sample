import axios from "axios";

const API_ORIGIN = "https://mern-site-builder.onrender.com";
const API_BASE = `${API_ORIGIN}/api`;

export const getMediaUrl = (url) => {
  if (!url) return "";
  if (/^(https?:)?\/\//i.test(url) || url.startsWith("data:") || url.startsWith("blob:")) {
    return url;
  }
  return url.startsWith("/uploads") ? `${API_ORIGIN}${url}` : url;
};

export const sitesApi = {
  // Create a new site
  create: async (companyName) => {
    const res = await axios.post(`${API_BASE}/sites`, { companyName });
    return res.data;
  },

  // Get all sites (for admin list)
  getAll: async () => {
    const res = await axios.get(`${API_BASE}/sites`);
    return res.data;
  },

  // Get a site by slug
  getBySlug: async (slug) => {
    const res = await axios.get(`${API_BASE}/sites/${slug}`);
    return res.data;
  },

  // Full update
  update: async (slug, data) => {
    const res = await axios.put(`${API_BASE}/sites/${slug}`, data);
    return res.data;
  },

  // Partial update (single section)
  patch: async (slug, data) => {
    const res = await axios.patch(`${API_BASE}/sites/${slug}`, data);
    return res.data;
  },

  // Delete
  delete: async (slug) => {
    const res = await axios.delete(`${API_BASE}/sites/${slug}`);
    return res.data;
  },
};

// ── Upload a file (image or video) ────────────────────────────────────────
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // { url, filename, mimetype, size }
};
