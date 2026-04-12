import crypto from "crypto";
import {
  createSanityReadClient,
  createSanityWriteClient,
  loadSanityEnv,
} from "./lib/sanity-page-guards.mjs";

const WRITE_MODE = process.argv.includes("--write");

function key(prefix = "key") {
  return `${prefix}-${crypto.randomUUID()}`;
}

function splitClientLabel(label = "") {
  const trimmed = `${label}`.trim();
  if (!trimmed) return { name: "", role: "" };
  const [name, ...rest] = trimmed.split(" - ");
  return {
    name: name?.trim() || trimmed,
    role: rest.join(" - ").trim(),
  };
}

function normalizeTestimonials(items = []) {
  const normalized = items
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      if (item.name && item.quote) {
        return {
          _type: "templateTestimonial",
          _key: item._key || key("testi"),
          name: `${item.name}`.trim(),
          role: `${item.role || ""}`.trim(),
          quote: `${item.quote || ""}`.trim(),
        };
      }

      if (item.client && item.quote) {
        const { name, role } = splitClientLabel(item.client);
        return {
          _type: "templateTestimonial",
          _key: item._key || key("testi"),
          name,
          role,
          quote: `${item.quote || ""}`.trim(),
        };
      }

      return null;
    })
    .filter(Boolean)
    .filter((item) => item.name && item.quote);

  return normalized.length > 0 ? normalized : null;
}

function normalizeCtaLinks(items = []) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return items
    .slice(0, 2)
    .map((item) => ({
      ...item,
      _key: item?._key || key("cta"),
    }));
}

function compactStructured(structured = {}) {
  const next = { ...structured };

  if ("testimonials" in next) {
    next.testimonials = normalizeTestimonials(next.testimonials || []);
  }

  if ("ctaLinks" in next) {
    next.ctaLinks = normalizeCtaLinks(next.ctaLinks || []);
  }

  const cleaned = Object.fromEntries(
    Object.entries(next).filter(([, value]) => {
      if (value == null) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }),
  );

  return cleaned;
}

async function main() {
  await loadSanityEnv();
  const readClient = await createSanityReadClient();
  const writeClient = WRITE_MODE ? await createSanityWriteClient() : null;

  const docs = await readClient.fetch(
    `*[_type in ["pageLocation","serviceLocation"] && defined(template)]{_id,_type,title,route,structured}`
  );

  const candidates = docs
    .map((doc) => {
      const original = doc.structured || {};
      const normalized = compactStructured(original);
      const before = JSON.stringify(original);
      const after = JSON.stringify(normalized);
      return {
        _id: doc._id,
        _type: doc._type,
        title: doc.title,
        route: doc.route,
        changed: before !== after,
        normalized,
      };
    })
    .filter((doc) => doc.changed);

  console.log(`Found ${candidates.length} template override docs to normalize.`);
  candidates.forEach((doc) => {
    console.log(`- ${doc._id} ${doc.route || "(pattern-based route)"}`);
  });

  if (!WRITE_MODE) {
    console.log("Dry run only. Re-run with --write to patch Sanity.");
    return;
  }

  for (const doc of candidates) {
    await writeClient.patch(doc._id).set({ structured: doc.normalized }).commit();
  }

  console.log(`Patched ${candidates.length} docs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
