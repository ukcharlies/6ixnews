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
import { Story } from "@/types/story";
import NewsInVideosSection from "@/components/sections/NewsInVideosSection";
import NewsInPicturesSection from "@/components/sections/NewsInPicturesSection";
import GetUpdatesSection from "@/components/sections/GetUpdatesSection";

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
      const stories = await fetchEditorsPicks(1, 15);
      console.log("Editors picks result:", stories);
      return stories;
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

    // Filter out null/undefined stories and ensure they have required properties
    const validStories = stories.filter(
      (story) => story && typeof story === "object" && story.id
    );

    // Remove duplicates based on story ID
    const uniqueStories = validStories.filter(
      (story, index, self) =>
        index === self.findIndex((s) => s && s.id === story.id)
    );

    return uniqueStories;
  }, [topStories, editorsPicks, featuredStories, latestStories, missedStories]);

  // Helper function to safely get category name
  const getCategoryName = (category: any): string => {
    if (!category) return "";
    if (typeof category === "string") return category;
    if (typeof category === "object") {
      return category.category_name || "";
    }
    return "";
  };

  // Filter stories based on search query
  const filteredTopStories = useMemo(() => {
    if (!searchQuery) return topStories;
    return topStories.filter(
      (story: Story) =>
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
      (story: Story) =>
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
      (story: Story) =>
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
      (story: Story) =>
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
      (story: Story) =>
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
            title={
              selectedCategoryId
                ? `${
                    categories.find((c) => c.id === selectedCategoryId)?.name
                  } Stories`
                : "Top Stories"
            }
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

          {/* Advertisement Section */}
          {!selectedCategoryId && (
            <section className="py-8">
              {/* Mobile Layout - Stacked */}
              <div className="lg:hidden space-y-6">
                <div className="w-full">
                  <img
                    src="/body add.png"
                    alt="Advertisement"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
                <div className="w-full">
                  <img
                    src="/body-add2.png"
                    alt="Advertisement"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              </div>

              {/* Large Screen Layout - Horizontal */}
              <div className="hidden lg:flex lg:space-x-8 lg:justify-between">
                <div className="flex-1">
                  <img
                    src="/body add.png"
                    alt="Advertisement"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <img
                    src="/body-add2.png"
                    alt="Advertisement"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Only show other sections when not filtering by category */}
          {!selectedCategoryId && (
            <>
              <EditorsPicksSection
                stories={filteredEditorsPicks}
                categories={categories}
                isLoading={editorsPicksLoading}
                error={editorsPicksError}
              />

              <div className="border-t border-gray-200 my-8"></div>

              <NewsInVideosSection stories={allStories} />

              <div className="border-t border-gray-200 my-8"></div>

              <NewsInPicturesSection stories={allStories} />

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
              <GetUpdatesSection />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
