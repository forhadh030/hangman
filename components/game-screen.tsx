"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"
import Keyboard from "@/components/keyboard"
import GameResult from "@/components/game-result"

// Dynamically import the HangmanScene component with no SSR
const HangmanScene = dynamic(() => import("@/components/hangman-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-white">Loading 3D scene...</p>
    </div>
  ),
})

interface GameScreenProps {
  word: string
  playerName: string
  onGameEnd: () => void
}

export default function GameScreen({ word, playerName, onGameEnd }: GameScreenProps) {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wrongGuesses, setWrongGuesses] = useState<number>(0)
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")

  const normalizedWord = word.toUpperCase()
  const maxWrongGuesses = 6

  // Filter out non-alphabetic characters for guessing purposes
  const lettersToGuess = normalizedWord.replace(/[^A-Z]/g, "")

  // Check if the player has won
  useEffect(() => {
    if (gameStatus !== "playing") return

    const allLettersGuessed = [...lettersToGuess].every((letter) => guessedLetters.includes(letter))

    if (allLettersGuessed) {
      setGameStatus("won")
    }
  }, [guessedLetters, lettersToGuess, gameStatus])

  // Handle letter guess
  const handleGuess = (letter: string) => {
    if (gameStatus !== "playing") return

    const upperLetter = letter.toUpperCase()

    // If letter was already guessed, do nothing
    if (guessedLetters.includes(upperLetter)) return

    // Add letter to guessed letters
    setGuessedLetters((prev) => [...prev, upperLetter])

    // If letter is not in the word, increment wrong guesses
    if (!normalizedWord.includes(upperLetter)) {
      const newWrongGuesses = wrongGuesses + 1
      setWrongGuesses(newWrongGuesses)

      if (newWrongGuesses >= maxWrongGuesses) {
        setGameStatus("lost")
      }
    }
  }

  // Display the word with blanks for unguessed letters
  const displayWord = normalizedWord
    .split("")
    .map((char) => {
      if (char === " ") return " "
      if (!/[A-Z]/.test(char)) return char
      return guessedLetters.includes(char) ? char : "_"
    })
    .join("")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-white">{playerName}'s Turn</h1>
          <p className="text-gray-400">
            Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-1/2 aspect-square">
            <Card className="w-full h-full bg-gray-800 border-gray-700 overflow-hidden">
              <HangmanScene wrongGuesses={wrongGuesses} />
            </Card>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="text-center mb-6">
              <div className="text-2xl md:text-4xl font-mono tracking-wider text-white mb-4 min-h-[60px] flex flex-wrap justify-center gap-1">
                {displayWord.split("").map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block min-w-[1ch] ${char === "_" ? "border-b-2 border-gray-400" : ""}`}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {gameStatus === "playing" ? (
          <Keyboard guessedLetters={guessedLetters} onGuess={handleGuess} />
        ) : (
          <GameResult status={gameStatus} word={normalizedWord} onPlayAgain={onGameEnd} />
        )}
      </div>
    </div>
  )
}