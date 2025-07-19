import { useEffect, useState } from "react";
import { Blockchain, Transaction } from "./blockchain";
import BlockCard from "./BlockCard";
import TransactionForm from "./TransactionForm";

function App() {
  const [blockchain, setBlockchain] = useState(null);
  const [chain, setChain] = useState([]);
  const [pendingTxs, setPendingTxs] = useState([]);

  const [difficulty, setDifficulty] = useState(2);
  const [miningReward, setMiningReward] = useState(100);
  const [rewardAddress, setRewardAddress] = useState("miner-address");

  useEffect(() => {
    const demoChain = new Blockchain();
    setBlockchain(demoChain);
    setChain(demoChain.chain);
  }, []);

  const handleAddTransaction = (from, to, amount) => {
    const tx = new Transaction(from, to, amount);
    try {
      blockchain.addTransaction(tx);
      setPendingTxs([...blockchain.pendingTransactions]);
    } catch(err) {
      alert("Transaction error: " + err.message);
    }
  };

  const handleMineBlock = () => {
    blockchain.difficulty = difficulty;
    blockchain.miningReward = miningReward;
    blockchain.minePendingTransactions(rewardAddress);
    setChain([...blockchain.chain]);
    setPendingTxs([]);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gray-700 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-100">
            Blockchain Visualizer
          </h1>
        </div>

        <div className="bg-gray-700 px-4 py-4 flex flex-col md:flex-row items-center justify-center gap-4 border-t border-gray-600">
          <div className="flex flex-col text-sm">
            <label className="text-gray-300 mb-1">Difficulty</label>
            <input
              type="number"
              min="1"
              max="5"
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
              className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 w-32"
            />
          </div>

          <div className="flex flex-col text-sm">
            <label className="text-gray-300 mb-1">Mining Reward</label>
            <input 
              type="number"
              min="1"
              max="999999"
              value={miningReward}
              onChange={(e) => setMiningReward(parseFloat(e.target.value))}
              className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 w-32"
            />
          </div>

          <div className="flex flex-col text-sm">
            <label className="text-gray-300 mb-1">Mining Reward Address</label>
            <input 
              type="text"
              value={rewardAddress}
              onChange={(e) => setRewardAddress(e.target.value)}
              className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 w-48"
            />
          </div>

          <button
            onClick={() => {
              const newChain = new Blockchain();
              newChain.difficulty = difficulty;
              newChain.miningReward = miningReward;
              setBlockchain(newChain);
              setChain(newChain.chain);
              setPendingTxs([]);
            }}
            className="px-4 py-1 mt-4 md:mt-6 bg-sky-700 hover:bg-sky-800 rounded shadow text-white cursor-pointer"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-6 justify-center">
          <TransactionForm onSubmit={handleAddTransaction} />

          <div className="bg-gray-800 p-4 rounded-lg shadow max-w-sm max-h-full h-full">
            <h2 className="text-xl font-semibold mb-8 text-white">Pending Transactions</h2>
            {pendingTxs.length === 0 ? (
              <p className="text-gray-300 text-sm">No transactions pending.</p>
            ) : (
              <ul className="text-sm text-gray-300">
                {pendingTxs.map((tx, i) => (
                  <li key={i}>
                    {tx.fromAddress} → {tx.toAddress}: {tx.amount} tokens
                  </li>
                ))}
              </ul>
            )}
            {pendingTxs.length === 0 ? (
              <button className="py-2 px-3 mt-6 bg-gray-700 rounded text-white cursor-not-allowed" disabled={true}>
                Mine Transactions
              </button>
            ) : (
              <button className="py-2 px-3 mt-6 bg-sky-800 hover:bg-sky-900 rounded text-white cursor-pointer" onClick={handleMineBlock} disabled={pendingTxs.length === 0}>
                Mine Transactions
              </button>
            )}
            
          </div>
        </div>

        

        <div className="flex flex-row items-center justify-center mt-5">
          {chain.map((block, index) => (
            <div key={index} className="flex items-center">
              <BlockCard block={block} index={index} />

              {index < chain.length - 1 && (
                <div className="mx-2 text-white text-2xl select-none">- - -</div>
              )}
            </div>
            
          ))}
        </div>

        <div className="mt-20 w-full text-left text-gray-300 mb-20">
          <h2 className="text-3xl font-bold py-5 text-center">About</h2>
          <p className="mx-4 sm:mx-16 md:mx-32 lg:mx-56 mb-5">
            &nbsp;&nbsp;&nbsp;&nbsp;This is a tool to simulate what a blockchain is and visualize how it works.
            Blockchains are crucial data structures used in finance and crypto-related industries, but ultimately have universal applications.
            Think of a blockchain as a clever linked list. Each chain consists of several blocks which hold data about user transactions on the chain, just like nodes in a linked list structure.
          </p>
          <p className="mx-4 sm:mx-16 md:mx-32 lg:mx-56 mb-5">
            &nbsp;&nbsp;&nbsp;&nbsp;Instead of pointers however, a blockchain stores the hash of the previous block in the chain.
            This allows blocks to be added continuously without having to modify blocks in the chain constantly.
            Each block stores its hash, the hash of the previous block, a timestamp, a nonce, and a array of transactions.
            The nonce is simply a meaningless value that is added in the hash calculation so that a block can take multiple tries to get a hash that matches the difficulty (explained below).
            It is a counter that increments for each hash calculation, until a hash with the correct number of leading zeros is found. 
            So, the final nonce value is the amount of tries it took to get a valid hash for that block.
          </p>
          <p className="mx-4 sm:mx-16 md:mx-32 lg:mx-56 mb-5">
            &nbsp;&nbsp;&nbsp;&nbsp;Mining is simply calculating hashes over and over until a valid hash is found, usually by decentralized users of the blockchain independently, or in a collective mining pool. 
            When a block is mined, it validates all transactions that occured on the chain after the last block was mined, adding a new block on the chain with all of those new transactions.
            This is how a group of people can have a decentralized transaction network, by letting users of the network validate transactions themselves.
          </p>

          <h2 className="text-2xl font-semibold mb-5 text-center">Input Fields</h2>
          <ul className="text-left mx-4 sm:mx-16 md:mx-32 lg:mx-56">
            <li className="py-2"><b>Difficulty</b> - How many trailing zeros that should be required in future block hashes. 
            This is the proof-of-work system, making it where calculating new hashes is difficult, and thus makes the chain harder to tamper with.</li>
            <li className="py-2"><b>Mining Reward</b> - How many tokens should be released after a block is successfully mined.</li>
            <li className="py-2"><b>Mining Reward Address</b> - The address that the mining reward tokens are sent to.</li>
          </ul>

        </div>
        <div className="w-full bg-gray-700 py-5">
          <p className="text-center text-gray-500">Copyright Sequitur LLC. All rights reserved. </p>
        </div>
      </div>
    </>
  );
}

export default App
