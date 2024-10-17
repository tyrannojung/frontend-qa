import Image from 'next/image';
import { Button } from '@repo/ui/button';
import InputTest from '@/components/InputTest';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-24">
        <Image className="mb-10" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <ol className="list-decimal mb-8">
          <li>
            Get started by editing <code className="font-mono bg-gray-100 p-1 rounded">app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4">
          <a
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="inline mr-2" src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          >
            Read our docs
          </a>
        </div>
        <Button appName="web" className="mt-4">
          Open alert
        </Button>
        <InputTest />
      </main>
    </div>
  );
}
