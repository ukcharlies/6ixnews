"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategoryStories } from "@/lib/api/client";
import TopStoriesSection from "@/components/sections/TopStoriesSection";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = parseInt(params.id as string);

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["categoryStories", categoryId],
    queryFn: () => fetchCategoryStories(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="container mx-auto px-4">
      <TopStoriesSection
        stories={stories}
        isLoading={isLoading}
        title="Category Stories"
      />
    </div>
  );
}
