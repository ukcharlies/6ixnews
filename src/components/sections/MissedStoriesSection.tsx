import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Link from "next/link";

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
  // Ensure stories is always an array
  const safeStories = Array.isArray(stories) ? stories : [];

  if (error) {
    return (
      <section className="py-8">
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
      <h2 className="text-2xl font-bold mb-6 uppercase">
        Stories You May Have Missed
      </h2>
      {safeStories.length === 0 ? (
        <p className="text-gray-600">No missed stories available.</p>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-4">
            {safeStories.map((story) => (
              <Link key={story.id} href={`/stories/${story.id}`}>
                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="w-2 h-2 bg-[#282828] mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#D72B81] transition-colors duration-200 line-clamp-2">
                      {story.title}
                    </h3>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span className="mr-2">
                        {story.author || "Unknown Author"}
                      </span>
                      <span>•</span>
                      <span className="ml-2">
                        {new Date(story.created_at).toLocaleDateString()}
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
