// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ContactForm } from '@/types';

// Configure for Edge Runtime (required for Cloudflare Pages)
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For Edge Runtime compatibility, we'll use a webhook or external service
    // This is a placeholder - you can integrate with services like:
    // - Formspree, Netlify Forms, EmailJS, or similar
    // - Or use Cloudflare Workers email sending
    
    console.log('Contact form submission:', { name, email, message });
    
    // Simulate successful form submission
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}