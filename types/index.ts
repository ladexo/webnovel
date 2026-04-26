export interface Novel {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  author: string;
  genre: string;
  status: 'ongoing' | 'completed' | 'hiatus';
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  novel_id: string;
  title: string;
  chapter_number: number;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  chapter_id: string;
  page_number: number;
  image_url: string;
  created_at: string;
}
