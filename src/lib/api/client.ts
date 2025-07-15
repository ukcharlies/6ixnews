import { IStory, ICategory } from "@/types/story";
import { IApiResponse } from "@/types/api";

const API_BASE = "https://api.agcnewsnet.com/api/general";

// Generic API function with error handling
async function apiCall<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// Category endpoints
export const fetchCategories = async (): Promise<ICategory[]> => {
  return apiCall<ICategory[]>("/categories");
};

// Story endpoints
export const fetchTopStories = async (): Promise<IStory[]> => {
  return apiCall<IStory[]>("/top-stories");
};

export const fetchEditorsPicks = async (
  page = 1,
  perPage = 15
): Promise<IApiResponse<IStory[]>> => {
  return apiCall<IApiResponse<IStory[]>>(
    `/editor-picks?page=${page}&per_page=${perPage}`
  );
};

export const fetchFeaturedStories = async (
  page = 1,
  perPage = 15
): Promise<IApiResponse<IStory[]>> => {
  return apiCall<IApiResponse<IStory[]>>(
    `/stories/featured-stories?page=${page}&per_page=${perPage}`
  );
};

export const fetchLatestStories = async (
  page = 1,
  perPage = 7
): Promise<IApiResponse<IStory[]>> => {
  return apiCall<IApiResponse<IStory[]>>(
    `/stories/latest-stories?page=${page}&per_page=${perPage}`
  );
};

export const fetchMissedStories = async (
  page = 1,
  perPage = 5
): Promise<IApiResponse<IStory[]>> => {
  return apiCall<IApiResponse<IStory[]>>(
    `/stories/missed-stories?page=${page}&per_page=${perPage}`
  );
};

export const fetchCategoryStories = async (
  categoryId: number,
  page = 1,
  perPage = 15
): Promise<IApiResponse<IStory[]>> => {
  return apiCall<IApiResponse<IStory[]>>(
    `/categories/${categoryId}/stories?page=${page}&per_page=${perPage}`
  );
};

export const fetchSingleStory = async (storyId: number): Promise<IStory> => {
  return apiCall<IStory>(`/stories/${storyId}`);
};
