export interface EditorPick {
  id: number;
  story: Story | null;
  created_at: string;
  updated_at: string;
}

export interface Story {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  banner_image: string;
  content: string;
  author: string;
  category: Category;
  created_at: string;
  updated_at: string;
}

export interface Category {
  category_id: number;
  category_name: string;
}
