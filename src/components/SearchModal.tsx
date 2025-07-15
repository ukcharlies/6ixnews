"use client";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setSearchQuery, clearSearch } from "@/lib/store/categorySlice";
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
  const getCategoryName = (category: string | object): string => {
    if (!category) return "Uncategorized";
    if (typeof category === "string") return category;
    if (typeof category === "object" && "category_name" in category) {
      return (category as any).category_name;
    }
    return "Uncategorized";
  };

  // Filter stories based on search query with real-time updates
  const filteredStories = localQuery.trim()
    ? allStories
        .filter(
          (story) =>
            story.title?.toLowerCase().includes(localQuery.toLowerCase()) ||
            story.excerpt?.toLowerCase().includes(localQuery.toLowerCase()) ||
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

  const handleStoryClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Search Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Search Stories
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {localQuery.trim() ? (
            filteredStories.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/stories/${story.id}`}
                    onClick={handleStoryClick}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {story.excerpt}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                            {getCategoryName(story.category)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(story.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p>No stories found for "{localQuery}"</p>
                <p className="text-sm mt-1">Try adjusting your search terms</p>
              </div>
            )
          ) : (
            <div className="p-8 text-center text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p>Start typing to search stories</p>
            </div>
          )}
        </div>

        {/* Footer */}
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
