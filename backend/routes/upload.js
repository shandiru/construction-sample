import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Upload directory setup ─────────────────────────────────────────────────
const uploadDir = path.join(__dirname, "..", "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ── Multer config ──────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 40);
    const unique = `${base}-${Date.now()}${ext}`;
    cb(null, unique);
  },
});

const ALLOWED_MIME = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  // Videos
  "video/mp4",
  "video/webm",
  "video/ogg",
];

const fileFilter = (_req, file, cb) => {
  if (ALLOWED_MIME.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type. Allowed: JPEG, PNG, WEBP, GIF, SVG, MP4, WEBM, OGG"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max
});

// ── POST /api/upload ───────────────────────────────────────────────────────
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({
    url,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

// ── Error handler for multer ───────────────────────────────────────────────
router.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message });
});

export default router;
