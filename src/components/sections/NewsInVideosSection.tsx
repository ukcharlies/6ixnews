import { IStory } from "@/types/story";
import { Play, VideoOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsInVideosSectionProps {
  stories: IStory[];
}

const NewsInVideosSection = ({ stories }: NewsInVideosSectionProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const storiesPerPage = 5;
  const videoStories = stories.filter((story) => story.type === "video");

  // Paginate stories
  const paginatedStories = videoStories.reduce((acc: IStory[][], story, i) => {
    const pageIndex = Math.floor(i / storiesPerPage);
    if (!acc[pageIndex]) acc[pageIndex] = [];
    acc[pageIndex].push(story);
    return acc;
  }, []);

  const currentPageStories = paginatedStories[currentPage] || [];
  const [firstStory, ...otherStories] = currentPageStories;

  if (videoStories.length === 0) {
    return (
      <section className="py-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-1 h-8 bg-[#813D97]" />
          <h2 className="text-2xl font-bold">News in Videos</h2>
        </div>

        <div className="bg-white rounded-lg p-8 text-center">
          <VideoOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            No video content available at the moment
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-1 h-8 bg-[#813D97]" />
        <h2 className="text-2xl font-bold">News in Videos</h2>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-6">
        {/* First Video - Featured */}
        {firstStory && (
          <Link href={`/stories/${firstStory.id}`} className="block">
            <article className="space-y-3">
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={firstStory.banner_image || "/placeholder-image.jpg"}
                  alt={firstStory.title}
                  fill
                  className="object-cover"
                />
                <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white" />
              </div>
              <div className="text-left">
                <span className="text-sm font-semibold text-[#F85FD0]">
                  World News
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {firstStory.title}
              </h3>
            </article>
          </Link>
        )}

        {/* Other Videos - Horizontal Layout */}
        <div className="space-y-4">
          {otherStories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="block"
            >
              <article className="flex space-x-3 h-20">
                <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={story.banner_image || "/placeholder-image.jpg"}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                  <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <span className="text-xs font-semibold text-[#F85FD0]">
                    World News
                  </span>
                  <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-2">
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
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-96">
          {firstStory && (
            <Link
              href={`/stories/${firstStory.id}`}
              className="col-span-2 row-span-2 relative group cursor-pointer"
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={firstStory.banner_image || "/placeholder-image.jpg"}
                  alt={firstStory.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="text-sm font-semibold mb-2 block text-[#F85FD0]">
                    World News
                  </span>
                  <h3 className="text-xl font-bold leading-tight line-clamp-2">
                    {firstStory.title}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {/* Other Stories */}
          {otherStories.map((story, index) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className={`relative group cursor-pointer ${
                index === 0
                  ? "col-start-3 row-start-1"
                  : "col-start-4 row-start-2"
              }`}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={story.banner_image || "/placeholder-image.jpg"}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <span className="text-xs font-semibold mb-1 block text-[#F85FD0]">
                    World News
                  </span>
                  <h3 className="text-sm font-bold leading-tight line-clamp-2">
                    {story.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {paginatedStories.length > 1 && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500 border-t pt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
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
    </section>
  );
};

export default NewsInVideosSection;
