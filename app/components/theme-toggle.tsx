"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("light", savedTheme === "light")
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      const systemPreference = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
      setTheme(systemPreference)
      document.documentElement.classList.toggle("light", systemPreference === "light")
      document.documentElement.classList.toggle("dark", systemPreference === "dark")
      localStorage.setItem("theme", systemPreference)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("light", newTheme === "light")
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Tema değiştir" title="Tema değiştir">
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  )
}
