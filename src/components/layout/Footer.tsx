"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setSearchQuery, setSelectedCategory } from "@/lib/store/categorySlice";
import { useCategories } from "@/hooks/useCategories";

export default function Footer() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.category);
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryClick = (categoryId: number | null) => {
    dispatch(setSelectedCategory(categoryId));
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

  // Prepare categories with Home first
  const allCategories = [
    { id: null, name: "Home" },
    ...categories.filter(
      (cat) => cat && typeof cat.id === "number" && cat.name
    ),
  ];

  // Additional footer links
  const additionalLinks = [
    { name: "Photos", href: "/photos" },
    { name: "Videos", href: "/videos" },
    { name: "Audio", href: "/audio" },
    { name: "AGC Archive", href: "/archive" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Advert Rate", href: "/advert-rate" },
    { name: "Bookmarks", href: "/bookmarks" },
  ];

  // Combine all navigation items
  const allNavItems = [
    ...allCategories,
    ...additionalLinks.map((link) => ({
      id: null,
      name: link.name,
      href: link.href,
    })),
  ];

  // Create mobile grid with empty row
  const createMobileGrid = () => {
    const items = [];

    // First 9 items (3 rows)
    for (let i = 0; i < 9 && i < allNavItems.length; i++) {
      items.push(allNavItems[i]);
    }

    // Empty row (3 empty cells)
    items.push(null, null, null);

    // Remaining items
    for (let i = 9; i < allNavItems.length; i++) {
      items.push(allNavItems[i]);
    }

    return items;
  };

  const mobileGridItems = createMobileGrid();

  return (
    <footer className="bg-[#1B1B1B] text-white font-['Euclid_Circular_A'] mt-8">
      <div className="container mx-auto px-4 py-8">
        {/* Row 1: Logo and Social Media */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/AGC logo.png"
              alt="AGC News"
              width={80}
              height={40}
              className="h-8 w-auto lg:h-10"
            />
          </Link>

          <div className="flex space-x-4">
            {socialMediaLinks.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                className="hover:opacity-80 transition-opacity"
                aria-label={social.name}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d={social.icon} />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2: Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search AGC Newsnet"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 bg-white text-black placeholder-gray-500 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D32C89] transition-colors"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
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

        {/* Row 3: Categories and Links Grid */}
        <div className="mb-8">
          {/* Mobile: 3 columns with empty 4th row */}
          <div className="grid grid-cols-3 gap-3 lg:hidden">
            {mobileGridItems.map((item, index) => {
              if (!item) {
                return <div key={`empty-${index}`} className="h-10"></div>;
              }

              if ("href" in item && item.href) {
                return (
                  <Link
                    key={`${item.name}-${index}`}
                    href={item.href}
                    className="text-left py-2 px-1 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors text-xs leading-tight"
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <button
                  key={
                    item.id !== null
                      ? `cat-${item.id}`
                      : `${item.name}-${index}`
                  }
                  onClick={() => handleCategoryClick(item.id)}
                  className="text-left py-2 px-1 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors text-xs leading-tight"
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Desktop: 5 columns */}
          <div className="hidden lg:grid grid-cols-5 gap-6">
            {allNavItems.map((item, index) => {
              if ("href" in item && item.href) {
                return (
                  <Link
                    key={`desktop-${item.name}-${index}`}
                    href={item.href}
                    className="text-left py-3 px-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <button
                  key={
                    item.id !== null
                      ? `desktop-cat-${item.id}`
                      : `desktop-${item.name}-${index}`
                  }
                  onClick={() => handleCategoryClick(item.id)}
                  className="text-left py-3 px-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Loading state */}
          {categoriesLoading && (
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-10 lg:h-12 bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          )}
        </div>

        {/* Row 4: Copyright */}
        <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
          © 2024 AGC Newsnet. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
