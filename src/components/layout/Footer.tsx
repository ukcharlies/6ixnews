import Link from "next/link";

export default function Footer() {
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
              <li>
                <Link href="/africa" className="text-gray-400 hover:text-white">
                  Africa
                </Link>
              </li>
              <li>
                <Link
                  href="/politics"
                  className="text-gray-400 hover:text-white"
                >
                  Politics
                </Link>
              </li>
              <li>
                <Link
                  href="/business"
                  className="text-gray-400 hover:text-white"
                >
                  Business
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sports" className="text-gray-400 hover:text-white">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/health" className="text-gray-400 hover:text-white">
                  Health
                </Link>
              </li>
              <li>
                <Link href="/tech" className="text-gray-400 hover:text-white">
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/opinion"
                  className="text-gray-400 hover:text-white"
                >
                  Opinion
                </Link>
              </li>
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
