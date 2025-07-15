"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchTopStories,
  fetchEditorsPicks,
  fetchFeaturedStories,
  fetchLatestStories,
  fetchMissedStories,
  fetchCategoryStories,
} from "@/lib/api/client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { clearSearch } from "@/lib/store/categorySlice";
import { useCategories } from "@/hooks/useCategories";
import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/sections/CategoryNav";
import TopStoriesSection from "@/components/sections/TopStoriesSection";
import EditorsPicksSection from "@/components/sections/EditorsPicksSection";
import FeaturedStoriesSection from "@/components/sections/FeaturedStoriesSection";
import LatestStoriesSection from "@/components/sections/LatestStoriesSection";
import MissedStoriesSection from "@/components/sections/MissedStoriesSection";
import Footer from "@/components/layout/Footer";
import ErrorMessage from "@/components/ui/ErrorMessage";
import SearchModal from "@/components/SearchModal";

export default function Home() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedCategoryId, searchQuery } = useAppSelector(
    (state) => state.category
  );

  // Use the custom hook for categories
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  // Fetch stories based on selected category
  const {
    data: topStories = [],
    isLoading: topStoriesLoading,
    error: topStoriesError,
  } = useQuery({
    queryKey: ["topStories", selectedCategoryId],
    queryFn: async () => {
      console.log("Fetching top stories for category:", selectedCategoryId);
      const result = selectedCategoryId
        ? await fetchCategoryStories(selectedCategoryId, 1, 15)
        : await fetchTopStories();
      console.log("Top stories result:", result);
      return result;
    },
    staleTime: 2 * 60 * 1000,
  });

  const {
    data: editorsPicks = [],
    isLoading: editorsPicksLoading,
    error: editorsPicksError,
  } = useQuery({
    queryKey: ["editorsPicks"],
    queryFn: async () => {
      console.log("Fetching editors picks...");
      const result = await fetchEditorsPicks(1, 15);
      console.log("Editors picks result:", result);
      return result;
    },
    staleTime: 3 * 60 * 1000,
    enabled: !selectedCategoryId,
  });

  const {
    data: featuredStories = [],
    isLoading: featuredStoriesLoading,
    error: featuredStoriesError,
  } = useQuery({
    queryKey: ["featuredStories"],
    queryFn: async () => {
      console.log("Fetching featured stories...");
      const result = await fetchFeaturedStories(1, 15);
      console.log("Featured stories result:", result);
      return result;
    },
    staleTime: 3 * 60 * 1000,
    enabled: !selectedCategoryId,
  });

  const {
    data: latestStories = [],
    isLoading: latestStoriesLoading,
    error: latestStoriesError,
  } = useQuery({
    queryKey: ["latestStories"],
    queryFn: async () => {
      console.log("Fetching latest stories...");
      const result = await fetchLatestStories(1, 7);
      console.log("Latest stories result:", result);
      return result;
    },
    staleTime: 1 * 60 * 1000,
    enabled: !selectedCategoryId,
  });

  const {
    data: missedStories = [],
    isLoading: missedStoriesLoading,
    error: missedStoriesError,
  } = useQuery({
    queryKey: ["missedStories"],
    queryFn: async () => {
      console.log("Fetching missed stories...");
      const result = await fetchMissedStories(1, 5);
      console.log("Missed stories result:", result);
      return result;
    },
    staleTime: 3 * 60 * 1000,
    enabled: !selectedCategoryId,
  });

  // Combine all stories for search
  const allStories = useMemo(() => {
    const stories = [
      ...topStories,
      ...editorsPicks,
      ...featuredStories,
      ...latestStories,
      ...missedStories,
    ];

    // Remove duplicates based on story ID
    const uniqueStories = stories.filter(
      (story, index, self) => index === self.findIndex((s) => s.id === story.id)
    );

    return uniqueStories;
  }, [topStories, editorsPicks, featuredStories, latestStories, missedStories]);

  // Helper function to safely get category name
  const getCategoryName = (category: string | object): string => {
    if (!category) return "";
    if (typeof category === "string") return category;
    if (typeof category === "object" && "category_name" in category) {
      return (category as any).category_name;
    }
    return "";
  };

  // Filter stories based on search query
  const filteredTopStories = useMemo(() => {
    if (!searchQuery) return topStories;
    return topStories.filter(
      (story) =>
        story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(story.category)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [topStories, searchQuery]);

  const filteredEditorsPicks = useMemo(() => {
    if (!searchQuery) return editorsPicks;
    return editorsPicks.filter(
      (story) =>
        story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(story.category)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [editorsPicks, searchQuery]);

  const filteredFeaturedStories = useMemo(() => {
    if (!searchQuery) return featuredStories;
    return featuredStories.filter(
      (story) =>
        story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(story.category)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [featuredStories, searchQuery]);

  const filteredLatestStories = useMemo(() => {
    if (!searchQuery) return latestStories;
    return latestStories.filter(
      (story) =>
        story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(story.category)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [latestStories, searchQuery]);

  const filteredMissedStories = useMemo(() => {
    if (!searchQuery) return missedStories;
    return missedStories.filter(
      (story) =>
        story.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryName(story.category)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [missedStories, searchQuery]);

  // Debug: Log all data
  console.log("All data:", {
    categories,
    topStories,
    editorsPicks,
    featuredStories,
    latestStories,
    missedStories,
    selectedCategoryId,
    searchQuery,
  });

  // Check for critical errors
  const hasError = categoriesError || topStoriesError;

  if (hasError) {
    console.error("Critical errors:", { categoriesError, topStoriesError });
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <ErrorMessage
            message="Failed to load content. Please try again later."
            onRetry={() => window.location.reload()}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative">
        <Header />
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          allStories={allStories}
        />
      </div>

      <main className="flex-1 bg-gray-50">
        {/* Category Navigation */}
        <section className="bg-white shadow-sm sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <CategoryNav
              categories={categories}
              isLoading={categoriesLoading}
            />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Search Results Info */}
          {searchQuery && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                Search results for: <strong>"{searchQuery}"</strong>
                <button
                  onClick={() => dispatch(clearSearch())}
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear search
                </button>
              </p>
            </div>
          )}

          {/* Category Filter Info */}
          {selectedCategoryId && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                Showing stories from:{" "}
                <strong>
                  {categories.find((c) => c.id === selectedCategoryId)?.name}
                </strong>
              </p>
            </div>
          )}

          {/* Debug Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
            <p>
              <strong>Debug Info:</strong>
            </p>
            <p>Categories: {categories.length}</p>
            <p>Top Stories: {topStories.length}</p>
            <p>Editor's Picks: {editorsPicks.length}</p>
            <p>Featured Stories: {featuredStories.length}</p>
            <p>Latest Stories: {latestStories.length}</p>
            <p>Missed Stories: {missedStories.length}</p>
          </div>

          {/* Top Stories / Category Stories Section */}
          <TopStoriesSection
            stories={filteredTopStories}
            isLoading={topStoriesLoading}
            error={topStoriesError}
            title={selectedCategoryId ? "Category Stories" : "Top Stories"}
          />

          {/* Horizontal Separator */}
          {!selectedCategoryId && (
            <div className="border-t border-gray-200 my-8"></div>
          )}

          {/* Latest News Section - positioned right after top stories */}
          {!selectedCategoryId && (
            <LatestStoriesSection
              stories={filteredLatestStories}
              isLoading={latestStoriesLoading}
              error={latestStoriesError}
            />
          )}

          {/* Only show other sections when not filtering by category */}
          {!selectedCategoryId && (
            <>
              <EditorsPicksSection
                stories={filteredEditorsPicks}
                isLoading={editorsPicksLoading}
                error={editorsPicksError}
              />

              <FeaturedStoriesSection
                stories={filteredFeaturedStories}
                isLoading={featuredStoriesLoading}
                error={featuredStoriesError}
              />

              <MissedStoriesSection
                stories={filteredMissedStories}
                isLoading={missedStoriesLoading}
                error={missedStoriesError}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
