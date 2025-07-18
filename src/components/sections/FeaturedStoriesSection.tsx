import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface FeaturedStoriesSectionProps {
  stories: IStory[];
  isLoading?: boolean;
  error?: Error | null;
}

export default function FeaturedStoriesSection({
  stories,
  isLoading,
  error,
}: FeaturedStoriesSectionProps) {
  // Add safety check for stories
  const safeStories = Array.isArray(stories) ? stories : [];

  if (error) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
        <ErrorMessage message="Failed to load featured stories" />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
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
      <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
      {safeStories.length === 0 ? (
        <p className="text-gray-600">No stories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </section>
  );
}
