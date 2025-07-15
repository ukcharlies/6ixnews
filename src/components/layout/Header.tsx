"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  setSearchQuery,
  clearSearch,
  setSelectedCategory,
} from "@/lib/store/categorySlice";
import { useCategories } from "@/hooks/useCategories";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.category);

  // Fetch dynamic categories
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchClear = () => {
    dispatch(clearSearch());
  };

  const handleCategoryClick = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId));
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              6ixNews
            </Link>

            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => handleCategoryClick(null)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </button>

              {categoriesLoading
                ? // Loading skeleton for categories
                  Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`header-desktop-skeleton-${i}`}
                      className="h-5 w-16 bg-gray-200 rounded animate-pulse"
                    />
                  ))
                : // Dynamic category links - filter out invalid categories
                  categories
                    .filter(
                      (category) =>
                        category &&
                        typeof category.id === "number" &&
                        category.name
                    )
                    .slice(0, 5)
                    .map((category) => (
                      <button
                        key={`header-desktop-category-${category.id}`}
                        onClick={() => handleCategoryClick(category.id)}
                        className="text-gray-700 hover:text-blue-600 font-medium"
                      >
                        {category.name}
                      </button>
                    ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Auth Button */}
            <button className="hidden md:block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
              Sign In
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? (
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
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => handleCategoryClick(null)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Home
              </button>

              {categoriesLoading
                ? // Loading skeleton for mobile
                  Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`header-mobile-skeleton-${i}`}
                      className="h-10 bg-gray-200 rounded animate-pulse mx-4"
                    />
                  ))
                : // Dynamic category buttons for mobile - filter out invalid categories
                  categories
                    .filter(
                      (category) =>
                        category &&
                        typeof category.id === "number" &&
                        category.name
                    )
                    .map((category) => (
                      <button
                        key={`header-mobile-category-${category.id}`}
                        onClick={() => handleCategoryClick(category.id)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {category.name}
                      </button>
                    ))}
            </nav>

            <div className="mt-4 pt-4 border-t">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
