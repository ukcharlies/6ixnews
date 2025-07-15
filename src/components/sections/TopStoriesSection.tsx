import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Link from "next/link";
import Image from "next/image";

interface TopStoriesSectionProps {
  stories: IStory[];
  isLoading?: boolean;
  error?: Error | null;
  title?: string;
}

export default function TopStoriesSection({
  stories,
  isLoading,
  error,
  title = "Top Stories",
}: TopStoriesSectionProps) {
  // Ensure stories is always an array
  const safeStories = Array.isArray(stories) ? stories : [];

  if (error) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <ErrorMessage message={`Failed to load ${title.toLowerCase()}`} />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        {/* Mobile loading skeleton */}
        <div className="block md:hidden space-y-6">
          {/* First story loading */}
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
          {/* Other stories loading */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-4">
              <div className="w-24 h-20 bg-gray-200 rounded flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
        {/* Desktop loading skeleton */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (safeStories.length === 0) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <p className="text-gray-600">No stories found.</p>
      </section>
    );
  }

  const [firstStory, ...otherStories] = safeStories;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">{title}</h2>

      {/* Mobile View */}
      <div className="block md:hidden space-y-6">
        {/* First Story - Featured */}
        {firstStory && (
          <Link href={`/stories/${firstStory.id}`} className="block">
            <article className="space-y-3">
              {/* Image */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={firstStory.banner_image || "/placeholder-image.jpg"}
                  alt={firstStory.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Latest Today Label */}
              <div className="text-left">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#F85FD0" }}
                >
                  Latest Today
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-left text-gray-900 leading-tight">
                {firstStory.title}
              </h3>

              {/* Excerpt */}
              {firstStory.subtitle && (
                <p className="text-sm text-gray-600 text-left line-clamp-2">
                  {firstStory.subtitle}
                </p>
              )}
            </article>
          </Link>
        )}

        {/* Other Stories - Horizontal Layout */}
        <div className="space-y-4">
          {otherStories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="block"
            >
              <article className="flex space-x-3 h-20">
                {/* Image */}
                <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={story.banner_image || "/placeholder-image.jpg"}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  {/* News Today Label - Top */}
                  <span
                    className="text-xs font-semibold leading-tight"
                    style={{ color: "#F85FD0" }}
                  >
                    News Today
                  </span>

                  {/* Title - Bottom */}
                  <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-2 mt-auto">
                    {story.title}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop View - Grid Layout */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
        {safeStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
