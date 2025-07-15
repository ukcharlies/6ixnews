"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setSelectedCategory } from "@/lib/store/categorySlice";
import { ICategory } from "@/types/story";

interface CategoryNavProps {
  categories: ICategory[];
  isLoading?: boolean;
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

  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  if (isLoading) {
    return (
      <div className="py-4">
        <div className="flex space-x-4 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-gray-200 rounded animate-pulse flex-shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="py-4">
      <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
        {/* All Stories */}
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            selectedCategoryId === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Stories
        </button>

        {/* Category Buttons */}
        {safeCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategoryId === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
