'use client';

import Image from 'next/image';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import BridgeChart from '../components/bridge/BridgeChart';
import IframeWithFallback from '../components/bridge/IframeWithFallback';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2024-11-14'));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet');
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <div className="flex h-screen bg-custom-background text-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-custom-sidebar text-gray-300">
        <div className="p-4">
          <Image src="/icons/logo.svg" alt="TOONchat Logo" width={150} height={40} />
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li className="px-4 py-2 text-green-400 font-semibold">TokamakNetwork</li>
            <li className="border-t border-gray-700 my-2 opacity-30" />
            <li className="px-4 py-2 text-gray-400 font-medium">Project</li>
            <li className="px-4 py-2 bg-gray-800 text-white rounded-md cursor-pointer transition duration-150 ease-in-out">
              Tokamak Bridge
            </li>
            <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer transition duration-150 ease-in-out">
              Simple staking
            </li>
            <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer transition duration-150 ease-in-out">
              Tokamak Webpage
            </li>
            <li className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer transition duration-150 ease-in-out">
              Gem-NFT
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="space-y-8">
            {/* Date Selection Section */}
            <div className="bg-custom-sidebar rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-300">Results for Selected Date</h3>
                  <p className="text-sm text-gray-400">View test results, API checks, and Playwright reports</p>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-600 transition-colors"
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{format(selectedDate, 'yyyy/MM/dd')}</span>
                  </button>
                  {isCalendarOpen && (
                    <div className="absolute left-0 mt-2 z-50">
                      <div className="bg-gray-800 rounded-lg shadow-lg p-1 border border-gray-700">
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date: Date | null) => {
                            if (date) {
                              setSelectedDate(date);
                              setIsCalendarOpen(false);
                            }
                          }}
                          inline
                          wrapperClassName="bg-gray-800"
                          calendarClassName="bg-gray-800 border-gray-700 text-gray-300"
                          dayClassName={(date) =>
                            date && date.getTime() === selectedDate.getTime()
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : 'text-gray-300 hover:bg-gray-700'
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Chart placeholder */}
            <div className="bg-custom-sidebar rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Tokamak Bridge Result</h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg p-4">
                <BridgeChart date={format(selectedDate, 'yyyyMMdd')} />
              </div>
            </div>

            {/* API Check section */}
            <div className="bg-custom-sidebar p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">API Check</h3>
              <div className="border border-gray-700 rounded p-6">
                <p className="text-yellow-400 font-semibold">3 out of 4 checks have passed</p>
                <p className="text-sm text-gray-400">4 total checks</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">
                      Format / format (push): <span className="text-green-400">Successful in 28s</span>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">
                      Lint / eslint (push): <span className="text-green-400">Successful in 33s</span>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">
                      Unit Tests / unit-tests (push): <span className="text-green-400">Successful in 33s</span>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">
                      Integration Tests / integration-tests (push): <span className="text-red-400">Failed in 45s</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Playwright Date-based HTML Link section */}
            <div className="bg-custom-sidebar p-6 rounded-lg shadow-lg">
              {/* Title and Refresh Button */}
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-semibold text-white">Playwright Date-based HTML Link</h3>
                <button
                  type="button"
                  aria-label="Refresh Playwright Report"
                  onClick={() => {
                    setSelectedNetwork('mainnet');
                    setIframeKey((prev) => prev + 1);
                  }}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>

              {/* Network Selection Buttons */}
              <div className="flex space-x-4 mb-6">
                {['mainnet', 'sepolia', 'titan', 'titan-sepolia'].map((network) => (
                  <button
                    key={network}
                    type="button"
                    onClick={() => setSelectedNetwork(network)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 ease-in-out
                    ${
                      selectedNetwork === network
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {network.charAt(0).toUpperCase() + network.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6 bg-white rounded-lg">
                <IframeWithFallback
                  key={iframeKey}
                  src={`/data/bridge/${format(selectedDate, 'yyyyMMdd')}/html/${selectedNetwork}/index.html`}
                  network={selectedNetwork}
                  date={selectedDate}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
