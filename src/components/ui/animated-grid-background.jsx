import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedGridBackground() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff0a 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Moving Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/30 rounded-full blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: ['-100px', '100px', '-100px'],
            y: ['-100px', '100px', '-100px'],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Diagonal Moving Lines */}
      <motion.div
        className="absolute w-[200%] h-0.5 bg-linear-to-r from-transparent via-white/20 to-transparent"
        style={{
          left: '-50%',
          top: '20%',
          rotate: '45deg',
        }}
        animate={{
          x: ['0%', '100%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute w-[200%] h-0.5 bg-linear-to-r from-transparent via-white/20 to-transparent"
        style={{
          left: '-50%',
          top: '60%',
          rotate: '-45deg',
        }}
        animate={{
          x: ['0%', '100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: 5
        }}
      />
    </div>
  )
}
