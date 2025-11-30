import { createAssociatedTokenAccountInstruction, createInitializeMint2Instruction, createMintToInstruction, getAssociatedTokenAddress, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { createCreateMetadataAccountV3Instruction, PROGRAM_ID as METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata"
import { useState } from "react"
import { motion } from 'framer-motion'
import { AnimatedGridBackground } from './ui/animated-grid-background'
import { ShinyCard } from './ui/shiny-card'
import { TextField } from './ui/text-field'
import { FloatingOrbs } from './ui/floating-orbs'

export const Tokenlounchpad = () => {
    const [name, setName] = useState("")
    const [symbol, setSymbol] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [initialSupply, setInitialSupply] = useState("")
    const Wallet = useWallet()
    const { connection } = useConnection()

    const handleCreateToken = async () => {
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate()
        const mintAddress = keypair.publicKey
        
        // Derive metadata account PDA
        const [metadataAddress] = PublicKey.findProgramAddressSync(
            [
                Buffer.from("metadata"),
                METADATA_PROGRAM_ID.toBuffer(),
                mintAddress.toBuffer(),
            ],
            METADATA_PROGRAM_ID
        )

        const transaction = new Transaction().add(
            // Create mint account
            SystemProgram.createAccount({
                fromPubkey: Wallet.publicKey,
                newAccountPubkey: mintAddress,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),

            // Initialize mint
            createInitializeMint2Instruction(
                mintAddress,
                9,
                Wallet.publicKey,
                Wallet.publicKey,
                TOKEN_PROGRAM_ID
            ),

            // Create metadata account
            createCreateMetadataAccountV3Instruction(
                {
                    metadata: metadataAddress,
                    mint: mintAddress,
                    mintAuthority: Wallet.publicKey,
                    payer: Wallet.publicKey,
                    updateAuthority: Wallet.publicKey,
                },
                {
                    createMetadataAccountArgsV3: {
                        data: {
                            name: name,
                            symbol: symbol,
                            uri: imageURL,
                            sellerFeeBasisPoints: 0,
                            creators: null,
                            collection: null,
                            uses: null,
                        },
                        isMutable: true,
                        collectionDetails: null,
                    },
                }
            )
        )

        // Get associated token account address
        const associatedToken = await getAssociatedTokenAddress(
            mintAddress,
            Wallet.publicKey
        )

        // Add instruction to create associated token account
        transaction.add(
            createAssociatedTokenAccountInstruction(
                Wallet.publicKey,
                associatedToken,
                Wallet.publicKey,
                mintAddress
            )
        )

        // Add instruction to mint tokens to the associated token account
        transaction.add(
            createMintToInstruction(
                mintAddress,
                associatedToken,
                Wallet.publicKey,
                Number(initialSupply) * Math.pow(10, 9)
            )
        )

        transaction.feePayer = Wallet.publicKey
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
        transaction.partialSign(keypair)
        await Wallet.sendTransaction(transaction, connection)

        console.log("Token created successfully!")
        console.log("Mint address:", mintAddress.toString())
        alert(`Token created successfully! Mint address: ${mintAddress.toString()}`)
    }

    return (
        <div className="min-h-screen bg-black relative overflow-hidden" style={{ perspective: "1000px" }}>
            {/* Animated Background */}
            <AnimatedGridBackground />
            <FloatingOrbs />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl font-bold text-white mb-4">
                        Token Launchpad
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Create your Solana token in seconds with our advanced 3D interface
                    </p>
                </motion.div>

                {/* 2x2 Grid Layout */}
                <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Card 1: Token Name */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <ShinyCard className="h-full flex flex-col justify-center">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                                        📝
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Token Identity</h3>
                                </div>
                                <TextField
                                    label="Token Name"
                                    placeholder="e.g., My Awesome Token"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </ShinyCard>
                    </motion.div>

                    {/* Card 2: Token Symbol */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <ShinyCard className="h-full flex flex-col justify-center">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                                        🎯
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Token Symbol</h3>
                                </div>
                                <TextField
                                    label="Symbol"
                                    placeholder="e.g., AWESOME"
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                                    className="uppercase"
                                />
                            </div>
                        </ShinyCard>
                    </motion.div>

                    {/* Card 3: Metadata URI */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <ShinyCard className="h-full flex flex-col justify-center">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                                        🖼️
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Metadata</h3>
                                </div>
                                <TextField
                                    label="Metadata URI"
                                    placeholder="https://ipfs.io/ipfs/YOUR_HASH"
                                    value={imageURL}
                                    onChange={(e) => setImageURL(e.target.value)}
                                />
                                <p className="text-white/40 text-xs mt-2 flex items-start gap-2">
                                    <span className="text-white/50">ℹ️</span>
                                    <span>JSON file with token metadata</span>
                                </p>
                            </div>
                        </ShinyCard>
                    </motion.div>

                    {/* Card 4: Initial Supply */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <ShinyCard className="h-full flex flex-col justify-center">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                                        💰
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Supply</h3>
                                </div>
                                <TextField
                                    label="Initial Supply"
                                    type="number"
                                    placeholder="e.g., 1000000"
                                    value={initialSupply}
                                    onChange={(e) => setInitialSupply(e.target.value)}
                                />
                            </div>
                        </ShinyCard>
                    </motion.div>
                </div>

                {/* Launch Button */}
                <motion.div
                    className="max-w-5xl mx-auto mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <motion.button
                        onClick={handleCreateToken}
                        className="w-full py-6 bg-white hover:bg-white/90 text-black font-bold text-xl rounded-2xl shadow-2xl shadow-white/20 relative overflow-hidden group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Animated shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                                x: ['-200%', '200%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                        <span className="relative flex items-center justify-center gap-3">
                            <span className="text-3xl">🚀</span>
                            <span>Launch Token</span>
                        </span>
                    </motion.button>
                </motion.div>

                {/* Stats Footer */}
                <motion.div
                    className="max-w-5xl mx-auto mt-8 flex justify-around text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-1">~0.1 SOL</div>
                        <div className="text-sm text-white/50">Estimated Cost</div>
                    </div>
                    <div className="w-px bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-1">~5 sec</div>
                        <div className="text-sm text-white/50">Deploy Time</div>
                    </div>
                    <div className="w-px bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl font-bold text-white mb-1">SPL</div>
                        <div className="text-sm text-white/50">Token Standard</div>
                    </div>
                </motion.div>

                {/* Powered by badge */}
                <motion.div
                    className="mt-12 text-center text-white/50 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <p>Powered by Solana & Metaplex</p>
                </motion.div>
            </div>
        </div>
    )
}
