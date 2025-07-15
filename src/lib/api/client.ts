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

// Category endpoints
export const fetchCategories = async (): Promise<ICategory[]> => {
  const response = await apiCall<any>("/categories");
  // Handle the nested data structure: response.data.data
  if (
    response &&
    response.data &&
    response.data.data &&
    Array.isArray(response.data.data)
  ) {
    return response.data.data;
  }
  // Fallback for direct data property
  if (response && response.data && Array.isArray(response.data)) {
    return response.data;
  }
  // If it's already an array
  if (Array.isArray(response)) {
    return response;
  }
  console.warn("Unexpected categories response format:", response);
  return [];
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

export const fetchEditorsPicks = async (
  page = 1,
  perPage = 15
): Promise<IStory[]> => {
  const response = await apiCall<any>(
    `/editor-picks?page=${page}&per_page=${perPage}`
  );
  // Handle the nested data structure and extract story objects, filter out null stories
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
  console.warn("Unexpected editors picks response format:", response);
  return [];
};

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
