
import React from 'react';
import ConnectWallet from './ConnectWallet';

const Header: React.FC = () => {
  return (
    <header className="bg-grantkeepr-gray shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          GrantKeepr <span className="text-algorand-blue">POC</span>
        </h1>
        <ConnectWallet />
      </div>
    </header>
  );
};

export default Header;
