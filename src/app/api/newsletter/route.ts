import { NextResponse } from 'next/server';

const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Simulate delay for high-end feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    console.log('Newsletter Subscription (Saving to Google Sheets):', email);

    if (googleSheetsUrl) {
      try {
        const response = await fetch(googleSheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'newsletter',
            email,
            created_at: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          console.error('Google Sheets POST error status:', response.status);
        } else {
          const resData = await response.json();
          if (resData.success) {
            console.log('Successfully saved newsletter subscriber to Google Sheets');
          } else {
            console.error('Google Sheets save error message:', resData.error);
          }
        }
      } catch (postErr) {
        console.error('Failed to post newsletter subscription to Google Sheets Web App:', postErr);
      }
    } else {
      console.log('Simulated newsletter saving to Google Sheets: process.env.GOOGLE_SHEETS_WEBAPP_URL is not configured.');
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (err) {
    const error = err as Error;
    console.error('API Newsletter Route Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
