import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import { Tokenlounchpad } from './components/TokenlounchpadNew2';

function App() {
 return (
  <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
    <WalletProvider wallets={[]} autoConnect>
      <WalletModalProvider>
        <div className="relative">
          {/* Wallet buttons floating at top */}
          <div className="fixed top-6 right-6 z-50 flex gap-3">
            <WalletMultiButton style={{backgroundColor: '#ffffff', color: '#000000', fontWeight: 'bold'}} />
            <WalletDisconnectButton style={{backgroundColor: '#ffffff', color: '#000000', fontWeight: 'bold'}} />
          </div>
          <Tokenlounchpad />
        </div>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
 )
}

export default App
