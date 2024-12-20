import { useState } from 'react';
import { format } from 'date-fns';
import IframeWithFallback from '../common/IframeWithFallback';

type BridgePlaywrightProps = {
  selectedDate: Date;
  selectedNetwork: string;
  onNetworkChange: (network: string) => void;
};

export default function BridgePlaywright({ selectedDate, selectedNetwork, onNetworkChange }: BridgePlaywrightProps) {
  const [iframeKey, setIframeKey] = useState(0);

  return (
    <div>
      {/* Title and Refresh Button */}
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl font-semibold text-white">Playwright Date-based HTML Link</h3>
        <button
          type="button"
          aria-label="Refresh Playwright Report"
          onClick={() => {
            onNetworkChange('mainnet');
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
            onClick={() => onNetworkChange(network)}
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
  );
}
