'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import type { BridgeTest } from '../../types/bridge/bridge';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BridgeChartProps {
  selectedDate: Date; // YYYYMMDD format
}

export default function BridgeChartContent({ selectedDate }: BridgeChartProps) {
  const date = format(selectedDate, 'yyyyMMdd');
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null); // 에러 초기화
        const networks = ['Mainnet', 'Sepolia', 'Titan', 'Titan-Sepolia'];
        const results = await Promise.all(
          networks.map(async (network) => {
            const response = await fetch(`./data/bridge/${date}/json/${network}.jsonl`);
            if (!response.ok) {
              throw new Error(`No data available for ${date}`);
            }
            const text = await response.text();
            return text
              .split('\n')
              .filter(Boolean)
              .map((line) => JSON.parse(line));
          }),
        );
        // 성공(detailsVisible: true)과 실패 건수 계산
        const processedData = networks.map((network, index) => {
          const tests = results[index] as BridgeTest[];
          const successful = tests.filter((test) => test.detailsVisible).length;
          const failed = tests.filter((test) => !test.detailsVisible).length;
          return { network, successful, failed };
        });

        const successFailureData = {
          labels: processedData.map((item) => item.network),
          datasets: [
            {
              label: 'Successful Tests',
              data: processedData.map((item) => item.successful),
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
            },
            {
              label: 'Failed Tests',
              data: processedData.map((item) => item.failed),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
            },
          ],
        };

        // 2. 평균 처리 시간 차트 데이터
        const averageDurationData = {
          labels: processedData.map((item) => item.network),
          datasets: [
            {
              label: 'Average Duration (seconds)',
              data: networks.map((_, index) => {
                const tests = results[index] || [];
                const successfulTests = tests.filter((test) => test.detailsVisible);
                if (successfulTests.length === 0) return 0;
                const avgDuration =
                  successfulTests.reduce((sum, test) => sum + test.duration, 0) / successfulTests.length;
                return avgDuration.toFixed(3);
              }),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 1,
            },
          ],
        };

        // 3. 토큰별 성공률 차트 데이터
        const tokenSuccessData = {
          labels: ['WTON', 'WETH', 'TOS', 'ETH', 'USDC', 'USDT', 'DOC', 'AURA', 'LYDA'],
          datasets: [
            {
              label: 'Token Success Rate (%)',
              data: ['WTON', 'WETH', 'TOS', 'ETH', 'USDC', 'USDT', 'DOC', 'AURA', 'LYDA'].map((token) => {
                const tokenTests = results.flat().filter((test) => test.fromToken === token || test.toToken === token);
                const successRate = (tokenTests.filter((test) => test.detailsVisible).length / tokenTests.length) * 100;
                return successRate.toFixed(1);
              }),
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
              borderColor: 'rgb(153, 102, 255)',
              borderWidth: 1,
            },
          ],
        };

        setChartData({
          successFailure: successFailureData,
          averageDuration: averageDurationData,
          tokenSuccess: tokenSuccessData,
        });
      } catch (err) {
        setError('No test results available for this date');
        setChartData(null);
      }
    };

    fetchData();
  }, [date]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 크기 조절을 위해 추가
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Swap Test Results by Network',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px]">
      {error ? (
        <div className="col-span-3 flex items-center justify-center">
          <p className="text-gray-400">{error}</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-800 p-4 rounded-lg">
            {chartData ? (
              <Bar
                options={{
                  ...options,
                  plugins: { ...options.plugins, title: { display: true, text: 'Success/Failure by Network' } },
                }}
                data={chartData.successFailure}
              />
            ) : (
              <p className="text-gray-400">Loading chart data...</p>
            )}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            {chartData ? (
              <Bar
                options={{
                  ...options,
                  plugins: { ...options.plugins, title: { display: true, text: 'Average Duration by Network' } },
                }}
                data={chartData.averageDuration}
              />
            ) : (
              <p className="text-gray-400">Loading chart data...</p>
            )}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            {chartData ? (
              <Bar
                options={{
                  ...options,
                  plugins: { ...options.plugins, title: { display: true, text: 'Token Success Rate' } },
                }}
                data={chartData.tokenSuccess}
              />
            ) : (
              <p className="text-gray-400">Loading chart data...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
