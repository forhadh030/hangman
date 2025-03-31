// This service handles fetching random words for the single player mode
// You can replace this with a call to the Wordnik API or another word API

// Fallback word list in case API is not available
const FALLBACK_WORDS = [
  "JAVASCRIPT",
  "REACT",
  "PROGRAMMING",
  "DEVELOPER",
  "ALGORITHM",
  "COMPUTER",
  "KEYBOARD",
  "FUNCTION",
  "VARIABLE",
  "INTERFACE",
  "COMPONENT",
  "FRAMEWORK",
  "DATABASE",
  "NETWORK",
  "SECURITY",
  "HANGMAN",
  "CHALLENGE",
  "PUZZLE",
  "SOLUTION",
  "VICTORY",
]

// Categories for more interesting gameplay
const WORD_CATEGORIES = {
  animals: ["ELEPHANT", "GIRAFFE", "PENGUIN", "DOLPHIN", "KANGAROO", "TIGER", "LEOPARD", "OCTOPUS"],
  countries: ["AUSTRALIA", "BRAZIL", "CANADA", "DENMARK", "EGYPT", "FRANCE", "GERMANY", "JAPAN"],
  movies: ["INCEPTION", "AVATAR", "TITANIC", "INTERSTELLAR", "GLADIATOR", "FROZEN", "JAWS"],
  food: ["PIZZA", "HAMBURGER", "SPAGHETTI", "CHOCOLATE", "PANCAKE", "SUSHI", "TACO"],
}

// Function to get a random word from Wordnik API
export async function getRandomWord(): Promise<string> {
  try {
    // If you have a Wordnik API key, you can use it here
    // const response = await fetch(`https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minLength=5&maxLength=10&api_key=YOUR_API_KEY`);
    // const data = await response.json();
    // return data.word.toUpperCase();

    // For now, we'll use our fallback words
    // Randomly choose a category or the main list
    const lists = [...Object.values(WORD_CATEGORIES), FALLBACK_WORDS]
    const selectedList = lists[Math.floor(Math.random() * lists.length)]

    // Get a random word from the selected list
    return selectedList[Math.floor(Math.random() * selectedList.length)]
  } catch (error) {
    console.error("Error fetching random word:", error)
    // Fallback to a random word from our list
    return FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)]
  }
}

