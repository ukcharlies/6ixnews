"use client";

import Image from "next/image";
import { IStory } from "@/types/story";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { toggleBookmark } from "@/lib/store/bookmarkSlice";
import { fetchTopStories, fetchMissedStories } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import StoryCard from "../ui/StoryCard";
import LatestStoriesSection from "@/components/sections/LatestStoriesSection";
import MissedStoriesSection from "@/components/sections/MissedStoriesSection";
import { Share2 } from "lucide-react";
import TopStoriesSection from "@/components/sections/TopStoriesSection";

interface StoryContentProps {
  story: IStory;
}

export default function StoryContent({ story }: StoryContentProps) {
  const dispatch = useAppDispatch();
  const bookmarkIds = useAppSelector((state) => state.bookmarks.ids);
  const isBookmarked = bookmarkIds.includes(story.id);

  const handleBookmarkClick = () => {
    dispatch(toggleBookmark(story.id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryName = (category: any): string => {
    if (!category) return "Uncategorized";
    if (typeof category === "string") return category;
    if (typeof category === "object" && category.category_name) {
      return category.category_name;
    }
    return "Uncategorized";
  };

  // Fetch related stories
  const { data: topStories = [], isLoading: topStoriesLoading } = useQuery({
    queryKey: ["relatedTopStories"],
    queryFn: async () => {
      const result = await fetchTopStories(1, 6);
      return result;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: missedStories = [], isLoading: missedStoriesLoading } =
    useQuery({
      queryKey: ["relatedMissedStories"],
      queryFn: () => fetchMissedStories(1, 6),
      staleTime: 5 * 60 * 1000,
    });

  return (
    <>
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Category and Share Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-white border border-gray-200 text-gray-500 text-sm font-medium rounded-full">
              {getCategoryName(story.category)}
            </span>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
              <Share2 size={18} />
              <span className="text-sm">Share</span>
            </button>
          </div>

          {/* Bookmark Button - Updated styling */}
          <button
            onClick={handleBookmarkClick}
            className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full border-2 transition-all duration-200 ${
              isBookmarked
                ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                : "bg-white border-gray-300 text-gray-700 hover:border-yellow-300 hover:text-yellow-700"
            }`}
          >
            <svg
              className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
              fill={isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="font-medium">
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </span>
          </button>
        </div>

        {/* Title with increased leading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight md:leading-tight">
          {story.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8 pb-4 border-b">
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="font-medium">{story.author}</span>
            <span>•</span>
            <span>{formatDate(story.created_at)}</span>
          </div>
        </div>

        {/* Featured Image */}
        {story.banner_image && (
          <div className="mb-8">
            <Image
              src={story.banner_image}
              alt={story.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-news.jpg";
              }}
            />
          </div>
        )}

        {/* Excerpt */}
        <div className="text-xl text-gray-700 font-medium mb-8 leading-relaxed">
          {story.description}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </div>

        {/* Social Share Section - Before horizontal line */}
        <div className="mt-12 pt-8 border-t space-y-4">
          <h3 className="text-lg font-semibold">Share this story</h3>
          <div className="flex items-center space-x-6">
            {/* Twitter */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#E4405F] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#4267B2] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Pinterest */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#E60023] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="text-gray-500 hover:text-[#0A66C2] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Link Icon */}
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </div>
        </div>
      </article>

      {/* Story Meta Sections */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Latest Stories Section - Fixed props */}
        <LatestStoriesSection
          stories={topStories}
          isLoading={topStoriesLoading}
          error={null}
          title="People Are Also Reading"
        />

        {/* Horizontal Separator */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Missed Stories Section */}
        <MissedStoriesSection
          stories={missedStories}
          isLoading={missedStoriesLoading}
          error={null}
        />
      </div>
    </>
  );
}
