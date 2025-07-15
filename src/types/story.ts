export interface IStory {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

export interface ICategory {
  id: number;
  name: string;
}
