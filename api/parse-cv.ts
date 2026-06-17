/**
 * parse-cv — turns raw CV text into a structured candidate profile using an
 * NVIDIA NIM model (OpenAI-compatible). Accepts already-extracted text so it
 * works on any host without a PDF toolchain; the client extracts text from the
 * uploaded file (or the candidate pastes it). NVIDIA_API_KEY stays server-side.
 *
 * POST { text: string }
 *  -> { profile: { fullName, headlineRole, summary, skills[], experience[], education[], yearsExperience } }
 */

const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = process.env.NVIDIA_MODEL || "meta/llama-3.3-70b-instruct";

const INSTRUCTION = `You extract a structured profile from a CV. Return STRICT JSON only (no prose, no markdown fences) with this exact shape:
{
  "fullName": string,
  "headlineRole": string,
  "summary": string,            // 1-2 sentences, factual, no embellishment
  "skills": string[],           // concrete skills/tools, max 15
  "experience": [{ "title": string, "company": string, "period": string }],
  "education": [{ "qualification": string, "institution": string }],
  "yearsExperience": number
}
If a field is unknown, use an empty string, empty array, or 0. Do not invent employers, dates, or qualifications.`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "AI is not configured (missing NVIDIA_API_KEY)." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const text = typeof body?.text === "string" ? body.text.slice(0, 12000) : "";
    if (!text.trim()) {
      res.status(400).json({ error: "No CV text provided." });
      return;
    }

    const upstream = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: INSTRUCTION },
          { role: "user", content: `CV TEXT:\n${text}` },
        ],
        temperature: 0.1,
        max_tokens: 800,
        response_format: { type: "json_object" },
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("NVIDIA NIM error", upstream.status, detail);
      res.status(502).json({ error: "Upstream AI error" });
      return;
    }

    const data = await upstream.json();
    const raw = data?.choices?.[0]?.message?.content?.trim() || "{}";
    let profile: unknown;
    try {
      profile = JSON.parse(raw);
    } catch {
      // strip any stray code fences and retry
      profile = JSON.parse(raw.replace(/^```(json)?/i, "").replace(/```$/, "").trim());
    }
    res.status(200).json({ profile });
  } catch (err: any) {
    console.error("parse-cv handler error", err);
    res.status(500).json({ error: "Internal error" });
  }
}
