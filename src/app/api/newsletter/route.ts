import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Simulate delay for high-end feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    console.log('Newsletter Subscription:', email);

    if (supabase) {
      const { error } = await supabase.from('newsletter_subscribers').insert([
        { email },
      ]);

      if (error) {
        console.error('Supabase newsletter save error:', error);
        if (error.code === '23505') {
          // Unique key violation (already subscribed)
          return NextResponse.json({ success: true, message: 'Already subscribed' });
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (err: any) {
    console.error('API Newsletter Route Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
