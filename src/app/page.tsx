"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchTopStories,
  fetchCategories,
  fetchEditorsPicks,
  fetchFeaturedStories,
  fetchLatestStories,
  fetchMissedStories,
} from "@/lib/api/client";
import { useAppSelector } from "@/lib/hooks/redux";
import { useMemo } from "react";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/sections/CategoryNav";
import TopStoriesSection from "@/components/sections/TopStoriesSection";
import EditorsPicksSection from "@/components/sections/EditorsPicksSection";
import FeaturedStoriesSection from "@/components/sections/FeaturedStoriesSection";
import LatestStoriesSection from "@/components/sections/LatestStoriesSection";
import MissedStoriesSection from "@/components/sections/MissedStoriesSection";
import Footer from "@/components/layout/Footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function Home() {
  const { selectedCategoryId, searchQuery } = useAppSelector(
    (state) => state.category
  );

  // Fetch all data
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const {
    data: topStories = [],
    isLoading: topStoriesLoading,
    error: topStoriesError,
  } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const {
    data: editorsPicksResponse,
    isLoading: editorsPicksLoading,
    error: editorsPicksError,
  } = useQuery({
    queryKey: ["editorsPicks"],
    queryFn: () => fetchEditorsPicks(1, 15),
    staleTime: 3 * 60 * 1000,
  });

  const {
    data: featuredStoriesResponse,
    isLoading: featuredStoriesLoading,
    error: featuredStoriesError,
  } = useQuery({
    queryKey: ["featuredStories"],
    queryFn: () => fetchFeaturedStories(1, 15),
    staleTime: 3 * 60 * 1000,
  });

  const {
    data: latestStoriesResponse,
    isLoading: latestStoriesLoading,
    error: latestStoriesError,
  } = useQuery({
    queryKey: ["latestStories"],
    queryFn: () => fetchLatestStories(1, 7),
    staleTime: 1 * 60 * 1000, // 1 minute for latest stories
  });

  const {
    data: missedStoriesResponse,
    isLoading: missedStoriesLoading,
    error: missedStoriesError,
  } = useQuery({
    queryKey: ["missedStories"],
    queryFn: () => fetchMissedStories(1, 5),
    staleTime: 3 * 60 * 1000,
  });

  // Filter stories based on search query
  const filteredTopStories = useMemo(() => {
    if (!searchQuery) return topStories;
    return topStories.filter(
      (story) =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [topStories, searchQuery]);

  const filteredEditorsPicks = useMemo(() => {
    const stories = editorsPicksResponse?.data || [];
    if (!searchQuery) return stories;
    return stories.filter(
      (story) =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [editorsPicksResponse, searchQuery]);

  // Check for critical errors
  const hasError = categoriesError || topStoriesError;

  if (hasError) {
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Category Navigation */}
        <section className="bg-white shadow-sm sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <CategoryNav
              categories={categories}
              isLoading={categoriesLoading}
            />
          </div>
        </section>

        <div className="container mx-auto px-4 py-6 space-y-12">
          {/* Search Results Info */}
          {searchQuery && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                Search results for: <strong>"{searchQuery}"</strong>
              </p>
            </div>
          )}

          {/* Top Stories Section */}
          <TopStoriesSection
            stories={filteredTopStories}
            isLoading={topStoriesLoading}
            error={topStoriesError}
          />

          {/* Editor's Picks Section */}
          <EditorsPicksSection
            stories={filteredEditorsPicks}
            isLoading={editorsPicksLoading}
            error={editorsPicksError}
          />

          {/* Featured Stories Section */}
          <FeaturedStoriesSection
            stories={featuredStoriesResponse?.data || []}
            isLoading={featuredStoriesLoading}
            error={featuredStoriesError}
          />

          {/* Latest Stories Section */}
          <LatestStoriesSection
            stories={latestStoriesResponse?.data || []}
            isLoading={latestStoriesLoading}
            error={latestStoriesError}
          />

          {/* Missed Stories Section */}
          <MissedStoriesSection
            stories={missedStoriesResponse?.data || []}
            isLoading={missedStoriesLoading}
            error={missedStoriesError}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
