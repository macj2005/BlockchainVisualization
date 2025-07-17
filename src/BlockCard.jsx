export default function BlockCard({ block, index }) {
    return (
        <div className="relative group cursor-pointer">
            {/* 3D block icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-sky-600 to-sky-900 shadow-lg rounded border border-gray-400 transform group-hover:scale-105 transition-transform duration-200">
                <div className="text-xs text-white font-bold p-2">
                    Block
                    <div className="text-lg text-center">{index}</div>
                </div>
            </div>

            {/* Hover overlay card */}
            <div className="absolute z-50 top-[100%] w-96 bg-gray-800 text-white p-4 rounded shadow-xl border border-indigo-500 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300">
                <h2 className="text-xl font-semibold mb-2 text-blue-400">
                    Block #{index}
                </h2>
                <p className="text-sm mb-1">
                    <span className="font-semibold">Timestamp:</span> {block.timestamp}
                </p>
                <p className="text-sm mb-1 break-all">
                    <span className="font-semibold">Hash:</span> <code className="text-xs">{block.hash}</code>
                </p>
                <p className="text-sm mb-1 break-all">
                    <span className="font-semibold">Prev Hash:</span> <code className="text-xs">{block.previousHash}</code>
                </p>
                <p className="text-sm mb-1">
                    <span className="font-semibold">Nonce:</span> {block.nonce}
                </p>
                <p className="mt-2 text-sm font-semibold">Transactions:</p>
                <pre className="text-xs bg-gray-900 p-2 mt-1 rounded overflow-x-auto max-h-32">
                    {JSON.stringify(block.transactions, null, 2)}
                </pre>
            </div>
        </div>
    );
}