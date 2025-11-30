import { cn } from "../../lib/utils"
import { forwardRef } from "react"

export const TextField = forwardRef(({ label, className, error, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-white text-sm font-semibold tracking-wider uppercase">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 bg-black/80 border border-white/30 rounded-xl",
          "text-white placeholder:text-white/40",
          "outline-none focus:border-white focus:ring-2 focus:ring-white/20",
          "transition-all duration-300",
          "hover:border-white/50",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
})

TextField.displayName = "TextField"
