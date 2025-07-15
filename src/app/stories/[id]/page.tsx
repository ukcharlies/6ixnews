import { Suspense } from "react";
import { Metadata } from "next";
import { fetchSingleStory } from "@/lib/api/client";
import { notFound } from "next/navigation";
import StoryContent from "@/components/sections/StoryContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { IStory } from "@/types/story";

interface StoryPageProps {
  params: Promise<{ id: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const story = await fetchSingleStory(Number(id));

    return {
      title: `${story.title} | 6ixNews`,
      description: story.excerpt,
      openGraph: {
        title: story.title,
        description: story.excerpt,
        images: story.imageUrl ? [story.imageUrl] : [],
        type: "article",
        authors: [story.author],
        publishedTime: story.date,
      },
      twitter: {
        card: "summary_large_image",
        title: story.title,
        description: story.excerpt,
        images: story.imageUrl ? [story.imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "Story Not Found | 6ixNews",
      description: "The requested story could not be found.",
    };
  }
}

// Story Content Component with Error Boundary
async function StoryContentWrapper({ storyId }: { storyId: number }) {
  try {
    const story: IStory = await fetchSingleStory(storyId);
    return <StoryContent story={story} />;
  } catch (error) {
    console.error("Error fetching story:", error);
    notFound();
  }
}

// Loading Component
function StoryLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { id } = await params;
  const storyId = Number(id);

  if (isNaN(storyId) || storyId <= 0) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<StoryLoading />}>
          <StoryContentWrapper storyId={storyId} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
