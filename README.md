# GrantKeepr Protocol - Proof of Concept

![Algorand](https://img.shields.io/badge/Algorand-Testnet-blue?style=for-the-badge&logo=algorand)![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)![Vite](https://img.shields.io/badge/Vite-5-blue?style=for-the-badge&logo=vite)

This repository contains a minimal Proof of Concept (POC) for the **GrantKeepr Protocol**, a decentralized system designed to enhance the transparency and efficiency of grant funding programs. This application demonstrates the core crypto-economic loop of the protocol on the Algorand Testnet.

## 📜 Overview

GrantKeepr is a proposed protocol that utilizes a **Token-Curated Registry (TCR)** on the Algorand blockchain. In this model, a community of token holders, known as **Curators**, stake KEEPR tokens to vet and approve grant proposals (Bounties). The primary goal is to create a self-regulating ecosystem that aligns the incentives of grant providers, recipients, and community overseers.

This POC is a front-end application that allows users to interact with a pre-deployed GrantKeepr smart contract on the Algorand Testnet.

## ✨ Features & Scope (The MoSCoW Method)

The features for this POC were strictly prioritized using the MoSCoW method to focus on validating the core concept.

### ✅ Must Have (Implemented)
These features represent the absolute essentials to demonstrate the core loop.

-   **Wallet Connection:** Connect a Pera wallet to interact with the Algorand Testnet.
-   **Configuration:** Ability for the user to input the KEEPR ASA ID and the TCR Smart Contract App ID.
-   **Core Staking Transaction:** A user can stake KEEPR tokens, which executes an atomic transaction group containing an Asset Transfer to the smart contract and an Application Call to opt-in and record the stake.
-   **On-Chain State Reading:** The UI reads and displays data directly from the smart contract's global state (e.g., total number of staked curators, stake requirement).

### 🟡 Should Have (Work in Progress / Future Scope)
Important features for a functional product, but not essential for this initial POC.

-   **Unstaking Mechanism:** A function for curators to withdraw their staked tokens after a cooldown period.
-   **Bounty Curation:** The full lifecycle of submitting, challenging, and voting on bounties.
-   **Reward Logic:** Smart contract logic for distributing rewards to successful curators.

### 🔵 Could Have (Future Scope)
Desirable but less important features for a more mature version.

-   Support for other wallets (e.g., Defly, Lute).
-   Detailed user profiles and transaction history.
-   A more sophisticated and interactive bounty board UI.

### 🔴 Won't Have (Explicitly Not Included in this POC)
Features that are not part of this specific demonstration's scope.

-   Off-chain governance components or complex DAO structures.
-   Front-end UI for deploying the smart contract or creating the KEEPR ASA.

## 🛠️ Technology Stack

-   **Framework:** React (with Vite)
-   **Language:** TypeScript
-   **Blockchain Interaction:**
    -   `@txnlab/use-wallet-react` for wallet connectivity.
    -   `algosdk` for transaction construction and signing.
    -   `@algorandfoundation/algokit-utils` for a robust client connection.
-   **Styling:** Tailwind CSS

## 🚀 How to Use This POC

To interact with this application, you will need the following prerequisites:

1.  An Algorand wallet (Pera is supported) set to **Testnet**.
2.  Testnet ALGOs for transaction fees.
3.  The KEEPR ASA (Algorand Standard Asset) on Testnet.
4.  The GrantKeepr smart contract deployed on Testnet.

### Step-by-Step Guide:

1.  **Configuration:** In the "1. Configuration Setup" panel, enter the **KEEPR Asset ID** and the **TCR Contract App ID**.
2.  **Connect Wallet:** Click the "Connect Wallet" button in the header and approve the connection in your Pera wallet.
3.  **Become a Curator:** In the "2. Become a Curator" panel, you will see the required stake amount fetched from the smart contract. Click the **"Stake KEEPR"** button.
4.  **Approve Transactions:** Your wallet will prompt you to sign two transactions (an asset transfer and an app call). Approve them to complete the staking process.
5.  **Observe On-Chain State:** Once the transaction is confirmed, the "3. On-Chain Registry (Bounty Board)" panel will automatically refresh, and you should see the "Total Curators Staked" count increase by one.

## 💻 Running the Project Locally

To run this project on your own machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mikeystever/keepr
    cd keepr
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173/app/`.
