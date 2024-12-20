import Image from 'next/image';

export default function Sidebar() {
  return (
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
            Gem-NFT
          </li>
        </ul>
      </nav>
    </aside>
  );
}
