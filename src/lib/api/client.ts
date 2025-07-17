import { IStory, ICategory } from "@/types/story";

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

export interface Category {
  id: number;
  name: string;
  totalStories: number;
}

interface CategoryAPIResponse {
  category_id: number;
  category_name: string;
  total_stories: number;
  created_at: string;
  updated_at: string;
}

interface CategoriesAPIResponse {
  message: string;
  data: {
    data: CategoryAPIResponse[];
  };
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(
      "https://api.agcnewsnet.com/api/general/categories",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: CategoriesAPIResponse = await response.json();

    // Transform API response to match our interface
    return result.data.data.map((category) => ({
      id: category.category_id,
      name: category.category_name,
      totalStories: category.total_stories,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Story endpoints
export const fetchTopStories = async (): Promise<IStory[]> => {
  const response = await apiCall<any>("/top-stories");
  // Handle the nested data structure and extract story objects
  if (
    response &&
    response.data &&
    response.data.data &&
    Array.isArray(response.data.data)
  ) {
    return response.data.data
      .map((item: any) => item.story)
      .filter((story: any) => story !== null);
  }
  // Fallback handlers
  if (response && response.data && Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  console.warn("Unexpected top stories response format:", response);
  return [];
};

export async function fetchEditorsPicks(page = 1, limit = 15) {
  try {
    const response = await fetch(
      `${API_BASE}/editor-picks?page=${page}&limit=${limit}`
    );
    const json = await response.json();

    // Extract and transform story objects from editor picks
    const stories = json.data.data
      .map((item: any) => item.story)
      .filter((story: any) => story !== null);

    // Return the clean array of stories
    return stories;
  } catch (error) {
    console.error("Error fetching editor picks:", error);
    return [];
  }
}

export const fetchFeaturedStories = async (
  page = 1,
  perPage = 15
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/stories/featured-stories?page=${page}&per_page=${perPage}`
  );
  // Handle the nested data structure
  if (
    response &&
    response.data &&
    response.data.data &&
    Array.isArray(response.data.data)
  ) {
    return response.data.data;
  }
  // Fallback handlers
  if (response && response.data && Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  console.warn("Unexpected featured stories response format:", response);
  return [];
};

export const fetchLatestStories = async (
  page = 1,
  perPage = 7
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/stories/latest-stories?page=${page}&per_page=${perPage}`
  );
  // Handle the nested data structure
  if (
    response &&
    response.data &&
    response.data.data &&
    Array.isArray(response.data.data)
  ) {
    return response.data.data;
  }
  // Fallback handlers
  if (response && response.data && Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  console.warn("Unexpected latest stories response format:", response);
  return [];
};

export const fetchMissedStories = async (
  page = 1,
  perPage = 5
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/stories/missed-stories?page=${page}&per_page=${perPage}`
  );
  // Handle the nested data structure
  if (
    response &&
    response.data &&
    response.data.data &&
    Array.isArray(response.data.data)
  ) {
    return response.data.data;
  }
  // Fallback handlers
  if (response && response.data && Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  console.warn("Unexpected missed stories response format:", response);
  return [];
};

export const fetchCategoryStories = async (
  categoryId: number,
  page = 1,
  perPage = 15
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/categories/${categoryId}/stories?page=${page}&per_page=${perPage}`
  );
  // Handle the nested data structure
  if (
    response &&
    response.data &&
    response.data.data &&
    Array.isArray(response.data.data)
  ) {
    return response.data.data;
  }
  // Fallback handlers
  if (response && response.data && Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  console.warn("Unexpected category stories response format:", response);
  return [];
};

export const fetchSingleStory = async (storyId: number): Promise<IStory> => {
  const response = await apiCall<any>(`/stories/${storyId}`);
  if (response && response.data) {
    return response.data;
  }
  if (response && response.story) {
    return response.story;
  }
  return response;
};

export async function fetchStoryById(id: string) {
  const response = await fetch(`${API_BASE}/stories/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch story");
  }
  return response.json();
}
