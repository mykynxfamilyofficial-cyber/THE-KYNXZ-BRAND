import { Resend } from 'resend'

/** Shape of validated contact form data passed from the API route. */
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * Validates that RESEND_API_KEY is configured.
 * Logs a warning if missing but does not throw — allows contact form
 * to function even without email forwarding configured.
 */
function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn(
      '[EMAIL] RESEND_API_KEY is not set. Contact form submissions will ' +
        'still be saved to Sanity but will NOT be forwarded via email.\n' +
        '  → Set RESEND_API_KEY in .env.local\n' +
        '  → Get a key at https://resend.com/api-keys'
    )
    return null
  }
  return new Resend(key)
}

/**
 * Sends a contact form submission notification to the brand's support email.
 *
 * This is a non-critical side-effect — if sending fails, we log the error
 * but do NOT throw, so the caller can continue (the submission is already
 * saved to Sanity at that point).
 *
 * @param data - Validated contact form data from the API route.
 */
export async function sendContactEmail(data: ContactFormData) {
  const resend = getResendClient()
  if (!resend) return

  const { name, email, subject, message } = data
  const formattedDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  try {
    const { error } = await resend.emails.send({
      from: 'KYNXZ Contact <onboarding@resend.dev>',
      to: ['support@thekynxzbrand.store'],
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#f5f3f0;font-family:Georgia,'Times New Roman',serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f3f0;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1a1a1a,#2d2d2d);padding:32px 40px 24px;border-radius:12px 12px 0 0;text-align:center;">
                      <h1 style="margin:0;font-size:14px;letter-spacing:4px;text-transform:uppercase;color:#d4a84f;font-weight:400;">The KYNXZ BRAND</h1>
                      <p style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:600;letter-spacing:1px;">New Contact Inquiry</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="background-color:#ffffff;padding:36px 40px;border-left:1px solid #e8e4de;border-right:1px solid #e8e4de;">

                      <!-- Timestamp -->
                      <p style="margin:0 0 28px;font-size:12px;color:#99948c;letter-spacing:0.5px;text-transform:uppercase;">
                        Received ${formattedDate}
                      </p>

                      <!-- Sender Details -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                        <tr>
                          <td style="padding-bottom:16px;">
                            <p style="margin:0 0 4px;font-size:10px;color:#b8a99a;letter-spacing:2px;text-transform:uppercase;">From</p>
                            <p style="margin:0;font-size:16px;color:#1a1a1a;font-weight:600;">${escapeHtml(name)}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:16px;">
                            <p style="margin:0 0 4px;font-size:10px;color:#b8a99a;letter-spacing:2px;text-transform:uppercase;">Email</p>
                            <p style="margin:0;font-size:14px;color:#555555;">
                              <a href="mailto:${escapeHtml(email)}" style="color:#d4a84f;text-decoration:none;">${escapeHtml(email)}</a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p style="margin:0 0 4px;font-size:10px;color:#b8a99a;letter-spacing:2px;text-transform:uppercase;">Subject</p>
                            <p style="margin:0;font-size:14px;color:#1a1a1a;font-weight:500;">${escapeHtml(subject)}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Divider -->
                      <div style="height:1px;background:linear-gradient(to right,#d4a84f 0%,#e8e4de 60%,transparent 100%);margin-bottom:24px;"></div>

                      <!-- Message -->
                      <p style="margin:0 0 12px;font-size:10px;color:#b8a99a;letter-spacing:2px;text-transform:uppercase;">Message</p>
                      <div style="background-color:#faf8f6;border-radius:8px;padding:20px 24px;border:1px solid #e8e4de;">
                        <p style="margin:0;font-size:15px;color:#333333;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
                      </div>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color:#1a1a1a;padding:20px 40px;border-radius:0 0 12px 12px;text-align:center;">
                      <p style="margin:0;font-size:11px;color:#99948c;letter-spacing:1px;">
                        This email was sent from the KYNXZ BRAND contact form.
                        <br>
                        <span style="color:#d4a84f;">support@thekynxzbrand.store</span>
                      </p>
                      <p style="margin:6px 0 0;font-size:10px;color:#666666;">
                        Reply directly to this email to respond to ${escapeHtml(name)}.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Resend send error:', error)
    } else {
    }
  } catch (err) {
    console.error('[EMAIL] Failed to send notification email:', err)
  }
}

/**
 * Minimal HTML-entity escape to prevent injection in email templates.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
