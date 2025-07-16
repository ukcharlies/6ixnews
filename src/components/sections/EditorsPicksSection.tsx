import { IStory } from "@/types/story";
import { Crown } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage"; // Add this import

interface EditorsPicksSectionProps {
  stories: IStory[]; // Ensure this matches the story structure from the API
  isLoading?: boolean;
  error?: Error | null;
}

export default function EditorsPicksSection({
  stories,
  isLoading,
  error,
}: EditorsPicksSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const storiesPerPage = 5;
  const safeStories = Array.isArray(stories) ? stories : [];

  if (error) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Editor's Picks</h2>
        <ErrorMessage message="Failed to load editor's picks" />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Editor's Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

  const paginatedStories = safeStories
    .slice(1)
    .reduce((acc: IStory[][], story, i) => {
      const pageIndex = Math.floor(i / storiesPerPage);
      if (!acc[pageIndex]) acc[pageIndex] = [];
      acc[pageIndex].push(story);
      return acc;
    }, []);

  return (
    <section className="py-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8 lg:min-h-[650px]">
        {/* Featured Story */}
        {safeStories[0] && (
          <div className="flex-1 lg:flex-grow-2 lg:h-full">
            <div className="bg-white shadow-sm overflow-hidden rounded-t-none lg:rounded-lg lg:h-full flex flex-col">
              <div className="relative h-[280px] lg:h-[400px]">
                <img
                  src={safeStories[0].banner_image || "/placeholder-image.jpg"}
                  alt={safeStories[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <div className="w-6 h-6 bg-[#D72B81] rounded-full flex items-center justify-center mr-2">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">
                    Editor's Pick
                  </span>
                </div>
              </div>
              {/* Story Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {safeStories[0].title}
                  </h3>
                  <p className="text-base text-gray-600 mb-1 leading-relaxed line-clamp-3">
                    {safeStories[0].description}
                  </p>
                </div>
                <div className="flex items-center pt-4 border-t border-gray-100">
                  <div className="w-2.5 h-2.5 bg-[#F52A32] rounded-full mr-3"></div>
                  <span className="text-base font-medium text-gray-700">
                    By {safeStories[0].author || "Unknown Author"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* More Stories - keeping original styling */}
        {paginatedStories[currentPage]?.length > 0 && (
          <div className="lg:mt-0 lg:w-1/3 lg:h-full">
            <div className="bg-white shadow-sm p-6 rounded-b-none lg:rounded-lg lg:h-full lg:flex lg:flex-col">
              <h2 className="hidden lg:block text-2xl font-bold text-gray-900 mb-6">
                More Stories
              </h2>
              <div className="space-y-4 flex-1 overflow-y-auto">
                {paginatedStories[currentPage].map((story) => (
                  <div
                    key={story.id}
                    className="flex items-start space-x-3 group"
                  >
                    <div className="w-2 h-2 bg-[#F52A32] mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#D72B81] transition-colors duration-200 cursor-pointer line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {story.author || "Unknown Author"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination - unchanged */}
              <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(0, prev - 1))
                  }
                  className="disabled:opacity-50"
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage + 1} of {paginatedStories.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(paginatedStories.length - 1, prev + 1)
                    )
                  }
                  className="disabled:opacity-50"
                  disabled={currentPage === paginatedStories.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
