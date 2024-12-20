import Image from 'next/image';
import { SERVICES, ServiceType } from '@/constants/services';

interface SidebarProps {
  selectedService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
}

export default function Sidebar({ selectedService, onServiceChange }: SidebarProps) {
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
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <li
            onClick={() => onServiceChange(SERVICES.TOKAMAK_BRIDGE)}
            className={`px-4 py-2 rounded-md cursor-pointer transition duration-150 ease-in-out ${
              selectedService === SERVICES.TOKAMAK_BRIDGE ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'
            }`}
          >
            Tokamak Bridge
          </li>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <li
            onClick={() => onServiceChange(SERVICES.GEM_STON)}
            className={`px-4 py-2 rounded-md cursor-pointer transition duration-150 ease-in-out ${
              selectedService === SERVICES.GEM_STON ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'
            }`}
          >
            Gem-NFT
          </li>
        </ul>
      </nav>
    </aside>
  );
}
