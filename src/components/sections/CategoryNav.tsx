"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setSelectedCategory } from "@/lib/store/categorySlice";

interface Category {
  id: number;
  name: string;
  totalStories?: number;
}

interface CategoryNavProps {
  categories: Category[];
  isLoading: boolean;
}

export default function CategoryNav({
  categories,
  isLoading,
}: CategoryNavProps) {
  const dispatch = useAppDispatch();
  const { selectedCategoryId } = useAppSelector((state) => state.category);

  const handleCategoryClick = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId));
  };

  if (isLoading) {
    return (
      <nav className="flex space-x-6 py-4 overflow-x-auto">
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse flex-shrink-0" />
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`category-nav-skeleton-${index}`}
            className="h-8 w-20 bg-gray-200 rounded animate-pulse flex-shrink-0"
          />
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex space-x-6 py-4 overflow-x-auto">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          selectedCategoryId === null
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
        }`}
      >
        All Stories
      </button>
      {categories
        .filter(
          (category) =>
            category && typeof category.id === "number" && category.name
        )
        .map((category) => (
          <button
            key={`category-nav-${category.id}`}
            onClick={() => handleCategoryClick(category.id)}
            className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              selectedCategoryId === category.id
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            {category.name}
          </button>
        ))}
    </nav>
  );
}
