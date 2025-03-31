"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import GameScreen from "@/components/game-screen"
import { getRandomWord } from "@/lib/word-service"
import LoadingScreen from "@/components/loading-screen"

export default function SinglePlayerPage() {
  const [word, setWord] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const randomWord = await getRandomWord()
        setWord(randomWord)
      } catch (error) {
        console.error("Failed to fetch word:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWord()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return <GameScreen word={word} playerName="Player" onGameEnd={() => router.push("/")} />
}

