import React from "react";
import styles from "./Feature.module.css";
import { PenTool, Share2, Users } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: PenTool,
      title: "Write Freely",
      description:
        "Create beautiful posts with our minimal editor. Focus on your content.",
    },
    {
      icon: Share2,
      title: "Share Easily",
      description:
        "Publish and share your thoughts with a global community of readers.",
    },
    {
      icon: Users,
      title: "Connect",
      description:
        "Engage with other writers and grow your audience over time.",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="flex flex-col gap-8 items-center justify-center py-14 px-4 text-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Share Your Stories
          </h1>
          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
            Write, publish, and share your thoughts with the world. A simple,
            elegant platform for bloggers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto">
          <button
            className="bg-gray-800 text-gray-100 rounded-xl w-full sm:w-64 py-3 px-5 text-lg hover:bg-gray-700 font-semibold tracking-wide transition"
            type="button"
          >
            Get Started Free
          </button>
          <button
            className="border border-gray-300 bg-white rounded-xl w-full sm:w-64 py-3 px-5 text-lg hover:bg-gray-100 font-semibold tracking-wide transition"
            type="button"
          >
            Browse Posts
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 px-4 bg-gray-50">
        <h2 className="text-center font-bold text-2xl sm:text-3xl text-gray-800 mb-10 font-serif tracking-wide">
          Why BlogHub
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="flex-1 p-6 border border-gray-300 rounded-xl hover:bg-white hover:shadow-md transition"
              >
                <Icon className="w-12 h-12 text-gray-700 mb-4 mx-auto md:mx-0" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center md:text-left">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center md:text-left">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
