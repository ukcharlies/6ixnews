"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  setSearchQuery,
  clearSearch,
  setSelectedCategory,
} from "@/lib/store/categorySlice";
import { useCategories } from "@/hooks/useCategories";
import SearchModal from "@/components/SearchModal";
import { useQuery } from "@tanstack/react-query";
import { fetchEditorsPicks, fetchTopStories } from "@/lib/api/client";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const dispatch = useAppDispatch();

  const router = useRouter();

  // Fetch dynamic categories
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  // Fetch all stories
  const { data: editorsPicks = [] } = useQuery({
    queryKey: ["editorsPicks"],
    queryFn: () => fetchEditorsPicks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: latestStories = [] } = useQuery({
    queryKey: ["latestStories"],
    queryFn: () => fetchEditorsPicks(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: topStories = [] } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
    staleTime: 5 * 60 * 1000,
  });

  // Combine all stories and remove duplicates
  const allStories = [
    ...new Map(
      [...editorsPicks, ...latestStories, ...topStories].map((story) => [
        story.id,
        story,
      ])
    ).values(),
  ];

  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setCurrentDateTime(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchClear = () => {
    dispatch(clearSearch());
  };

  const handleCategoryClick = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId));
    setMobileMenuOpen(false);
    // Navigate to the appropriate route
    if (categoryId === null) {
      router.push("/");
    } else {
      router.push(`/categories/${categoryId}`);
    }
  };

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const socialMediaLinks = [
    {
      name: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
      url: "#",
    },
    {
      name: "Facebook",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      url: "#",
    },
    {
      name: "Twitter",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
      url: "#",
    },
    {
      name: "Pinterest",
      icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z",
      url: "#",
    },
    {
      name: "LinkedIn",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      url: "#",
    },
  ];

  return (
    <>
      <header className="font-['Euclid_Circular_A']">
        {/* Desktop Top Bar - Only visible on large screens */}
        <div className="hidden lg:block bg-[#D32C89] text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            {/* Left side links */}
            <div className="flex space-x-6">
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
              <Link href="/agc-rate" className="hover:underline">
                AGC Rate
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>

            {/* Right side - Date and Social Media */}
            <div className="flex items-center space-x-6">
              <span className="font-medium">{currentDateTime}</span>
              <div className="flex space-x-3">
                {socialMediaLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="hover:opacity-80 transition-opacity"
                    aria-label={social.name}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden bg-[#1B1B1B]">
          <div className="flex items-center justify-between py-3 px-4">
            {/* Left side - Hamburger, Search, and Logo */}
            <div className="flex items-center space-x-3 flex-1">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-1"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <button onClick={handleSearchClick} className="text-white p-1">
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

              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/AGC logo.png"
                  alt="AGC News"
                  width={60}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Right side - Profile */}
            <button className="text-white p-1">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Nav Image - Below mobile header, outside dark background */}
        <div className="lg:hidden bg-gray-50 px-4 py-3">
          <div className="w-full h-16 rounded-lg overflow-hidden">
            <Image
              src="/nav-image.png"
              alt="Navigation"
              width={900}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Desktop Header - Three Row Layout */}
        <div className="hidden lg:block bg-[#1B1B1B]">
          {/* Second Row - Logo and Nav Image */}
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex-shrink-0"></Link>

              <div className="flex-1 mx-8">
                <div className="w-full h-20 rounded-lg overflow-hidden">
                  <Image
                    src="/nav-image.png"
                    alt="Navigation"
                    width={800}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Third Row - Logo, Categories, and Options */}
          <div className="border-t border-gray-600">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                {/* Left side - Logo and Categories */}
                <div className="flex items-center space-x-8">
                  <Link href="/" className="flex-shrink-0">
                    <Image
                      src="/AGC logo.png"
                      alt="AGC News"
                      width={80}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>

                  <nav className="flex space-x-6">
                    <Link
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(null);
                      }}
                      className="relative text-white font-medium transition-colors group py-2"
                    >
                      Home
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>

                    {categoriesLoading
                      ? Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={`desktop-skeleton-${i}`}
                            className="h-6 w-20 bg-gray-600 rounded animate-pulse"
                          />
                        ))
                      : categories
                          .filter(
                            (category) =>
                              category &&
                              typeof category.id === "number" &&
                              category.name
                          )
                          .slice(0, 6)
                          .map((category) => (
                            <Link
                              key={`desktop-category-${category.id}`}
                              href={`/categories/${category.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleCategoryClick(category.id);
                              }}
                              className="relative text-white font-medium transition-colors group py-2"
                            >
                              {category.name}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                            </Link>
                          ))}
                  </nav>
                </div>

                {/* Right side - Separator and Additional Options */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-lg">|</span>

                  <nav className="flex items-center space-x-4">
                    <Link
                      href="/photos"
                      className="relative text-white font-medium transition-colors group py-2"
                    >
                      Photos
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>
                    <Link
                      href="/videos"
                      className="relative text-white font-medium transition-colors group py-2"
                    >
                      Videos
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>
                    <Link
                      href="/audio"
                      className="relative text-white font-medium transition-colors group py-2"
                    >
                      Audio
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>

                    <button
                      onClick={handleSearchClick}
                      className="text-white hover:text-gray-300 p-1"
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

                    <Link
                      href="/login"
                      className="relative text-white font-medium transition-colors group py-2"
                    >
                      Login
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>

                    <span className="text-gray-400">/</span>

                    <Link
                      href="/signup"
                      className="relative text-white font-medium transition-colors group py-2"
                    >
                      Sign Up
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>

                    <Link
                      href="/login"
                      className="relative text-white font-medium transition-colors group py-2"
                    >
                      Login
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>

                    <span className="text-gray-400">/</span>

                    <Link
                      href="/signup"
                      className="relative text-white font-medium transition-colors group py-2"
                    >
                      Sign Up
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F52A32] transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1B1B1B] border-t border-gray-600">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(null);
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded"
              >
                Home
              </Link>

              {categoriesLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`mobile-skeleton-${i}`}
                      className="h-12 bg-gray-700 rounded animate-pulse mx-4"
                    />
                  ))
                : categories
                    .filter(
                      (category) =>
                        category &&
                        typeof category.id === "number" &&
                        category.name
                    )
                    .map((category) => (
                      <Link
                        key={`mobile-category-${category.id}`}
                        href={`/categories/${category.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category.id);
                        }}
                        className="block w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded"
                      >
                        {category.name}
                      </Link>
                    ))}

              <div className="pt-4 mt-4 border-t border-gray-600 space-y-2">
                <Link
                  href="/photos"
                  className="block px-4 py-3 text-white hover:bg-gray-700 rounded"
                >
                  Photos
                </Link>
                <Link
                  href="/videos"
                  className="block px-4 py-3 text-white hover:bg-gray-700 rounded"
                >
                  Videos
                </Link>
                <Link
                  href="/audio"
                  className="block px-4 py-3 text-white hover:bg-gray-700 rounded"
                >
                  Audio
                </Link>
                <div className="flex space-x-2 px-4 pt-2">
                  <Link
                    href="/login"
                    className="flex-1 text-center px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-[#1B1B1B] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 text-center px-4 py-2 bg-[#D32C89] text-white rounded hover:bg-opacity-90 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        allStories={allStories}
      />
    </>
  );
}
