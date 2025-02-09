import Link from 'next/link';

export function TwasInfo() {
    return (
        <div className="text-center max-w-2xl mx-auto py-12">
            <h1 className="text-4xl font-bold mb-4 text-orange-500">Twas Launched</h1>
            <p className="text-xl text-gray-600 mb-6">
                Got an idea? Twas will get it done.
            </p>

            <p className="text-lg text-gray-600">Send a message to <Link
                href="https://x.com/TwasLaunched"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
            >x.com/TwasLaunched</Link> to get started</p>

        </div>
    );
}
