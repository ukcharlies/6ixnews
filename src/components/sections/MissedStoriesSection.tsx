import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard";
import ErrorMessage from "@/components/ui/ErrorMessage";

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
      <h2 className="text-2xl font-bold mb-6">Stories You Missed</h2>
      {safeStories.length === 0 ? (
        <p className="text-gray-600">No missed stories available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeStories.map((story) => (
            <StoryCard key={story.id} story={story} variant="compact" />
          ))}
        </div>
      )}
    </section>
  );
}
