export function StatsSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400">
        {/* Background circles */}
        <circle cx="200" cy="200" r="120" fill="none" stroke='rgba(100, 100, 100, 0.5)' strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="90" fill="none" stroke='rgba(100, 100, 100, 0.5)' strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="60" fill="none" stroke='rgba(100, 100, 100, 0.5)' strokeDasharray="4 4" />
        <circle cx="200" cy="200" r="30" fill="none" stroke='rgba(100, 100, 100, 0.5)' strokeDasharray="4 4" />

        {/* Axis lines */}
        {["Special Attack", "Attack", "Defense", "Special Defense", "Speed", "HP"].map((_, index) => {
          const angle = (Math.PI * 2 * index) / 6;
          const x = Math.round(200 + 120 * Math.sin(angle));
          const y = Math.round(200 - 120 * Math.cos(angle));

          return (
            <line
              key={`axis-${index}`}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke='rgba(100, 100, 100, 0.5)'
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Labels */}
        {["Special Attack", "Attack", "Defense", "Special Defense", "Speed", "HP"].map((label, index) => {
          const angle = (Math.PI * 2 * index) / 6;
          const x = Math.round(200 + 150 * Math.sin(angle));
          const y = Math.round(200 - 150 * Math.cos(angle));

          const textAnchor =
            angle === 0 ? "middle" :
            angle < Math.PI ? "start" :
            angle === Math.PI ? "middle" : "end";

          const dy =
            angle === 0 ? "-0.5em" :
            angle === Math.PI ? "1em" : "0.3em";

          return (
            <text
              key={`label-${index}`}
              x={x}
              y={y}
              textAnchor={textAnchor}
              dy={dy}
              className="text-md sm:text-sm md:text-base lg:text-sm text-gray-400 dark:text-gray-500"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
