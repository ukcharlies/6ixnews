import { IStory, ICategory } from "@/types/story";
import { Crown, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Link from "next/link";
import Image from "next/image";

interface EditorsPicksSectionProps {
  stories: IStory[];
  categories: ICategory[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function EditorsPicksSection({
  stories,
  categories,
  isLoading,
  error,
}: EditorsPicksSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryPages, setCategoryPages] = useState<Record<number, number>>(
    {}
  );
  const storiesPerPage = 5;
  const safeStories = Array.isArray(stories) ? stories : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Group stories by category
  const storiesByCategory = safeCategories.reduce((acc, category) => {
    acc[category.id] = safeStories.filter(
      (story) => story.category?.category_id === category.id
    );
    return acc;
  }, {} as Record<number, IStory[]>);

  const handleCategoryPage = (
    categoryId: number,
    direction: "next" | "prev"
  ) => {
    setCategoryPages((prev) => {
      const currentPageNum = prev[categoryId] || 0;
      return {
        ...prev,
        [categoryId]:
          direction === "next" ? currentPageNum + 1 : currentPageNum - 1,
      };
    });
  };

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
      {/* Main Editor's Picks */}
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Featured Story */}
        {safeStories[0] && (
          <Link
            href={`/stories/${safeStories[0].id}`}
            className="block flex-1 lg:flex-grow-2"
          >
            <div className="flex-1 lg:flex-grow-2 h-full">
              <div className="bg-white shadow-sm overflow-hidden rounded-t-lg lg:rounded-lg h-full flex flex-col">
                <div className="relative h-[280px] lg:h-[400px]">
                  <Image
                    src={
                      safeStories[0].banner_image || "/placeholder-image.jpg"
                    }
                    alt={safeStories[0].title}
                    width={800}
                    height={400}
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
                    <div className="flex items-center divide-x divide-gray-300">
                      <span className="text-base font-medium text-gray-700 pr-3">
                        By {safeStories[0].author || "Unknown Author"}
                      </span>
                      <div className="flex items-center pl-3 text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">
                          {formatDate(safeStories[0].created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* More Stories */}
        <div className="lg:mt-0 lg:w-1/3">
          <div className="bg-white shadow-sm p-6 rounded-b-lg lg:rounded-lg h-full flex flex-col -mt-[1px]">
            <h2 className="hidden lg:block text-2xl font-bold text-gray-900 mb-6">
              More Stories
            </h2>
            <div className="space-y-4 flex-1 overflow-y-auto">
              {paginatedStories[currentPage]?.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.id}`}
                  className="block"
                >
                  <div className="flex items-start space-x-3 group">
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
                </Link>
              ))}
            </div>
            {/* Pagination */}
            {paginatedStories.length > 0 && (
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
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Separator */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Category News Section */}
      {safeCategories.map((category) => {
        const categoryStories = storiesByCategory[category.id] || [];
        if (categoryStories.length === 0) return null;

        const currentCategoryPage = categoryPages[category.id] || 0;
        const paginatedCategoryStories = categoryStories.reduce(
          (acc: IStory[][], story, i) => {
            const pageIndex = Math.floor(i / storiesPerPage);
            if (!acc[pageIndex]) acc[pageIndex] = [];
            acc[pageIndex].push(story);
            return acc;
          },
          []
        );

        const currentPageStories =
          paginatedCategoryStories[currentCategoryPage] || [];
        const [firstStory, ...restStories] = currentPageStories;

        return (
          <div key={category.id} className="py-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-1 h-8 bg-[#813D97]" />
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <ChevronRight className="w-6 h-6 text-[#282828]" />
            </div>

            <div className="flex flex-col lg:flex-row lg:space-x-8">
              {/* Featured Category Story */}
              {firstStory && (
                <Link
                  href={`/stories/${firstStory.id}`}
                  className="block flex-1 lg:flex-grow-2"
                >
                  <div className="flex-1 lg:flex-grow-2 h-full">
                    <div className="bg-white shadow-sm overflow-hidden rounded-t-lg lg:rounded-lg h-full flex flex-col">
                      <div className="relative h-[280px] lg:h-[400px]">
                        <Image
                          src={
                            firstStory.banner_image || "/placeholder-image.jpg"
                          }
                          alt={firstStory.title}
                          width={800}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                        <div className="mb-auto">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                            {firstStory.title}
                          </h3>
                          <p className="text-base text-gray-600 mb-1 leading-relaxed line-clamp-3">
                            {firstStory.description}
                          </p>
                        </div>
                        <div className="flex items-center pt-4 border-t border-gray-100">
                          <div className="w-2.5 h-2.5 bg-[#F52A32] rounded-full mr-3"></div>
                          <div className="flex items-center divide-x divide-gray-300">
                            <span className="text-base font-medium text-gray-700 pr-3">
                              By {firstStory.author || "Unknown Author"}
                            </span>
                            <div className="flex items-center pl-3 text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="text-sm">
                                {formatDate(firstStory.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Category Stories List */}
              <div className="lg:w-1/3">
                <div className="bg-white shadow-sm p-6 rounded-b-lg lg:rounded-lg h-full flex flex-col -mt-[1px]">
                  <div className="space-y-4 flex-1 overflow-y-auto">
                    {restStories.map((story) => (
                      <Link
                        key={story.id}
                        href={`/stories/${story.id}`}
                        className="block"
                      >
                        <div className="flex items-start space-x-3 group cursor-pointer">
                          <div className="w-2 h-2 bg-[#F52A32] mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#D72B81] transition-colors duration-200 line-clamp-2">
                              {story.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {story.author || "Unknown Author"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Category Pagination */}
                  {paginatedCategoryStories.length > 0 && (
                    <div className="flex justify-between items-center mt-6 text-sm text-gray-500 border-t pt-4">
                      <button
                        onClick={() => handleCategoryPage(category.id, "prev")}
                        className="disabled:opacity-50"
                        disabled={currentCategoryPage === 0}
                      >
                        Previous
                      </button>
                      <span>
                        Page {currentCategoryPage + 1} of{" "}
                        {paginatedCategoryStories.length}
                      </span>
                      <button
                        onClick={() => handleCategoryPage(category.id, "next")}
                        className="disabled:opacity-50"
                        disabled={
                          currentCategoryPage ===
                          paginatedCategoryStories.length - 1
                        }
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
