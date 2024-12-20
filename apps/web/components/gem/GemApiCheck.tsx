export default function GemApiCheck() {
  return (
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
  );
}
