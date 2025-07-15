import { IStory } from "@/types/story";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useState } from "react";

interface LatestStoriesSectionProps {
  stories: IStory[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function LatestStoriesSection({
  stories,
  isLoading,
  error,
}: LatestStoriesSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Ensure stories is always an array
  const safeStories = Array.isArray(stories) ? stories : [];

  if (error) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-bold uppercase border-l-4 border-[#813D97] pl-4"
            style={{ minHeight: "24px" }}
          >
            LATEST NEWS
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
            LATEST NEWS
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
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 h-64 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
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

  return (
    <section className="py-8">
      {/* Header with title and circular indicators */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-2xl font-bold uppercase border-l-4 border-[#813D97] pl-4"
          style={{ minHeight: "24px" }}
        >
          LATEST NEWS
        </h2>
        <div className="flex space-x-2">
          {safeStories.slice(0, 5).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                hoveredIndex === index || focusedIndex === index
                  ? "bg-[#F52A32]"
                  : "bg-gray-400"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              aria-label={`Go to news item ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {safeStories.length === 0 ? (
        <p className="text-gray-600">No latest news available.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {safeStories.map((story, index) => (
              <div
                key={story.id}
                className="flex-shrink-0 w-80 h-64 relative group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* News Card */}
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Background Image */}
                  <img
                    src={story.banner_image || "/api/placeholder/320/256"}
                    alt={story.title}
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
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
