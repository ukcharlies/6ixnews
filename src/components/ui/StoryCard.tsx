"use client";

import Link from "next/link";
import Image from "next/image";
import { IStory } from "@/types/story";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { toggleBookmark } from "@/lib/store/bookmarkSlice";

interface StoryCardProps {
  story: IStory;
  className?: string;
}

export default function StoryCard({ story, className = "" }: StoryCardProps) {
  const dispatch = useAppDispatch();
  const bookmarkIds = useAppSelector((state) => state.bookmarks.ids);
  const isBookmarked = bookmarkIds.includes(story.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleBookmark(story.id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <article
      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${className}`}
    >
      <Link href={`/stories/${story.id}`}>
        <div className="relative">
          {story.imageUrl && (
            <Image
              src={story.imageUrl}
              alt={story.title}
              width={400}
              height={240}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-news.jpg";
              }}
            />
          )}

          {/* Bookmark Button */}
          <button
            onClick={handleBookmarkClick}
            className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <svg
              className={`w-5 h-5 ${
                isBookmarked ? "text-yellow-500 fill-current" : "text-gray-600"
              }`}
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
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {story.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600">
            {story.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {story.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-medium">{story.author}</span>
            <span>{formatDate(story.date)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
