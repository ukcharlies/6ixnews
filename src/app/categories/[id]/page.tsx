"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategoryStories, fetchCategories } from "@/lib/api/client";
import TopStoriesSection from "@/components/sections/TopStoriesSection";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = parseInt(params.id as string);

  const { data: stories = [], isLoading: storiesLoading } = useQuery({
    queryKey: ["categoryStories", categoryId],
    queryFn: () => fetchCategoryStories(categoryId),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchCategories(),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });

  const category = categories?.find((cat) => cat.id === categoryId);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <TopStoriesSection
          stories={stories}
          isLoading={storiesLoading || categoryLoading}
          title={category ? `${category.name} Stories` : "Loading..."}
        />
      </div>
      <Footer />
    </>
  );
}
