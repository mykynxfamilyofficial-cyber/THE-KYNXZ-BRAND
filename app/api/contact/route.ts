import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'
import { sendContactEmail } from '@/lib/email'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

/**
 * POST /api/contact
 *
 * Accepts contact form submissions.
 *
 * Flow:
 *  1. Validate required fields and email format.
 *  2. Save the submission to Sanity as a contactSubmission document.
 *  3. Forward a notification email to support@thekynxzbrand.store via Resend.
 *     (Email failure is non-blocking — the submission is already saved.)
 *  4. Return a success response.
 *  5. If Sanity save fails, return an error.
 */
export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()

    const { name, email, subject, message } = body

    // ── Validate required fields ──────────────────────────────
    const missing: string[] = []
    if (!name?.trim()) missing.push('name')
    if (!email?.trim()) missing.push('email')
    if (!subject?.trim()) missing.push('subject')
    if (!message?.trim()) missing.push('message')

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    // ── Basic email format validation ─────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // ── Save submission to Sanity ──────────────────────────────
    const createdAt = new Date().toISOString()

    try {
      const sanityDoc = await writeClient.create({
        _type: 'contactSubmission',
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt,
        status: 'new',
      })

    } catch (sanityError) {
      return NextResponse.json(
        { error: 'Failed to process your message. Please try again later.' },
        { status: 500 }
      )
    }

    // ── Forward notification email (non-blocking) ─────────────
    console.log('[CONTACT API] Forwarding notification email...')
    await sendContactEmail({ name, email, subject, message })
    console.log('[CONTACT API] Email forwarding complete')

    // ── Success response ──────────────────────────────────────
    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for reaching out. We have received your message and will respond within 24 hours.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[CONTACT API ERROR]', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again later.' },
      { status: 500 }
    )
  }
}
