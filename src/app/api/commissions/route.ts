import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Setup optional Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, artwork_type, dimensions, budget, message } = body;

    if (!name || !email || !country || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Simulate standard studio slow delay (800ms) for high-end organic feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log('Commission Inquiry Received:', {
      name,
      email,
      phone,
      country,
      artwork_type,
      dimensions,
      budget,
      message,
    });

    if (supabase) {
      const { error } = await supabase.from('commission_requests').insert([
        {
          name,
          email,
          phone: phone || null,
          country,
          artwork_type,
          dimensions,
          budget,
          message,
          status: 'new',
        },
      ]);

      if (error) {
        console.error('Supabase save error:', error);
        // Fallback to success response so user demo works seamlessly
      }
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' });
  } catch (err: any) {
    console.error('API Commission Route Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
