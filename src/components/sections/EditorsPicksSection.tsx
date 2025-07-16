import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Crown } from "lucide-react";

interface EditorsPicksSectionProps {
  stories: IStory[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function EditorsPicksSection({
  stories,
  isLoading,
  error,
}: EditorsPicksSectionProps) {
  // No need for additional story mapping since we now receive clean story objects
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

  return (
    <section className="py-8">
      <div className="space-y-6">
        {/* Featured Story */}
        {safeStories[0] && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              {/* Story Image */}
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={safeStories[0].banner_image || "/placeholder-image.jpg"}
                  alt={safeStories[0].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Editor's Pick Badge */}
              <div className="absolute top-4 left-4 flex items-center bg-black bg-opacity-50 rounded-full px-3 py-1.5">
                <div className="w-6 h-6 bg-[#D72B81] rounded-full flex items-center justify-center mr-2">
                  <Crown className="w-3 h-3 text-white" />
                </div>
                <span className="text-white text-sm font-medium">
                  Editor's Pick
                </span>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {safeStories[0].title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {safeStories[0].description}
              </p>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#F52A32] rounded-full mr-2"></div>
                <span className="text-sm text-gray-500">
                  {safeStories[0].author || "Unknown Author"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Stories */}
        {safeStories.slice(1).length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              More Editor's Picks
            </h2>
            <div className="space-y-4">
              {safeStories.slice(1).map((story) => (
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
          </div>
        )}
      </div>
    </section>
  );
}
