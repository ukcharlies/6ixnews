import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;

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

  // Get other stories after the first 4
  const politicsStories = otherStories.slice(4);
  const totalPages = Math.ceil(politicsStories.length / storiesPerPage);

  // Calculate current page stories
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = politicsStories.slice(
    indexOfFirstStory,
    indexOfLastStory
  );

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
                  alt={firstStory.title || "News story"}
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
                    alt={story.title || "News story"}
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
      <div className="hidden md:block">
        {/* Main story grid */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-96 mb-8">
          {/* First Story - Large (2x2) */}
          {firstStory && (
            <Link
              href={`/stories/${firstStory.id}`}
              className="col-span-2 row-span-2 relative group cursor-pointer"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={firstStory.banner_image || "/placeholder-image.jpg"}
                  alt={firstStory.title || "News story"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Text content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span
                    className="text-sm font-semibold mb-2 block"
                    style={{ color: "#F85FD0" }}
                  >
                    Latest Today
                  </span>
                  <h3 className="text-xl font-bold leading-tight line-clamp-3">
                    {firstStory.title}
                  </h3>
                  {firstStory.subtitle && (
                    <p className="text-sm text-gray-200 mt-2 line-clamp-2">
                      {firstStory.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* Other top stories - first 4 only */}
          {otherStories.slice(0, 4).map((story, index) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="relative group cursor-pointer"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={story.banner_image || "/placeholder-image.jpg"}
                  alt={story.title || "News story"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Text content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <span
                    className="text-xs font-semibold mb-1 block"
                    style={{ color: "#F85FD0" }}
                  >
                    News Today
                  </span>
                  <h3 className="text-sm font-bold leading-tight line-clamp-2">
                    {story.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Stories in Politics Section */}
        {otherStories.length > 4 && (
          <>
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-[#813D97] pl-4">
              OTHER STORIES IN POLITICS
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {currentStories.map((story) => (
                <Link href={`/stories/${story.id}`} key={story.id}>
                  <div className="flex flex-col lg:flex-row gap-6 group cursor-pointer">
                    <div className="relative w-full lg:w-1/3 aspect-[16/9]">
                      <Image
                        src={story.banner_image || "/placeholder-image.jpg"}
                        alt={story.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-400 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {format(
                          new Date(story.created_at),
                          "h:mm a, MMMM d, yyyy"
                        )}
                      </p>
                      <p className="text-gray-600">
                        {story.description?.slice(0, 200)}...
                      </p>
                      <button className="px-4 py-2 bg-[#ffffff10] text-#999999 rounded-full hover:bg-opacity-90 transition-colors text-sm border-2">
                        Continue Reading
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center  mt-8 border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstStory + 1} -{" "}
                {Math.min(indexOfLastStory, politicsStories.length)} of{" "}
                {politicsStories.length}
              </p>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600  disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[32px] h-7 flex items-center rounded-xl justify-center ${
                          currentPage === page
                            ? "bg-black text-white"
                            : "bg-[#999999] text-white hover:bg-opacity-80"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 disabled:opacity-50"
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
