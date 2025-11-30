import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export function ShinyCard({ children, className, ...props }) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl p-8",
        "before:absolute before:inset-0 before:bg-linear-to-br before:from-white/5 before:to-transparent before:opacity-0",
        "hover:before:opacity-100 before:transition-opacity before:duration-500",
        "group",
        className
      )}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(255, 255, 255, 0.4)",
        rotateX: 2,
        rotateY: 2,
        z: 50,
      }}
      transition={{ duration: 0.3 }}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {/* Animated shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-white/5 blur-2xl" />
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
