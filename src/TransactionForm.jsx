import { useState } from "react";

export default function TransactionForm({ onSubmit }) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!from || !to || !amount) return;
        onSubmit(from, to, parseFloat(amount));
        setFrom("");
        setTo("");
        setAmount("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow max-w-md w-full mb-6">
            <h2 className="text-lg font-bold mb-2 text-gray-50">Create Transaction</h2>
            <input type="text" value={from} onChange={e => setFrom(e.target.value)} placeholder="From Address" className="w-full border p-2 mb-2 rounded border-gray-300 text-gray-300" />
            <input type="text" value={to} onChange={e => setTo(e.target.value)} placeholder="To Address" className="w-full border p-2 mb-2 rounded border-gray-300 text-gray-300" />
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" className="w-full border p-2 mb-2 rounded border-gray-300 text-gray-300" />
            <button type="submit" className="mt-2 px-4 py-2 bg-sky-800 text-white rounded hover:bg-sky-900 cursor-pointer">Add Transaction</button>
        </form>
    );
}