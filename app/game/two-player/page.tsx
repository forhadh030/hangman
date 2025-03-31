"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GameScreen from "@/components/game-screen"

export default function TwoPlayerPage() {
  const [step, setStep] = useState(1)
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")
  const [word, setWord] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmitNames = (e: React.FormEvent) => {
    e.preventDefault()
    if (player1.trim().length === 0 || player2.trim().length === 0) {
      setError("Both player names are required")
      return
    }

    if (player1.length > 15 || player2.length > 15) {
      setError("Names must be 15 characters or less")
      return
    }

    setError("")
    setStep(2)
  }

  const handleSubmitWord = (e: React.FormEvent) => {
    e.preventDefault()
    if (word.trim().length === 0) {
      setError("Word or phrase is required")
      return
    }

    if (word.length > 30) {
      setError("Word or phrase must be 30 characters or less")
      return
    }

    setError("")
    setStep(3)
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Enter Player Names</CardTitle>
            <CardDescription className="text-gray-400">Who's playing today?</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitNames}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="player1" className="text-gray-300">
                  Player 1 (creator):
                </Label>
                <Input
                  id="player1"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  maxLength={15}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="player2" className="text-gray-300">
                  Player 2 (guesser):
                </Label>
                <Input
                  id="player2"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  maxLength={15}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Continue
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">{player1}'s Turn</CardTitle>
            <CardDescription className="text-gray-400">Enter a word or phrase for {player2} to guess</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmitWord}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="word" className="text-gray-300">
                  Word or Phrase
                </Label>
                <Input
                  id="word"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  maxLength={50}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <p className="text-xs text-gray-400">Maximum 50 characters</p>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Start Game
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  }

  return <GameScreen word={word} playerName={player2} onGameEnd={() => router.push("/")} />
}

