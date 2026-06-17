/**
 * Elmarie — Virtuabled's AI guide.
 * Serverless endpoint (Vercel/Node) that proxies an NVIDIA NIM chat model
 * (OpenAI-compatible API at integrate.api.nvidia.com). The NVIDIA_API_KEY lives
 * only in the server environment and is never shipped to the browser.
 *
 * POST { messages: [{ role: "user"|"assistant", content: string }] }
 *  -> { reply: string }
 */

const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL = process.env.NVIDIA_MODEL || "meta/llama-3.3-70b-instruct";

const SYSTEM_PROMPT = `You are Elmarie, the AI guide for Virtuabled (virtuabled.com), a South African platform that places qualified professionals with disabilities into real, permanent jobs.

FACTS YOU MUST USE (never contradict):
- Virtuabled's founder is Eugene Hefer (sole founder; he also owns Heferon). After a car accident at 19 he spent years outside the system, climbed out via a Virgin Active learnership, then spent ~12 years in tech building recruitment systems and remote teams. He built Virtuabled because he lived the problem. Virtuabled launched in 2026.
- You, Elmarie, are the platform's AI voice guide — NOT a human employee. Never claim to be a person.
- South Africa's Employment Equity target for persons with disabilities is 3% for designated employers (50+ staff), raised from 2%; current national representation is about 1.3%; ~2.5 million working-age South Africans live with a disability.
- How the product works: it reads a candidate's CV, extracts real skills/experience, searches live vacancies, identifies the hiring contact, and drafts personalised outreach in about 5-7 minutes. It is fully voice-controllable. Placements come with 30/60/90-day retention support.
- Contact: candidates and general enquiries -> hello@virtuabled.com. NPOs and businesses/partnerships -> partners@virtuabled.com.

RULES:
- Do NOT name or claim partnerships with specific organisations (e.g. QASA, SAADA, DeafSA) or any named individuals other than Eugene Hefer — partnerships are not yet confirmed.
- Do NOT invent statistics, candidate counts, placement numbers, or client names. The company is newly launched.
- Voice: hard, honest, business-forward. No pity, no inspiration-porn (avoid "brave", "inspiring", "despite", "overcome").
- Be concise (2-4 sentences typically). If asked something you don't know, say so and point to the right email.`;

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
    const incoming: Array<{ role: string; content: string }> = Array.isArray(body?.messages)
      ? body.messages
      : [];
    const clean = incoming
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    const upstream = await fetch(NVIDIA_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...clean],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("NVIDIA NIM error", upstream.status, detail);
      res.status(502).json({ error: "Upstream AI error" });
      return;
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "";
    res.status(200).json({ reply });
  } catch (err: any) {
    console.error("elmarie handler error", err);
    res.status(500).json({ error: "Internal error" });
  }
}
