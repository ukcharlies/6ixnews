"use client";

import Image from "next/image";
import { IStory } from "@/types/story";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { toggleBookmark } from "@/lib/store/bookmarkSlice";

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

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
          {story.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {story.title}
      </h1>

      {/* Meta Information */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div className="flex items-center space-x-4 text-gray-600">
          <span className="font-medium">{story.author}</span>
          <span>•</span>
          <span>{formatDate(story.date)}</span>
        </div>

        <button
          onClick={handleBookmarkClick}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
            isBookmarked
              ? "bg-yellow-50 border-yellow-300 text-yellow-700"
              : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
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
          <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
        </button>
      </div>

      {/* Featured Image */}
      {story.imageUrl && (
        <div className="mb-8">
          <Image
            src={story.imageUrl}
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
        {story.excerpt}
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />
      </div>

      {/* Share Buttons */}
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Share this story</h3>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <span>Share on Twitter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
            <span>Share on Facebook</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    </article>
  );
}
