"use client";

import Image from "next/image";
import { useState } from "react";

interface FormState {
  email: string;
  isSubmitting: boolean;
}

const GetUpdatesSection = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    isSubmitting: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    // Handle email subscription logic here
    console.log("Email submitted:", formState.email);
    setFormState({ email: "", isSubmitting: false }); // Clear form after submission
  };

  return (
    <section className="-mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Subscription Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center space-x-8 mb-6">
              <div className="w-16 h-16 flex-shrink-0">
                <Image
                  src="/email.png"
                  alt="Email Updates"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-lg text-gray-700 flex-1">
                Get the latest news and stories from around Africa directly into
                your inbox daily.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-[#DEDEDE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F52A32]"
                required
                suppressHydrationWarning
              />
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full px-4 py-3 bg-[#D72B81] text-white font-medium rounded-lg hover:bg-[#905472] transition-colors duration-200"
              >
                {formState.isSubmitting ? "Submitting..." : "Get Me In"}
              </button>
            </form>
          </div>

          {/* Advertisement Section */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden h-full">
            <Image
              src="/footer-ads.png"
              alt="Advertisement"
              width={1200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetUpdatesSection;
