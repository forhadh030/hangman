"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

interface GameResultProps {
  status: "won" | "lost"
  word: string
  onPlayAgain: () => void
}

export default function GameResult({ status, word, onPlayAgain }: GameResultProps) {
  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-white flex items-center justify-center gap-2">
          {status === "won" ? (
            <>
              <CheckCircle className="text-green-500" />
              You Won!
            </>
          ) : (
            <>
              <XCircle className="text-red-500" />
              Game Over
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-300 mb-2">The word was:</p>
        <p className="text-2xl font-bold text-white mb-4">{word}</p>
        <p className="text-gray-400">
          {status === "won" ? "Great job! You guessed the word correctly." : "Better luck next time!"}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onPlayAgain} className="w-full bg-purple-600 hover:bg-purple-700">
          Play Again
        </Button>
      </CardFooter>
    </Card>
  )
}

