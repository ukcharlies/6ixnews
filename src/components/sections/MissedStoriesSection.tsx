import { IStory } from "@/types/story";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Link from "next/link";
import { useState } from "react";

interface MissedStoriesSectionProps {
  stories: IStory[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function MissedStoriesSection({
  stories,
  isLoading,
  error,
}: MissedStoriesSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const storiesPerPage = 6;
  const safeStories = Array.isArray(stories) ? stories : [];

  // Calculate total pages
  const totalPages = Math.ceil(safeStories.length / storiesPerPage);

  // Get current page stories
  const currentStories = safeStories.slice(
    currentPage * storiesPerPage,
    (currentPage + 1) * storiesPerPage
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (error) {
    return (
      <section className="py-4">
        <h2 className="text-2xl font-bold mb-6">Stories You Missed</h2>
        <ErrorMessage message="Failed to load missed stories" />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Stories You Missed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg mb-3" />
              <div className="h-3 bg-gray-200 rounded mb-1" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      {/* Modified header and pagination container */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h2 className="text-2xl font-bold uppercase order-1">
          Stories You May Have Missed
        </h2>

        {totalPages > 1 && (
          <div className="flex space-x-2 order-2 lg:order-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentPage === index ? "bg-[#F52A32]" : "bg-gray-300"
                }`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {safeStories.length === 0 ? (
        <p className="text-gray-600">No missed stories available.</p>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
            {currentStories.map((story) => (
              <Link key={story.id} href={`/stories/${story.id}`}>
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#D72B81] transition-colors duration-200 line-clamp-2">
                      {story.title}
                    </h3>
                    <div className="flex items-center mt-2 text-sm text-gray-500 space-x-2">
                      <span className="w-1.5 h-1.5 bg-[#F52A32] rounded-full" />
                      <span>{formatDate(story.created_at)}</span>
                      <span className="w-1.5 h-1.5 bg-[#F52A32] rounded-full" />
                      <span>
                        {story.category?.category_name || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
