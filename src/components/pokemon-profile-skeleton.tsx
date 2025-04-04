"use client"

import { Card, CardContent } from "./ui/card"
import { BookOpen, ChevronDown, Zap, Info, Flame, GitBranch } from "lucide-react"
import { Button } from "./ui/button"
import { StatsSkeleton } from "./stats-skeleton"

export function PokemonProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Header Card - Name, ID, Photo */}
      <Card className="col-span-1 md:col-span-3 overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-700">
        <div className="relative bg-opacity-20 dark:bg-opacity-10 p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Left section: Image and details - 50% width on desktop */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
              {/* Skeleton for Pokemon image */}
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col items-center mt-4 w-full">
              {/* Skeleton for ID */}
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2" />
              {/* Skeleton for name */}
              <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-4" />
              {/* Skeleton for types */}
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right section: Radar chart - 50% width on desktop */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 flex items-center justify-center">
            <div className="w-full max-w-md">
              <StatsSkeleton></StatsSkeleton>
            </div>
          </div>
        </div>
      </Card>

      {/* Left Column */}
      <div className="col-span-1 md:col-span-2 space-y-6">
        {/* Description Card */}
        <Card className="overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-gray-400" />
              <h2 className="text-xl font-semibold">Description</h2>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex">
                  <span className="inline-block w-15 flex-shrink-0 font-medium text-gray-400">[{index + 1}]</span>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                </div>
              ))}
              <Button disabled className="flex items-center gap-1 mt-2 bg-gray-300 dark:bg-gray-600">
                Show More <ChevronDown size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Abilities Card */}
        <Card className="overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-gray-400" />
              <h2 className="text-xl font-semibold">Abilities</h2>
            </div>
            <div className="grid gap-4">
              {[1, 2].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700"
                >
                  <div className="font-medium text-lg mb-4 flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2 bg-gray-300 dark:bg-gray-600"></div>
                    <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" ></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="col-span-1 space-y-6">
        {/* Basic Info Card */}
        <Card className="overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-gray-400" />
              <h2 className="text-xl font-semibold">Basic Info</h2>
            </div>
            <div className="space-y-3">
              {["Height", "Weight", "Base Experience"].map((label, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{label}</span>
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weaknesses Card */}
        <Card className="overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="text-gray-400" />
              <h2 className="text-xl font-semibold">Weaknesses</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evolution Chain Card */}
        <Card className="overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="text-gray-400" />
              <h2 className="text-xl font-semibold">Evolution Chain</h2>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

