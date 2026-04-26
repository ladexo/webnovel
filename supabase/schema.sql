-- Create novels table
CREATE TABLE IF NOT EXISTS novels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'Unknown',
  genre TEXT NOT NULL DEFAULT 'Fantasy',
  status TEXT NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'hiatus')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  novel_id UUID REFERENCES novels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  chapter_number INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_chapters_novel_id ON chapters(novel_id);
CREATE INDEX idx_pages_chapter_id ON pages(chapter_id);
CREATE INDEX idx_novels_slug ON novels(slug);

-- Enable RLS
ALTER TABLE novels ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read novels" ON novels FOR SELECT USING (true);
CREATE POLICY "Public read chapters" ON chapters FOR SELECT USING (true);
CREATE POLICY "Public read pages" ON pages FOR SELECT USING (true);

-- Full access policies (for admin - uses service role key which bypasses RLS, but these are fallback)
CREATE POLICY "Full access novels" ON novels FOR ALL USING (true);
CREATE POLICY "Full access chapters" ON chapters FOR ALL USING (true);
CREATE POLICY "Full access pages" ON pages FOR ALL USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('novel-images', 'novel-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'novel-images');
CREATE POLICY "Upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'novel-images');
CREATE POLICY "Delete images" ON storage.objects FOR DELETE USING (bucket_id = 'novel-images');
