import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard";
import ErrorMessage from "@/components/ui/ErrorMessage";

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
  // Ensure stories is always an array
  const safeStories = Array.isArray(stories) ? stories : [];

  if (error) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Latest Stories</h2>
        <ErrorMessage message="Failed to load latest stories" />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Latest Stories</h2>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-4">
              <div className="h-16 w-24 bg-gray-200 rounded" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Latest Stories</h2>
      {safeStories.length === 0 ? (
        <p className="text-gray-600">No latest stories available.</p>
      ) : (
        <div className="space-y-4">
          {safeStories.map((story) => (
            <StoryCard key={story.id} story={story} variant="horizontal" />
          ))}
        </div>
      )}
    </section>
  );
}
