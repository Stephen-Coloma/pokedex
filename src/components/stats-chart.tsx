import { useTheme } from "next-themes";

export function StatsChart({ data, primaryColor }: { data: any[], primaryColor: string }) {
  const { theme } = useTheme();
  const strokeColor = theme === "light" ? "rgba(100, 100, 100, 0.5)" : "rgba(200, 200, 200, 0.2)";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400">
        {/* Background circles */}
        <circle cx="200" cy="200" r="120" fill="none" stroke={`${strokeColor}`} />
        <circle cx="200" cy="200" r="90" fill="none" stroke={`${strokeColor}`} />
        <circle cx="200" cy="200" r="60" fill="none" stroke={`${strokeColor}`} />
        <circle cx="200" cy="200" r="30" fill="none" stroke={`${strokeColor}`} />
        
        {/* Axis lines */}
        {data.map((entry, index) => {
          const angle = (Math.PI * 2 * index) / data.length;
          const x = 200 + 120 * Math.sin(angle);
          const y = 200 - 120 * Math.cos(angle);
          return (
            <line 
              key={`axis-${index}`}
              x1="200" 
              y1="200" 
              x2={x} 
              y2={y} 
              stroke= {`${strokeColor}`}
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon 
          points={data.map((entry, index) => {
            const angle = (Math.PI * 2 * index) / data.length;
            const value = Math.min(entry.value, 150); // Cap at 150
            const radius = (value / 150) * 120;
            const x = 200 + radius * Math.sin(angle);
            const y = 200 - radius * Math.cos(angle);
            return `${x},${y}`;
          }).join(' ')}
          fill={`${primaryColor}80`} // Add 50% transparency
          stroke={primaryColor}
          strokeWidth="2"
        />
        
        {/* Data points */}
        {data.map((entry, index) => {
          const angle = (Math.PI * 2 * index) / data.length;
          const value = Math.min(entry.value, 150); // Cap at 150
          const radius = (value / 150) * 120;
          const x = 200 + radius * Math.sin(angle);
          const y = 200 - radius * Math.cos(angle);
          return (
            <circle 
              key={`point-${index}`}
              cx={x} 
              cy={y} 
              r="4" 
              fill={primaryColor} 
            />
          );
        })}
        
        {/* Labels */}
        {data.map((entry, index) => {
          const angle = (Math.PI * 2 * index) / data.length;
          const x = 200 + 150 * Math.sin(angle); // Increased radius for labels
          const y = 200 - 150 * Math.cos(angle);
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
              fill="currentColor"
              className={`text-md sm:text-sm md:text-base lg:text-sm text-gray-700 dark:text-gray-300`}
            >
              {entry.subject}
            </text>
          );
        })}
        
        {/* Value indicators */}
        {data.map((entry, index) => {
          const angle = (Math.PI * 2 * index) / data.length;
          const value = Math.min(entry.value, 150); // Cap at 150
          const radius = (value / 150) * 120 + 25; // Increased offset
          const x = 200 + radius * Math.sin(angle);
          const y = 200 - radius * Math.cos(angle);
          return (
            <text 
              key={`value-${index}`}
              x={x} 
              y={y} 
              textAnchor="middle"
              fontWeight="bold"
              fill={primaryColor}
              className="text-md sm:text-sm md:text-base lg:text-sm"
            >
              {entry.value}
            </text>
          );
        })}
      </svg>
    </div>
  );
}