'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GemChartContent() {
  const chartData = {
    gempack: {
      labels: ['Success', 'Failed'],
      datasets: [
        {
          data: [59, 41],
          backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(239, 68, 68, 0.8)'], // blue-500, red-500
          borderColor: ['rgb(59, 130, 246)', 'rgb(239, 68, 68)'],
          borderWidth: 1,
        },
      ],
    },
    purchase: {
      labels: ['Success', 'Failed'],
      datasets: [
        {
          data: [55, 45],
          backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(239, 68, 68, 0.8)'],
          borderColor: ['rgb(59, 130, 246)', 'rgb(239, 68, 68)'],
          borderWidth: 1,
        },
      ],
    },
    sale: {
      labels: ['Success'],
      datasets: [
        {
          data: [52],
          backgroundColor: ['rgba(59, 130, 246, 0.8)'],
          borderColor: ['rgb(59, 130, 246)'],
          borderWidth: 1,
        },
      ],
    },
    melt: {
      labels: ['Success'],
      datasets: [
        {
          data: [57],
          backgroundColor: ['rgba(59, 130, 246, 0.8)'],
          borderColor: ['rgb(59, 130, 246)'],
          borderWidth: 1,
        },
      ],
    },
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          color: '#fff',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        color: '#fff',
        font: {
          size: 14,
          fontWeight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 15,
        },
      },
    },
  };

  return (
    <div>
      {/* Charts container */}
      <div className="p-6 bg-gray-800 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg h-[300px]">
            <Pie
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  title: { ...commonOptions.plugins.title, text: 'Gempack Tests' },
                },
              }}
              data={chartData.gempack}
            />
          </div>

          <div className="bg-gray-900 p-4 rounded-lg h-[300px]">
            <Pie
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  title: { ...commonOptions.plugins.title, text: 'Sale Tests' },
                },
              }}
              data={chartData.sale}
            />
          </div>
          <div className="bg-gray-900 p-4 rounded-lg h-[300px]">
            <Pie
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  title: { ...commonOptions.plugins.title, text: 'Purchase Tests' },
                },
              }}
              data={chartData.purchase}
            />
          </div>

          <div className="bg-gray-900 p-4 rounded-lg h-[300px]">
            <Pie
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  title: { ...commonOptions.plugins.title, text: 'Melt Tests' },
                },
              }}
              data={chartData.melt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
