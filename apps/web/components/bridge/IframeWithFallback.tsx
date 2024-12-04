// components/IframeWithFallback.tsx
import { format } from 'date-fns';
import React from 'react';

// const isYesterday = (date: Date): boolean => {
//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);
//   return format(date, 'yyyyMMdd') === format(yesterday, 'yyyyMMdd');
// };

const isNovember6 = (date: Date): boolean => {
  const targetDate = new Date('2023-11-14');
  return format(date, 'yyyyMMdd') !== format(targetDate, 'yyyyMMdd');
};

interface IframeWithFallbackProps {
  src: string;
  network: string;
  date: Date;
}

function IframeWithFallback({ src, network, date }: IframeWithFallbackProps): JSX.Element {
  const showReport = isNovember6(date);

  if (!showReport) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-gray-100 rounded-lg">
        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-700 text-lg font-medium mb-2">Report Not Available</p>
        <p className="text-gray-500 text-sm text-center">
          HTML reports are only available for yesterday&apos;s tests.
          <br />
          Please select yesterday&apos;s date to view the report. ({src})
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={src}
      className="w-full h-[600px] bg-white"
      style={{
        backgroundColor: 'white',
        color: '#000',
      }}
      frameBorder="0"
      title={`Playwright Test Results - ${network}`}
    />
  );
}

export default IframeWithFallback;
