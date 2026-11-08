import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'bone';
  showSubtitle?: boolean;
}

export const ButterflyMonogram: React.FC<{
  className?: string;
  color?: string;
  size?: number;
}> = ({ className = 'w-8 h-8', color = 'currentColor', size = 32 }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      aria-label="MONARCH Butterfly Monogram"
    >
      {/* Editorial 'M' stems */}
      <path
        d="M14 85V15H24L50 56L76 15H86V85H75V35L52.5 70H47.5L25 35V85H14Z"
        fill={color}
      />
      {/* Symmetrical Intricate Monarch Butterfly in Center */}
      <g transform="translate(50, 48) scale(0.42)">
        {/* Butterfly Body */}
        <ellipse cx="0" cy="0" rx="2.5" ry="14" fill={color} />
        <circle cx="0" cy="-17" r="2.5" fill={color} />
        {/* Antennae */}
        <path
          d="M-1 -18 C-4 -26 -10 -28 -14 -26 M1 -18 C4 -26 10 -28 14 -26"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Upper Left Wing */}
        <path
          d="M-2 -8 C-12 -22 -32 -26 -46 -16 C-52 -7 -50 12 -38 20 C-26 26 -12 18 -2 6 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
        />
        <path
          d="M-14 -12 C-26 -8 -36 2 -40 12 M-20 -4 C-28 6 -34 14 -32 20 M-6 -8 C-18 -16 -32 -18 -42 -12"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Upper Right Wing */}
        <path
          d="M2 -8 C12 -22 32 -26 46 -16 C52 -7 50 12 38 20 C26 26 12 18 2 6 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
        />
        <path
          d="M14 -12 C26 -8 36 2 40 12 M20 -4 C28 6 34 14 32 20 M6 -8 C18 -16 32 -18 42 -12"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Lower Left Wing */}
        <path
          d="M-2 4 C-10 12 -26 16 -32 28 C-36 38 -24 46 -14 42 C-4 38 -2 22 -1 12 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
        />
        {/* Lower Right Wing */}
        <path
          d="M2 4 C10 12 26 16 32 28 C36 38 24 46 14 42 C4 38 2 22 1 12 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
        />
      </g>
    </svg>
  );
};

export const MonarchWordmark: React.FC<{
  className?: string;
  theme?: 'dark' | 'light';
}> = ({ className = '', theme = 'dark' }) => {
  const textColor = theme === 'dark' ? 'text-[#262621]' : 'text-[#E1C9B0]';
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <span
        className={`font-serif tracking-[0.2em] font-normal text-xl md:text-2xl uppercase ${textColor}`}
      >
        MONARCH
      </span>
      <div className="flex items-center gap-2 mt-0.5">
        <span
          className={`text-[9px] uppercase tracking-[0.3em] font-medium opacity-80 ${textColor}`}
        >
          GIN
        </span>
      </div>
    </div>
  );
};

export const MonarchFullLogo: React.FC<{
  className?: string;
  theme?: 'dark' | 'light';
}> = ({ className = '', theme = 'dark' }) => {
  const color = theme === 'dark' ? '#262621' : '#E1C9B0';
  const textColor = theme === 'dark' ? 'text-[#262621]' : 'text-[#E1C9B0]';

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <ButterflyMonogram size={34} color={color} className="shrink-0" />
      <div className="flex flex-col">
        <span
          className={`font-serif tracking-[0.22em] font-medium text-lg leading-none uppercase ${textColor}`}
        >
          MONARCH
        </span>
        <span
          className={`text-[8.5px] tracking-[0.35em] font-sans font-medium uppercase mt-1 opacity-75 ${textColor}`}
        >
          BOTANICAL GIN
        </span>
      </div>
    </div>
  );
};
