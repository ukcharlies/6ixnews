export interface IStory {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category:
    | string
    | {
        category_id: number;
        category_name: string;
        total_stories: number;
        created_at: string;
        updated_at: string;
      };
  imageUrl: string;
}

export interface ICategory {
  id: number;
  name: string;
}
