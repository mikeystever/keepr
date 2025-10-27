import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-grantkeepr-gray text-gray-200 rounded-lg shadow-xl max-w-2xl w-full m-4 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="p-6 border-b border-grantkeepr-light-gray flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">About This Proof of Concept</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-algorand-blue mb-2">What is GrantKeepr?</h3>
            <p className="text-gray-300">
              GrantKeepr is a proposed decentralized protocol designed to improve the transparency and efficiency of grant funding programs. It utilizes a Token-Curated Registry (TCR) on the Algorand blockchain, where a community of token holders (Curators) stakes tokens to vet and approve grant proposals (Bounties). The goal is to create a self-regulating ecosystem that aligns the incentives of grant providers, recipients, and community overseers.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-algorand-blue mb-2">The MoSCoW Method for this POC</h3>
            <p className="text-gray-300 mb-4">
              This application is a minimal Proof of Concept (POC) to demonstrate the core crypto-economic loop. Its features have been prioritized using the MoSCoW method to focus strictly on what's necessary to validate the concept on the Testnet.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-green-400">Must Have (Implemented)</h4>
                <p className="text-sm text-gray-400 mb-2">The absolute essentials to demonstrate the core loop.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li><strong>Wallet Connection:</strong> Connect a Pera wallet to interact with the Testnet.</li>
                  <li><strong>Configuration:</strong> Ability to input the KEEPR ASA ID and the TCR App ID.</li>
                  <li><strong>Core Staking Transaction:</strong> A user can stake KEEPR tokens, which involves an Asset Transfer and an Application Call in an atomic group.</li>
                  <li><strong>On-Chain State Reading:</strong> The UI reads and displays data directly from the smart contract's global state (e.g., total curators).</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-yellow-400">Should Have (Out of Scope for POC)</h4>
                <p className="text-sm text-gray-400 mb-2">Important features for a functional product, but not essential for this initial POC.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li><strong>Unstaking Mechanism:</strong> A function for curators to withdraw their staked tokens.</li>
                  <li><strong>Bounty Curation:</strong> The full process of submitting, challenging, and voting on bounties.</li>
                  <li><strong>Reward Logic:</strong> Smart contract logic for distributing rewards to successful curators.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-blue-400">Could Have (Out of Scope for POC)</h4>
                <p className="text-sm text-gray-400 mb-2">Desirable but less important features for a future, more mature version.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Support for other wallets (e.g., Defly, Lute).</li>
                  <li>Detailed user profiles and transaction history.</li>
                  <li>A more sophisticated and interactive bounty board UI.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-red-400">Won't Have (Explicitly Not Included)</h4>
                <p className="text-sm text-gray-400 mb-2">Features that are not part of this specific demonstration's scope.</p>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  <li>Off-chain governance components or complex DAO structures.</li>
                  <li>Front-end deployment of the smart contract or ASA creation.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;