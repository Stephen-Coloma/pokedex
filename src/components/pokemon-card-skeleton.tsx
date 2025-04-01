import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function PokemonCardSkeleton() {
  return (
    <Card className="p-2 w-full max-w-xs overflow-hidden border-0 shadow-lg">
      <CardContent className="p-6">
        {/* Name & ID Skeleton */}
        <div className="w-full flex justify-between items-start mb-2">
          <Skeleton className="h-[2rem] w-[50%] rounded-md"></Skeleton>
          <Skeleton className="h-[2rem] w-[15%] rounded-full"></Skeleton>
        </div>

        {/* Image Container Skeleton */}
        <div className="flex justify-center my-4">
          <div
            className="relative w-60 h-60 flex justify-center items-center bg-gray-200 rounded-md"
          >
            <Skeleton className="w-48 h-48 bg-gray-200"></Skeleton>
          </div>
        </div>

        {/* Type Badges Skeleton */}
        <div className="flex gap-2 justify-center mt-4">
          <Skeleton className="h-[1.75rem] w-[25%] rounded-md"></Skeleton>
          <Skeleton className="h-[1.75rem] w-[25%] rounded-md"></Skeleton>
        </div>
      </CardContent>
    </Card>
  );
}
