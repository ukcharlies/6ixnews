export type StoryType = "article" | "video" | "gallery" | "audio";

export interface IStory {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  type: StoryType;
  author: string;
  content: string;
  featured: string;
  views: number;
  editors_pick: string | null;
  top_story: string | null;
  category: {
    category_id: number;
    category_name: string;
    total_stories: number | null;
    created_at: string;
    updated_at: string;
  };
  banner_image: string;
  created_at: string;
  updated_at: string;
  bookmarked?: boolean; // Add this property
}

export interface ICategory {
  id: number;
  name: string;
}

export type Story = IStory;
