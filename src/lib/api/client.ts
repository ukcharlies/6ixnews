import { IStory, ICategory } from "@/types/story";
import { IApiResponse } from "@/types/api";

const API_BASE = "https://api.agcnewsnet.com/api/general";

// Generic API function with error handling
async function apiCall<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// Category endpoints
export const fetchCategories = async (): Promise<ICategory[]> => {
  const response = await apiCall<any>("/categories");
  // Handle different response formats
  return Array.isArray(response) ? response : response.data || [];
};

// Story endpoints
export const fetchTopStories = async (): Promise<IStory[]> => {
  const response = await apiCall<any>("/top-stories");
  return Array.isArray(response) ? response : response.data || [];
};

export const fetchEditorsPicks = async (
  page = 1,
  perPage = 15
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/editor-picks?page=${page}&per_page=${perPage}`
  );
  return Array.isArray(response) ? response : response.data || [];
};

export const fetchFeaturedStories = async (
  page = 1,
  perPage = 15
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/stories/featured-stories?page=${page}&per_page=${perPage}`
  );
  return Array.isArray(response) ? response : response.data || [];
};

export const fetchLatestStories = async (
  page = 1,
  perPage = 7
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/stories/latest-stories?page=${page}&per_page=${perPage}`
  );
  return Array.isArray(response) ? response : response.data || [];
};

export const fetchMissedStories = async (
  page = 1,
  perPage = 5
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/stories/missed-stories?page=${page}&per_page=${perPage}`
  );
  return Array.isArray(response) ? response : response.data || [];
};

export const fetchCategoryStories = async (
  categoryId: number,
  page = 1,
  perPage = 15
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/categories/${categoryId}/stories?page=${page}&per_page=${perPage}`
  );
  return Array.isArray(response) ? response : response.data || [];
};

export const fetchSingleStory = async (storyId: number): Promise<IStory> => {
  const response = await apiCall<any>(`/stories/${storyId}`);
  return response.data || response;
};
