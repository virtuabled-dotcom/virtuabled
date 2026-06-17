/**
 * Generates the static hero poster fallbacks (reduced-motion / no-WebGL) with
 * Google "Nano Banana" image models, on the Virtuabled palette.
 * Run: node scripts/gen-hero-posters.mjs
 */
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { writeFileSync, existsSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "images");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No GEMINI_API_KEY in env — skipping generation.");
  process.exit(0);
}

const ai = new GoogleGenAI({ apiKey });

const PALETTE =
  "deep navy #0B132B background, teal #14B8A6 and amber #F59E0B accents, dark, premium, cinematic, soft volumetric glow, subtle bloom, high detail, no text, no logos";

const POSTERS = [
  {
    file: "hero-strand.jpg",
    prompt: `Abstract 3D render of a glowing DNA-like double helix strand turning in dark space, energy flowing along it, some segments breaking apart into floating fragments that recolour from teal to amber. ${PALETTE}`,
  },
  {
    file: "hero-spine.jpg",
    prompt: `Abstract 3D render of a stylised human spinal column standing upright, anatomical vertebrae with glowing energy discs of light between each vertebra, rising and healing, hopeful and strong. ${PALETTE}`,
  },
  {
    file: "hero-flow.jpg",
    prompt: `Abstract flowing aurora / liquid light field, soft ribbons of energy drifting, smooth gradient waves. ${PALETTE}`,
  },
];

// candidate image-capable models, newest first ("Nano Banana 2" → Gemini 3 image)
const MODELS = [
  "gemini-3-pro-image-preview",
  "gemini-2.5-flash-image",
  "gemini-2.0-flash-preview-image-generation",
];

function extractImage(res) {
  const parts = res?.candidates?.[0]?.content?.parts ?? [];
  for (const p of parts) {
    if (p.inlineData?.data) return p.inlineData.data;
  }
  return null;
}

async function generate(prompt) {
  for (const model of MODELS) {
    try {
      const res = await ai.models.generateContent({ model, contents: prompt });
      const b64 = extractImage(res);
      if (b64) return { b64, model };
    } catch (e) {
      console.warn(`  model ${model} failed: ${e?.message || e}`);
    }
  }
  return null;
}

let ok = 0;
for (const { file, prompt } of POSTERS) {
  const dest = join(OUT, file);
  process.stdout.write(`Generating ${file}... `);
  const out = await generate(prompt);
  if (out) {
    writeFileSync(dest, Buffer.from(out.b64, "base64"));
    console.log(`done (${out.model})`);
    ok++;
  } else {
    // safe fallback so the <img> never 404s
    const fallback = join(OUT, "hero-workspace.jpeg");
    if (existsSync(fallback) && !existsSync(dest)) {
      copyFileSync(fallback, dest);
      console.log("generation unavailable — copied hero-workspace.jpeg as placeholder");
    } else {
      console.log("generation unavailable — left existing file");
    }
  }
}
console.log(`\n${ok}/${POSTERS.length} posters generated via model API.`);
