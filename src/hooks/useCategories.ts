"use client";

import { useQuery } from "@tanstack/react-query";

interface CategoryAPIResponse {
  category_id: number;
  category_name: string;
  total_stories: number;
  created_at: string;
  updated_at: string;
}

interface APIResponse {
  message: string;
  data: {
    data: CategoryAPIResponse[];
  };
}

export interface Category {
  id: number;
  name: string;
  totalStories: number;
}

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    "https://api.agcnewsnet.com/api/general/categories"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result: APIResponse = await response.json();

  // Transform API response to match our interface
  return result.data.data.map((category) => ({
    id: category.category_id,
    name: category.category_name,
    totalStories: category.total_stories,
  }));
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};
