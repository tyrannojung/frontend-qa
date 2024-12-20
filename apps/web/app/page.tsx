'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import HeaderCustom from '@/components/layout/header/Header';
import { SERVICES, DEFAULT_SERVICE, ServiceType } from '@/constants/services';
import { Bridge, Gem } from '@/components/project';

export default function Home() {
  const { BridgeChartContent, BridgeApiCheck, BridgePlaywright } = Bridge;
  const { GemChartContent, GemApiCheck, GemPlaywright } = Gem;
  const [selectedService, setSelectedService] = useState<ServiceType>(DEFAULT_SERVICE);
  const [selectedDate, setSelectedDate] = useState(new Date('2024-11-14'));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet');

  const serviceComponents: Record<
    ServiceType,
    {
      projectName: string;
      chartContent: React.ReactNode;
      apiCheck: React.ReactNode;
      playwright: React.ReactNode;
    }
  > = {
    [SERVICES.TOKAMAK_BRIDGE]: {
      projectName: 'Tokamak Bridge',
      chartContent: <BridgeChartContent selectedDate={selectedDate} />,
      apiCheck: <BridgeApiCheck />,
      playwright: (
        <BridgePlaywright
          selectedDate={selectedDate}
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
        />
      ),
    },
    [SERVICES.GEM_STON]: {
      projectName: 'Gem Stone',
      chartContent: <GemChartContent selectedDate={selectedDate} />,
      apiCheck: <GemApiCheck />,
      playwright: (
        <GemPlaywright
          selectedDate={selectedDate}
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
        />
      ),
    },
  };

  const currentService = serviceComponents[selectedService];

  return (
    <div className="flex h-screen bg-custom-background text-gray-300">
      {/* Sidebar */}
      <Sidebar selectedService={selectedService} onServiceChange={setSelectedService} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderCustom />

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
              <h2 className="text-2xl font-semibold text-white mb-4">{currentService.projectName} Result</h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg p-4">{currentService.chartContent}</div>
            </div>
            {/* API Check section */}
            <div className="bg-custom-sidebar p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">API Check</h3>
              <div className="border border-gray-700 rounded p-6">{currentService.apiCheck}</div>
            </div>
            {/* Playwright Date-based HTML Link section */}
            <div className="bg-custom-sidebar p-6 rounded-lg shadow-lg">{currentService.playwright}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
