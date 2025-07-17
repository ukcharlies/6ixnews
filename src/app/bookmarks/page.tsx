"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { fetchStoryById } from "@/lib/api/client";
import { useQueries } from "@tanstack/react-query";
import TopStoriesSection from "@/components/sections/TopStoriesSection";

export default function BookmarksPage() {
  const bookmarkIds = useAppSelector((state) => state.bookmarks.ids);

  const bookmarkQueries = useQueries({
    queries: bookmarkIds.map((id) => ({
      queryKey: ["story", id],
      queryFn: () => fetchStoryById(id),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isLoading = bookmarkQueries.some((query) => query.isLoading);
  const error = bookmarkQueries.find((query) => query.error)?.error;
  const stories = bookmarkQueries
    .filter((query) => query.data)
    .map((query) => query.data);

  return (
    <div className="container mx-auto px-4 py-8">
      <TopStoriesSection
        stories={stories}
        isLoading={isLoading}
        error={error}
        title="Your Bookmarks"
      />
    </div>
  );
}
