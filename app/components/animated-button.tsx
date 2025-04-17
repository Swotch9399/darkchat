"use client"

import type React from "react"
import { useState } from "react"

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary"
}

export default function AnimatedButton({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const baseClass = variant === "primary" ? "btn" : "btn btn-secondary"

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className} relative overflow-hidden z-10`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {isPressed && (
        <span className="absolute w-full h-full top-0 left-0 bg-black opacity-30 rounded-full transform scale-0 animate-ripple" />
      )}
      {children}
    </button>
  )
}
