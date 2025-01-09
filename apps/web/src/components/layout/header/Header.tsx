import { useState } from 'react';

export default function HeaderCustom() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-custom-background border-b border-gray-700">
      <div className="py-4 px-6 flex justify-between items-center">
        <div className="relative">
          <button
            type="button"
            className="text-lg font-bold text-white flex items-center hover:text-gray-300 transition duration-150 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Report
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute left-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" role="menuitem">
                  Report
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700" role="menuitem">
                  AI
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
