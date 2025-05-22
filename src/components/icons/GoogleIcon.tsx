import React from "react";

interface GoogleIconProps {
  className?: string;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <path
        fill="#4285F4"
        d="M24 9.5c3.16 0 5.84 1.09 8.02 3.2l5.97-5.97C33.88 3.08 29.3 1 24 1 14.64 1 6.77 6.94 3.45 15.13l6.92 5.38C12.06 13.84 17.54 9.5 24 9.5z"
      />
      <path
        fill="#34A853"
        d="M46.14 24.5c0-1.55-.14-3.05-.41-4.5H24v9h12.6c-.57 2.93-2.28 5.42-4.84 7.1l7 5.45C43.14 37.6 46.14 31.68 46.14 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M10.37 28.5c-1.36-4.07-1.36-8.43 0-12.5L3.45 10.63C.52 17.17.52 26.83 3.45 33.37l6.92-5.37z"
      />
      <path
        fill="#EA4335"
        d="M24 47c6.3 0 11.88-2.08 16-5.65l-7-5.45c-2.08 1.39-4.73 2.1-7 2.1-6.46 0-11.94-4.34-13.63-10.5L3.45 33.37C6.77 41.06 14.64 47 24 47z"
      />
    </svg>
  );
};

export default GoogleIcon;
