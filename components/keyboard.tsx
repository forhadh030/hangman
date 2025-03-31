"use client"

import { Button } from "@/components/ui/button"

interface KeyboardProps {
  guessedLetters: string[]
  onGuess: (letter: string) => void
}

export default function Keyboard({ guessedLetters, onGuess }: KeyboardProps) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ]

  return (
    <div className="w-full max-w-2xl">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-2">
          {row.map((letter) => {
            const isGuessed = guessedLetters.includes(letter)

            return (
              <Button
                key={letter}
                variant={isGuessed ? "secondary" : "default"}
                className={`w-10 h-12 md:w-12 md:h-14 font-bold ${
                  isGuessed ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                }`}
                onClick={() => onGuess(letter)}
                disabled={isGuessed}
              >
                {letter}
              </Button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

