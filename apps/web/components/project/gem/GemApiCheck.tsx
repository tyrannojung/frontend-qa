'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface CheckItem {
  id: string;
  label: string;
  status: 'loading' | 'success' | 'error';
  description: string;
  duration?: number;
}

const checkNetworkConnection = async (rpcUrl: string, networkName: string) => {
  const startTime = performance.now();
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const blockNumber = await provider.getBlockNumber();

    return {
      success: true,
      duration: (performance.now() - startTime) / 1000,
      description: `Connected to ${networkName} (Block #${blockNumber})`,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return {
      success: false,
      duration: (performance.now() - startTime) / 1000,
      description: `Failed to connect: ${errorMessage}`,
    };
  }
};

const checkSiteAccessibility = async (url: string) => {
  const startTime = performance.now();
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
    });

    // response 객체를 사용하여 상태 체크
    if (response.type === 'opaque') {
      // no-cors 모드에서는 'opaque' response를 받습니다
      return {
        success: true,
        duration: (performance.now() - startTime) / 1000,
        description: 'Gem site is accessible',
      };
    }
    throw new Error('Unexpected response type');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      duration: (performance.now() - startTime) / 1000,
      description: `Gem site is not accessible: ${errorMessage}`,
    };
  }
};

export default function GemApiCheck() {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'site',
      label: 'Site Accessibility',
      status: 'loading',
      description: 'Checking site connection...',
    },
    {
      id: 'thanos-sepolia',
      label: 'Thanos-Sepolia Connection',
      status: 'loading',
      description: 'Verifying Thanos-Sepolia network...',
    },
  ]);

  useEffect(() => {
    const checkServices = async () => {
      // Gem 사이트 접근성 체크
      if (process.env.NEXT_PUBLIC_GEM_PAGE) {
        console.log(process.env.NEXT_PUBLIC_GEM_PAGE);
        const gemResult = await checkSiteAccessibility(process.env.NEXT_PUBLIC_GEM_PAGE);
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'site'
              ? {
                  ...check,
                  status: gemResult.success ? 'success' : 'error',
                  description: gemResult.description,
                  duration: gemResult.duration,
                }
              : check,
          ),
        );
      } else {
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'site'
              ? {
                  ...check,
                  status: 'error',
                  description: 'Gem URL not configured',
                  duration: 0,
                }
              : check,
          ),
        );
      }

      // Thanos-Sepolia 네트워크 체크
      if (process.env.NEXT_PUBLIC_THANOS_SEPOLIA_RPC) {
        const result = await checkNetworkConnection(process.env.NEXT_PUBLIC_THANOS_SEPOLIA_RPC, 'Thanos-Sepolia');
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'thanos-sepolia'
              ? {
                  ...check,
                  status: result.success ? 'success' : 'error',
                  description: result.description,
                  duration: result.duration,
                }
              : check,
          ),
        );
      } else {
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'thanos-sepolia'
              ? {
                  ...check,
                  status: 'error',
                  description: 'RPC URL not configured',
                  duration: 0,
                }
              : check,
          ),
        );
      }
    };

    checkServices();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-blue-400" />;
      case 'success':
        return (
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const successCount = checks.filter((check) => check.status === 'success').length;
  const getStatusColor = (status: 'loading' | 'success' | 'error') => {
    if (status === 'success') return 'text-green-400';
    if (status === 'error') return 'text-red-400';
    return 'text-blue-400';
  };

  const formatDuration = (duration: number) => {
    if (duration < 0.01) return '0.01s';
    return `${Math.round(duration * 100) / 100}s`;
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Gem API Health Check</h3>
          <p className="text-yellow-400 font-semibold">
            {successCount} out of {checks.length} checks have passed
          </p>
          <p className="text-sm text-gray-400">{checks.length} total checks</p>
        </div>
      </div>

      <div className="space-y-4">
        {checks.map((check) => (
          <div
            key={check.id}
            className="flex items-center justify-between p-4 bg-gray-900 rounded-lg transition-all duration-200 hover:bg-gray-850"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">{getStatusIcon(check.status)}</div>
              <div>
                <p className="text-gray-200 font-medium">{check.label}</p>
                <p className="text-sm text-gray-400">{check.description}</p>
              </div>
            </div>
            {check.duration && (
              <span className={`text-sm ${getStatusColor(check.status)}`}>{formatDuration(check.duration)}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
