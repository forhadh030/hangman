import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-white mb-2">Hangman</h1>
        <p className="text-gray-300 mb-8">Test your vocabulary and save the stick figure!</p>

        <Card className="bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Choose Game Mode</CardTitle>
            <CardDescription className="text-gray-400">Play alone or challenge a friend</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/game/single-player" className="w-full">
              <Button variant="default" size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                Single Player
              </Button>
            </Link>
            <Link href="/game/two-player" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-purple-600 text-purple-400 hover:bg-purple-900/20"
              >
                Two Players
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="text-sm text-gray-400">
            Single player uses random words • Two player lets you enter custom words
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

