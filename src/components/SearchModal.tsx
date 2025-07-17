"use client";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setSearchQuery, clearSearch } from "@/lib/store/categorySlice";
import { Search, X } from "lucide-react";
import { IStory } from "@/types/story";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allStories: IStory[];
}

export default function SearchModal({
  isOpen,
  onClose,
  allStories,
}: SearchModalProps) {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.category);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper function to safely get category name
  const getCategoryName = (category: any): string => {
    if (!category) return "Uncategorized";
    if (typeof category === "string") return category;
    if (typeof category === "object" && "category_name" in category) {
      return category.category_name;
    }
    return "Uncategorized";
  };

  // Filter stories based on search query with real-time updates
  const filteredStories = localQuery.trim()
    ? allStories
        .filter(
          (story) =>
            story.title?.toLowerCase().includes(localQuery.toLowerCase()) ||
            story.description
              ?.toLowerCase()
              .includes(localQuery.toLowerCase()) ||
            getCategoryName(story.category)
              .toLowerCase()
              .includes(localQuery.toLowerCase())
        )
        .slice(0, 10) // Limit to 10 results
    : [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Update local query and dispatch to store on every change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    dispatch(setSearchQuery(value));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleClearSearch = () => {
    setLocalQuery("");
    dispatch(clearSearch());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Search Stories
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="p-4 border-b">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search stories by title, content, or category..."
              value={localQuery}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              {localQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
              <button
                type="submit"
                className="text-gray-400 hover:text-gray-600"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </form>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {localQuery.trim() ? (
            filteredStories.length > 0 ? (
              <div className="divide-y">
                {filteredStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/stories/${story.id}`}
                    onClick={onClose}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {story.title}
                        </h3>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-sm text-gray-500">
                            {getCategoryName(story.category)}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {story.author || "Unknown Author"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No stories found for "{localQuery}"</p>
                <p className="text-sm mt-1">Try adjusting your search terms</p>
              </div>
            )
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>Start typing to search stories</p>
            </div>
          )}
        </div>

        {/* View All Results */}
        {localQuery.trim() && filteredStories.length > 0 && (
          <div className="p-4 bg-gray-50 text-center">
            <button
              onClick={handleSearchSubmit}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all results for "{localQuery}"
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
