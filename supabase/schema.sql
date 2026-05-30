-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define Custom Enum for Commission Status Mapping
CREATE TYPE commission_status AS ENUM (
  'new',
  'contacted',
  'consultation',
  'proposal',
  'deposit_paid',
  'in_progress',
  'completed',
  'cancelled'
);

-- Define Custom Enum for Artwork Category Mapping
CREATE TYPE artwork_category AS ENUM (
  'silk-painting',
  'sculptural-painting',
  'buddhist-art',
  'commissioned'
);

-- ----------------------------------------------------
-- 1. Commission Requests Table
-- ----------------------------------------------------
CREATE TABLE IF NOT EXISTS commission_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100) NOT NULL,
  artwork_type artwork_category NOT NULL,
  dimensions VARCHAR(255) NOT NULL,
  budget VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  inspiration_images TEXT[] DEFAULT '{}',
  status commission_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Indices for rapid dashboard filtering
CREATE INDEX IF NOT EXISTS idx_commission_status ON commission_requests(status);
CREATE INDEX IF NOT EXISTS idx_commission_email ON commission_requests(email);

-- ----------------------------------------------------
-- 2. Newsletter Subscribers Table
-- ----------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index on email for rapid lookup matches
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- ----------------------------------------------------
-- 3. Contact Messages Table
-- ----------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index on contact email
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_messages(email);

-- ----------------------------------------------------
-- Row Level Security (RLS) Policies
-- Protects data access inside Supabase
-- ----------------------------------------------------

-- Commission Requests RLS
ALTER TABLE commission_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public anonymous insert to commissions" 
  ON commission_requests 
  FOR INSERT 
  WITH CHECK (true); -- Public visitors can submit commission inquiries

CREATE POLICY "Allow authenticated staff complete access to commissions" 
  ON commission_requests 
  USING (auth.role() = 'authenticated'); -- Protected administrative view

-- Newsletter Subscribers RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public anonymous signup to newsletter" 
  ON newsletter_subscribers 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated staff to view newsletter lists" 
  ON newsletter_subscribers 
  USING (auth.role() = 'authenticated');

-- Contact Messages RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public anonymous contact form submission" 
  ON contact_messages 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated staff to read contact submissions" 
  ON contact_messages 
  USING (auth.role() = 'authenticated');
