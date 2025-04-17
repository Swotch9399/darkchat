"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ThemeToggle from "./components/theme-toggle"

export default function Home() {
  const [text, setText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedTexts = localStorage.getItem("submittedTexts")
    if (!savedTexts) {
      localStorage.setItem("submittedTexts", JSON.stringify([]))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setIsSubmitting(true)

    const savedTexts = JSON.parse(localStorage.getItem("submittedTexts") || "[]")
    const updatedTexts = [...savedTexts, text]

    setTimeout(() => {
      localStorage.setItem("submittedTexts", JSON.stringify(updatedTexts))
      setText("")
      setIsSubmitting(false)
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ThemeToggle />
      <div className="container">
        <div className="card p-8 relative">
          <div className="absolute top-6 right-6 flex flex-col gap-4 z-20">
            <Link href="/submitted" passHref>
              <button className="btn btn-secondary">Bitir</button>
            </Link>
          </div>

          <div className="mt-16 mb-8">
            <h1 className="header text-center">DarkChat</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Metin girin..."
              className="input-field flex-1"
            />
            <button type="submit" className="btn">
              {isSubmitting ? <span className="inline-block animate-spin">⟳</span> : "Gönder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
