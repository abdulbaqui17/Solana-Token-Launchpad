# 🚀 Solana Token Launchpad

A modern, feature-rich web application for creating SPL tokens on the Solana blockchain with an intuitive 2x2 grid interface, animated backgrounds, and 3D effects.

![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?style=flat&logo=solana)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)

## ✨ Features

- **🎨 Modern UI/UX**: Beautiful black and white monochrome design with glassmorphism effects
- **📦 2x2 Grid Layout**: No scrolling needed - all inputs visible at once
- **✨ Animated Background**: Continuously moving grid patterns, particles, and floating orbs
- **💫 3D Card Effects**: Interactive cards with shine animations and depth on hover
- **🔗 Blockchain Integration**: Full SPL token creation with Metaplex metadata
- **👛 Wallet Support**: Built-in Solana wallet adapter integration
- **⚡ Lightning Fast**: Built with Vite for optimal performance
- **🎭 Framer Motion**: Smooth animations and transitions throughout

## ��️ Tech Stack

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.2.2 (Rolldown)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Blockchain**: Solana Web3.js, SPL Token, Metaplex
- **Wallet**: Solana Wallet Adapter

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Solana wallet (Phantom, Solflare, etc.)
- Some SOL on Devnet for testing

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/solana-token-launchpad.git

# Navigate to project directory
cd solana-token-launchpad

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Usage

1. **Connect Wallet**: Click the wallet button in the top-right corner
2. **Fill Token Details**:
   - **Token Name**: Your token's full name (e.g., "My Awesome Token")
   - **Token Symbol**: Short symbol (e.g., "AWESOME")
   - **Metadata URI**: IPFS or Arweave link to JSON metadata
   - **Initial Supply**: Number of tokens to mint
3. **Launch Token**: Click the "🚀 Launch Token" button
4. **Confirm Transaction**: Approve in your wallet
5. **Success**: Your token is created and visible in your wallet!

## 🎯 Features Breakdown

### Token Creation
- Creates SPL token mint account (9 decimals)
- Stores on-chain metadata using Metaplex
- Creates associated token account
- Mints initial supply to creator's wallet

### UI Components
- **AnimatedGridBackground**: Moving grid with particles
- **FloatingOrbs**: Ambient lighting effects
- **ShinyCard**: 3D hover effects with animated shine
- **TextField**: Custom input with focus animations

## 🌐 Deployment

### Deploy to Vercel

\`\`\`bash
# Build the project
npm run build
\`\`\`

Or use the Vercel dashboard:
1. Import your GitHub repository
2. Vercel auto-detects Vite configuration
3. Click Deploy

## 📝 Environment Variables

No environment variables required for basic usage. The app connects to Solana Devnet by default.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Solana](https://solana.com/) - High-performance blockchain
- [Metaplex](https://www.metaplex.com/) - NFT and token metadata standard
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

**⚠️ Disclaimer**: This is a development tool. Always test on Devnet before deploying to Mainnet. Use at your own risk.
