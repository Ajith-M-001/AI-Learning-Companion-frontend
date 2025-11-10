"use client";

import { Lightbulb, Brain, BookOpen, TrendingUp } from "lucide-react";

interface AuthHeroProps {
  title: string;
  subtitle: string;
  tagline?: string;
}

export function AuthHero({ title, subtitle, tagline }: AuthHeroProps) {
  return (
    <div className="hidden lg:flex relative w-[60%] overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-purple-400 text-white">
      {/* Animated background overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-300 animate-gradient opacity-90" />

      {/* Content container */}
      <div className="relative z-10 flex flex-col justify-between w-full p-12">
        {/* Logo / Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm shadow-lg text-lg font-semibold">
            ALC
          </div>
          <span className="text-xl font-medium">{title}</span>
        </div>

        {/* Central illustration */}
        <div className="flex flex-col items-center justify-center flex-1 py-10">
          <div className="relative flex items-center justify-center w-72 h-72">
            {/* Glowing center */}
            <div className="absolute w-56 h-56 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

            {/* Main circle icon */}
            <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg shadow-lg">
              <Lightbulb className="w-14 h-14 text-yellow-300 fill-yellow-300 animate-pulse" />
            </div>

            {/* Peripheral icons */}
            <div className="absolute w-full h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-blue-300/40 backdrop-blur-sm animate-float">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-purple-300/40 backdrop-blur-sm animate-float-delayed">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-green-300/40 backdrop-blur-sm animate-float">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Text section */}
          <div className="text-center mt-10 space-y-3">
            <h2 className="text-3xl font-semibold">{subtitle}</h2>
            {tagline && (
              <p className="text-white/80 text-lg max-w-md mx-auto">
                {tagline}
              </p>
            )}
          </div>
        </div>

        {/* Footer stats */}
        <div className="grid grid-cols-3 gap-4 text-center text-white/80">
          <div>
            <p className="text-2xl font-semibold">10K+</p>
            <p className="text-sm">Active Learners</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">500+</p>
            <p className="text-sm">Learning Paths</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">95%</p>
            <p className="text-sm">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
