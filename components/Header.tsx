import React from 'react';
import ConnectWallet from './ConnectWallet.tsx';

interface HeaderProps {
  onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHelpClick }) => {
  return (
    <header className="bg-grantkeepr-gray shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">
            GrantKeepr <span className="text-algorand-blue">POC</span>
          </h1>
          <button 
            onClick={onHelpClick} 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="About this Proof of Concept"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </button>
        </div>
        <ConnectWallet />
      </div>
    </header>
  );
};

export default Header;