import type { VercelRequest, VercelResponse } from "@vercel/node";

interface RequestAccessBody {
  companyName: string;
  fullName: string;
  workEmail: string;
  phone: string;
  employeeCount: string;
  primaryNeed: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { companyName, fullName, workEmail, phone, employeeCount, primaryNeed } =
    req.body as RequestAccessBody;

  if (!companyName || !fullName || !workEmail) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0C1832; color: #F4F7FB; padding: 32px; border-radius: 12px;">
      <h1 style="color: #18B0AD; font-size: 22px; margin-bottom: 4px;">New Employer Access Request</h1>
      <p style="color: #8899BB; font-size: 13px; margin-bottom: 32px;">Submitted via virtuabled.com/employer-portal</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${companyName}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Contact</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${fullName}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Work Email</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;"><a href="mailto:${workEmail}" style="color: #18B0AD;">${workEmail}</a></td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${phone || "—"}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Employees</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${employeeCount || "—"}</td></tr>
        <tr><td style="padding: 10px 0; color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Primary Need</td><td style="padding: 10px 0; font-size: 14px; color: #F79532; font-weight: bold;">${primaryNeed || "—"}</td></tr>
      </table>

      <div style="margin-top: 32px; padding: 16px; background: rgba(24,176,173,0.1); border: 1px solid rgba(24,176,173,0.25); border-radius: 8px;">
        <p style="margin: 0; font-size: 12px; color: #8899BB;">Reply directly to <strong style="color: #F4F7FB;">${workEmail}</strong> to follow up.</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Virtuabled Portal", email: "hello@virtuabled.com" },
        to: [{ email: "partners@virtuabled.com", name: "Virtuabled Partners" }],
        replyTo: { email: workEmail, name: fullName },
        subject: `Employer Access Request — ${companyName}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Brevo error:", err);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("request-access error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
