import Link from 'next/link';
import Image from 'next/image';

export function TwasInfo() {
    return (
        <div className="text-center max-w-2xl mx-auto py-4">
            <h1 className="text-4xl font-bold mb-4 text-orange-500">Twas Launched</h1>

            <div className="mb-6">
                <Image
                    src="/twas.jpg"
                    alt="Twas"
                    width={144}
                    height={108}
                    className="mx-auto rounded-lg"
                    priority
                />
            </div>

            <p className="text-xl text-gray-600 mb-3">
                Got an idea? Twas will get it done.
            </p>

            <p className="text-gray-600">Send a message to <Link
                href="https://x.com/TwasLaunched"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
            >x.com/TwasLaunched</Link> to get started</p>
        </div>
    );
}
