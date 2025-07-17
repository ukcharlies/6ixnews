import { IStory } from "@/types/story";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface LatestStoriesSectionProps {
  stories: IStory[];
  isLoading?: boolean;
  error?: Error | null;
  title?: string;
}

export default function LatestStoriesSection({
  stories,
  isLoading,
  error,
  title = "Latest News",
}: LatestStoriesSectionProps) {
  const [focusedCardIndex, setFocusedCardIndex] = useState<number>(0);

  // Ensure stories is always an array
  const safeStories = Array.isArray(stories) ? stories : [];

  // Auto-set initial focused card to middle when stories load
  useEffect(() => {
    if (safeStories.length > 0) {
      setFocusedCardIndex(Math.floor(safeStories.length / 2));
    }
  }, [safeStories.length]);

  if (error) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold uppercase border-l-4 border-[#813D97] pl-4"
            style={{ minHeight: "24px" }}
          >
            {title}
          </h2>
        </div>
        <ErrorMessage message="Failed to load latest news" />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold uppercase border-l-4 border-[#813D97] pl-4"
            style={{ minHeight: "24px" }}
          >
            {title}
          </h2>
          <div className="flex space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-gray-300 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 h-80">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`bg-gray-200 rounded-lg animate-pulse ${
                i === 2 ? "w-96 h-80" : "w-48 h-64"
              }`}
            />
          ))}
        </div>
      </section>
    );
  }

  const getCategoryName = (category: string | object): string => {
    if (!category) return "";
    if (typeof category === "string") return category;
    if (typeof category === "object" && "category_name" in category) {
      return (category as any).category_name;
    }
    return "";
  };

  const handleCardClick = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setFocusedCardIndex(index);
    }
  };

  return (
    <section className="py-8">
      {/* Header with title and circular indicators */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl font-bold uppercase border-l-4 border-[#813D97] pl-4"
          style={{ minHeight: "24px" }}
        >
          {title}
        </h2>
        <div className="flex space-x-2">
          {safeStories.slice(0, 7).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                focusedCardIndex === index ? "bg-[#F52A32]" : "bg-gray-400"
              }`}
              onClick={() => setFocusedCardIndex(index)}
              aria-label={`Go to news item ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {safeStories.length === 0 ? (
        <p className="text-gray-600">No latest news available.</p>
      ) : (
        <>
          {/* Large Screen Layout - Centered Focus */}
          <div className="hidden lg:block relative overflow-hidden">
            <div className="flex items-center justify-center space-x-4 min-h-[320px]">
              {safeStories.map((story, index) => {
                const isFocused = index === focusedCardIndex;
                const isAdjacent = Math.abs(index - focusedCardIndex) === 1;
                const isVisible = Math.abs(index - focusedCardIndex) <= 2;

                if (!isVisible) return null;

                return (
                  <Link
                    key={story.id}
                    href={`/stories/${story.id}`}
                    className="block"
                  >
                    <div
                      className={`relative cursor-pointer transition-all duration-500 ease-in-out ${
                        isFocused
                          ? "w-96 h-80 z-20 scale-100"
                          : isAdjacent
                          ? "w-48 h-64 z-10 scale-90 opacity-80"
                          : "w-40 h-56 z-0 scale-75 opacity-60"
                      }`}
                      onClick={() => handleCardClick(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View news: ${story.title}`}
                    >
                      {/* News Card */}
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        {/* Background Image */}
                        <Image
                          src={story.banner_image || "/api/placeholder/400/320"}
                          alt={story.title}
                          width={400}
                          height={320}
                          className="w-full h-full object-cover"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full ${
                              isFocused ? "text-sm" : ""
                            }`}
                          >
                            {getCategoryName(story.category) || "News"}
                          </span>
                        </div>

                        {/* Title at bottom */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3
                            className={`text-white font-bold leading-tight line-clamp-3 transition-all duration-300 ${
                              isFocused
                                ? "text-xl"
                                : isAdjacent
                                ? "text-base"
                                : "text-sm"
                            }`}
                          >
                            {story.title}
                          </h3>
                          {isFocused && (
                            <p className="text-gray-200 text-sm mt-2 line-clamp-2 opacity-90">
                              {story.description}
                            </p>
                          )}
                        </div>

                        {/* Focus indicator ring */}
                        {isFocused && (
                          <div className="absolute inset-0 ring-4 ring-[#F52A32] ring-opacity-50 rounded-lg pointer-events-none" />
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              onClick={() =>
                setFocusedCardIndex(Math.max(0, focusedCardIndex - 1))
              }
              disabled={focusedCardIndex === 0}
              aria-label="Previous news item"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              onClick={() =>
                setFocusedCardIndex(
                  Math.min(safeStories.length - 1, focusedCardIndex + 1)
                )
              }
              disabled={focusedCardIndex === safeStories.length - 1}
              aria-label="Next news item"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Small/Medium Screen Layout - Horizontal Scroll */}
          <div className="lg:hidden overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {safeStories.map((story, index) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.id}`}
                  className="block flex-shrink-0 w-80 h-64 relative group cursor-pointer"
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Background Image */}
                    <Image
                      src={story.banner_image || "/api/placeholder/320/256"}
                      alt={story.title}
                      width={320}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium text-white bg-black/40 backdrop-blur-sm rounded-full">
                        {getCategoryName(story.category) || "News"}
                      </span>
                    </div>
                    {/* Title at bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-3">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
