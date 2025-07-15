export interface ICategory {
  id: number;
  name: string;
}

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

export interface IApiResponse<T> {
  data: T;
  message: string;
  status: number;
}
