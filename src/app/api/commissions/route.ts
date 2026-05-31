import { NextResponse } from 'next/server';

const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, artwork_type, dimensions, budget, message } = body;

    if (!name || !email || !country || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Simulate standard studio slow delay (800ms) for high-end organic feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log('Commission Inquiry Received (Saving to Google Sheets):', {
      name,
      email,
      phone,
      country,
      artwork_type,
      dimensions,
      budget,
      message,
    });

    if (googleSheetsUrl) {
      try {
        const response = await fetch(googleSheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'commission',
            name,
            email,
            phone: phone || '',
            country,
            artwork_type,
            dimensions,
            budget,
            message,
            created_at: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          console.error('Google Sheets POST error status:', response.status);
        } else {
          const resData = await response.json();
          if (resData.success) {
            console.log('Successfully saved to Google Sheets');
          } else {
            console.error('Google Sheets save error message:', resData.error);
          }
        }
      } catch (postErr) {
        console.error('Failed to post to Google Sheets Web App:', postErr);
      }
    } else {
      console.log('Simulated saving to Google Sheets: process.env.GOOGLE_SHEETS_WEBAPP_URL is not configured.');
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' });
  } catch (err: any) {
    console.error('API Commission Route Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
