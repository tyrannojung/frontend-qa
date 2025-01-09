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
      method: 'GET',
      mode: 'cors', // CORS 정책 설정
      headers: {
        Accept: 'text/html',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      duration: (performance.now() - startTime) / 1000,
      description: 'Bridge site is accessible',
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return {
      success: false,
      duration: (performance.now() - startTime) / 1000,
      description: `Bridge site is not accessible: ${errorMessage}`,
    };
  }
};

export default function ApiHealthCheck() {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'site',
      label: 'Site Accessibility',
      status: 'loading',
      description: 'Checking site connection...',
    },
    {
      id: 'mainnet',
      label: 'Mainnet Connection',
      status: 'loading',
      description: 'Verifying Mainnet network...',
    },
    {
      id: 'sepolia',
      label: 'Sepolia Connection',
      status: 'loading',
      description: 'Verifying Sepolia network...',
    },
    {
      id: 'titan',
      label: 'Titan Connection',
      status: 'loading',
      description: 'Verifying Titan network...',
    },
    {
      id: 'titan-sepolia',
      label: 'Titan-Sepolia Connection',
      status: 'loading',
      description: 'Verifying Titan-Sepolia network...',
    },
  ]);

  useEffect(() => {
    const checkServices = async () => {
      // 사이트 접근성 체크 (간단한 fetch로 대체)
      if (process.env.NEXT_PUBLIC_BRIDGE_PAGE) {
        const bridgeResult = await checkSiteAccessibility(process.env.NEXT_PUBLIC_BRIDGE_PAGE);
        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'site'
              ? {
                  ...check,
                  status: bridgeResult.success ? 'success' : 'error',
                  description: bridgeResult.description,
                  duration: bridgeResult.duration,
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
                  description: 'Bridge URL not configured',
                  duration: 0,
                }
              : check,
          ),
        );
      }

      // 각 네트워크 체크
      const networkChecks = [
        {
          id: 'mainnet',
          url: process.env.NEXT_PUBLIC_ETHEREUM_RPC,
          name: 'Ethereum Mainnet',
        },
        {
          id: 'sepolia',
          url: process.env.NEXT_PUBLIC_SEPOLIA_RPC,
          name: 'Sepolia',
        },
        {
          id: 'titan',
          url: process.env.NEXT_PUBLIC_TITAN_RPC,
          name: 'Titan',
        },
        {
          id: 'titan-sepolia',
          url: process.env.NEXT_PUBLIC_TITAN_SEPOLIA_RPC,
          name: 'Titan Sepolia',
        },
      ];

      // 모든 네트워크 체크를 병렬로 실행
      await Promise.all(
        networkChecks.map(async ({ id, url, name }) => {
          if (!url) {
            setChecks((prev) =>
              prev.map((check) =>
                check.id === id
                  ? {
                      ...check,
                      status: 'error',
                      description: 'RPC URL not configured',
                      duration: 0,
                    }
                  : check,
              ),
            );
            return;
          }

          const result = await checkNetworkConnection(url, name);
          setChecks((prev) =>
            prev.map((check) =>
              check.id === id
                ? {
                    ...check,
                    status: result.success ? 'success' : 'error',
                    description: result.description,
                    duration: result.duration,
                  }
                : check,
            ),
          );
        }),
      );
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
          <h3 className="text-xl font-semibold text-white mb-2">API Health Check</h3>
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
