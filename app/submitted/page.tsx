"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ThemeToggle from "../components/theme-toggle"

export default function SubmittedPage() {
  const [texts, setTexts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const savedTexts = JSON.parse(localStorage.getItem("submittedTexts") || "[]")

        const shuffledTexts = [...savedTexts].sort(() => Math.random() - 0.5)

        setTexts(shuffledTexts)
        setIsLoading(false)
      }, 100)

      return () => clearTimeout(timer)
    } catch (error) {
      console.error("Metinler yüklenirken hata oluştu:", error)
      setTexts([])
      setIsLoading(false)
    }
  }, [])

  const handleFinish = () => {
    localStorage.setItem("submittedTexts", JSON.stringify([]))
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin text-4xl mb-4">⟳</div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ThemeToggle />
      <div className="container">
        <div className="card p-8 relative">
          {}
          <div className="absolute top-6 left-0 right-0 flex justify-between px-6 z-30">
            <Link href="/" passHref>
              <button className="btn btn-secondary">Bir Daha Gönder</button>
            </Link>

            <button onClick={handleFinish} className="btn">
              Bitir
            </button>
          </div>

          <div className="mt-24 mb-8">
            {" "}
            {}
            <h1 className="header text-center">Gönderilen Metinler</h1>
          </div>

          <div className="texts-container">
            {texts.length > 0 ? (
              <ul className="space-y-2">
                {texts.map((text, index) => (
                  <li key={index} className="text-item text-lg">
                    {text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg opacity-70">Henüz metin gönderilmedi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
