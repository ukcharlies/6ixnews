"use client";

import { useBookmarks } from "@/lib/hooks/useBookmarks";
import { useQuery } from "@tanstack/react-query";
import TopStoriesSection from "@/components/sections/TopStoriesSection";
import {
  fetchEditorsPicks,
  fetchLatestStories,
  fetchTopStories,
} from "@/lib/api/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeBookmarks } from "@/lib/store/bookmarkSlice";
import { IStory } from "@/types/story";

export default function BookmarksPage() {
  const dispatch = useDispatch();
  const { bookmarkIds, isClient } = useBookmarks();

  useEffect(() => {
    dispatch(initializeBookmarks());
  }, [dispatch]);

  const { data: editorsPicks = [] } = useQuery({
    queryKey: ["editorsPicks"],
    queryFn: () => fetchEditorsPicks(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: latestStories = [] } = useQuery({
    queryKey: ["latestStories"],
    queryFn: () => fetchLatestStories(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: topStories = [] } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
    staleTime: 5 * 60 * 1000,
  });

  // Combine all stories and remove duplicates
  const allStories = [
    ...new Map(
      [...editorsPicks, ...latestStories, ...topStories].map((story) => [
        story.id,
        story,
      ])
    ).values(),
  ];

  const bookmarkedStories = allStories
    .filter((story) => bookmarkIds.includes(story.id))
    .map((story) => ({
      ...story,
      banner_image: story.banner_image?.startsWith("http")
        ? story.banner_image
        : `${process.env.NEXT_PUBLIC_API_URL}${story.banner_image}`,
    }));

  if (!isClient) {
    return null; // Prevent flash of content during hydration
  }

  if (bookmarkIds.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Your Bookmarks</h1>
        <p className="text-gray-600">You haven't bookmarked any stories yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TopStoriesSection
        stories={bookmarkedStories}
        isLoading={false}
        title="Your Bookmarks"
      />
    </div>
  );
}
