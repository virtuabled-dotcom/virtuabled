import type { VercelRequest, VercelResponse } from "@vercel/node";

interface ApplyBody {
  id: string;
  fullName: string;
  email: string;
  role: string;
  skills: string;
  disabilityType: string;
  natureOfDisability: string;
  videoRecorded: boolean;
  videoDurationSec: number | null;
  cvParsed: boolean;
  submittedAt: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as ApplyBody;
  const { id, fullName, email, role, skills, disabilityType, natureOfDisability, videoRecorded, videoDurationSec, cvParsed, submittedAt } = body;

  if (!fullName || !email || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const submittedDate = new Date(submittedAt).toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" });

  // --- Email 1: Team notification ---
  const teamHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0C1832; color: #F4F7FB; padding: 32px; border-radius: 12px;">
      <h1 style="color: #18B0AD; font-size: 22px; margin-bottom: 4px;">New Candidate Application</h1>
      <p style="color: #8899BB; font-size: 13px; margin-bottom: 32px;">Submitted ${submittedDate} via virtuabled.com/apply</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">Reference ID</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F79532; font-weight: bold;">${id}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Full Name</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${fullName}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;"><a href="mailto:${email}" style="color: #18B0AD;">${email}</a></td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Role Applied For</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${role}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Disability Type</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${disabilityType || "—"}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Accommodation Needs</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${natureOfDisability || "—"}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Skills</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${skills || "—"}</td></tr>
        <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Video Intro</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; color: #F4F7FB;">${videoRecorded ? `Yes (${videoDurationSec}s)` : "No"}</td></tr>
        <tr><td style="padding: 10px 0; color: #8899BB; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">CV Parsed</td><td style="padding: 10px 0; font-size: 14px; color: #F4F7FB;">${cvParsed ? "Yes" : "No"}</td></tr>
      </table>

      <div style="margin-top: 32px; padding: 16px; background: rgba(24,176,173,0.1); border: 1px solid rgba(24,176,173,0.25); border-radius: 8px;">
        <p style="margin: 0; font-size: 12px; color: #8899BB;">Reply directly to <strong style="color: #F4F7FB;">${email}</strong> to follow up with this candidate.</p>
      </div>
    </div>
  `;

  // --- Email 2: Candidate confirmation ---
  const candidateHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0C1832; color: #F4F7FB; padding: 32px; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; background: rgba(24,176,173,0.15); border: 1px solid rgba(24,176,173,0.3); border-radius: 12px; padding: 16px 24px; margin-bottom: 24px;">
          <span style="font-size: 28px;">✓</span>
        </div>
        <h1 style="color: #F4F7FB; font-size: 24px; font-weight: 300; margin: 0 0 8px;">Application Received</h1>
        <p style="color: #8899BB; font-size: 14px; margin: 0;">We've got your profile, ${fullName.split(' ')[0]}.</p>
      </div>

      <div style="background: rgba(247,149,50,0.1); border: 1px solid rgba(247,149,50,0.3); border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
        <p style="margin: 0 0 4px; font-size: 11px; color: #8899BB; text-transform: uppercase; letter-spacing: 0.1em;">Your Reference Number</p>
        <p style="margin: 0; font-size: 22px; font-weight: bold; color: #F79532; letter-spacing: 0.05em;">${id}</p>
      </div>

      <h2 style="color: #18B0AD; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">What Happens Next</h2>
      <ol style="padding-left: 20px; color: #8899BB; font-size: 14px; line-height: 2;">
        <li>Our team reviews your profile within <strong style="color: #F4F7FB;">2–3 business days</strong></li>
        <li>We match your profile against active employer opportunities</li>
        <li>A Virtuabled placement consultant will contact you at this email to discuss next steps</li>
        <li>If shortlisted, you'll be invited to a brief video call with the employer</li>
      </ol>

      <div style="margin-top: 32px; padding: 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #8899BB;">Questions? Email us at <a href="mailto:hello@virtuabled.com" style="color: #18B0AD;">hello@virtuabled.com</a></p>
        <p style="margin: 0; font-size: 11px; color: #4B5563;">Please keep your reference number <strong style="color: #F79532;">${id}</strong> for any correspondence.</p>
      </div>

      <p style="margin-top: 32px; font-size: 11px; color: #374151; text-align: center;">Virtuabled Pty Ltd · <a href="https://www.virtuabled.com" style="color: #18B0AD;">virtuabled.com</a> · Where Disability Meets Opportunity</p>
    </div>
  `;

  try {
    const [teamRes, candidateRes] = await Promise.all([
      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "Virtuabled Applications", email: "hello@virtuabled.com" },
          to: [{ email: "hello@virtuabled.com", name: "Virtuabled Team" }],
          replyTo: { email, name: fullName },
          subject: `New Application: ${fullName} — ${role} [${id}]`,
          htmlContent: teamHtml,
        }),
      }),
      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "Virtuabled", email: "hello@virtuabled.com" },
          to: [{ email, name: fullName }],
          subject: `Application Received — Your Reference: ${id}`,
          htmlContent: candidateHtml,
        }),
      }),
    ]);

    if (!teamRes.ok || !candidateRes.ok) {
      console.error("Brevo send error:", await teamRes.text(), await candidateRes.text());
      return res.status(500).json({ error: "Failed to send emails" });
    }

    return res.status(200).json({ ok: true, id });
  } catch (err) {
    console.error("apply handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
