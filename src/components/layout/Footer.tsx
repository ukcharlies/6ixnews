"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";

export default function Footer() {
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-blue-400">
              6ixNews
            </Link>
            <p className="mt-4 text-gray-400">
              Stay updated with the latest news from Africa and around the
              world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              {categoriesLoading
                ? // Loading skeleton
                  Array.from({ length: 3 }).map((_, i) => (
                    <li key={`quick-links-skeleton-${i}`}>
                      <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                    </li>
                  ))
                : // Dynamic category links (first half)
                  categories
                    .slice(0, Math.ceil(categories.length / 2))
                    .map((category) => (
                      <li key={`quick-link-${category.id}`}>
                        <Link
                          href={`/?category=${category.id}`}
                          className="text-gray-400 hover:text-white"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categoriesLoading
                ? // Loading skeleton
                  Array.from({ length: 4 }).map((_, i) => (
                    <li key={`categories-skeleton-${i}`}>
                      <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
                    </li>
                  ))
                : // Dynamic category links (second half)
                  categories
                    .slice(Math.ceil(categories.length / 2))
                    .map((category) => (
                      <li key={`category-link-${category.id}`}>
                        <Link
                          href={`/?category=${category.id}`}
                          className="text-gray-400 hover:text-white"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@6ixnews.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: Toronto, Canada</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 6ixNews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
