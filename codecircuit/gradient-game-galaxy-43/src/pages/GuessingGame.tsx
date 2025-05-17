
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import NeonButton from "@/components/NeonButton";
import { Input } from "@/components/ui/input";

const GuessingGame = () => {
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [messageColor, setMessageColor] = useState<string>("#00FFF0");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [previousGuesses, setPreviousGuesses] = useState<number[]>([]);
  const MAX_NUMBER = 25;

  // Initialize the game
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    // Generate a random number between 0 and 25
    const randomNum = Math.floor(Math.random() * (MAX_NUMBER + 1));
    setSecretNumber(randomNum);
    setGuess("");
    setMessage(`Guess a number between 0 and ${MAX_NUMBER}`);
    setIsCorrect(false);
    setAttempts(0);
    setMessageColor("#00FFF0"); // Default cyan color
    setPreviousGuesses([]);
    console.log("Secret number:", randomNum); // For debugging
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "");
    setGuess(value);
  };

  const getHint = (userGuess: number): string => {
    const difference = Math.abs(userGuess - secretNumber);
    
    if (difference === 0) {
      return `🎉 You guessed it! You win!`;
    }
    
    // Calculate how close the guess is as a percentage of the max range
    const closeness = difference / MAX_NUMBER;
    
    if (userGuess > secretNumber) {
      if (closeness < 0.1) return "Too high, but you're burning hot! 🔥 Try just a bit lower.";
      if (closeness < 0.2) return "Too high, but you're getting warm! Try lower.";
      if (closeness < 0.4) return "Too high! You need to go lower.";
      return "Way too high! Try a much lower number.";
    } else {
      if (closeness < 0.1) return "Too low, but you're burning hot! 🔥 Try just a bit higher.";
      if (closeness < 0.2) return "Too low, but you're getting warm! Try higher.";
      if (closeness < 0.4) return "Too low! You need to go higher.";
      return "Way too low! Try a much higher number.";
    }
  };

  const handleGuess = () => {
    if (!guess) return;
    
    const userGuess = parseInt(guess);
    
    // Store this guess in previousGuesses
    setPreviousGuesses(prev => [...prev, userGuess]);
    
    setAttempts(prev => prev + 1);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    const hint = getHint(userGuess);
    setMessage(hint);

    if (userGuess === secretNumber) {
      setIsCorrect(true);
      setMessageColor("#00FF6A"); // Green for correct
    } else if (userGuess > secretNumber) {
      setMessageColor("#FF00F0"); // Magenta for too high
    } else {
      setMessageColor("#FF3A5E"); // Red for too low
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isCorrect) {
      handleGuess();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-16 relative">
      <BackButton />
      
      <motion.h1 
        className="text-4xl font-bold mb-8"
        style={{ color: "#00FFF0", textShadow: "0 0 10px #00FFF088" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Number Guessing Game
      </motion.h1>
      
      <motion.div 
        className="bg-[#1a1a1a] p-8 rounded-2xl max-w-md w-full"
        style={{ boxShadow: "0 0 20px #00FFF066" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={message}
              className="text-xl font-semibold mb-4 text-center"
              style={{ 
                color: messageColor,
                textShadow: `0 0 10px ${messageColor}88`
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: isAnimating ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.p>
          </AnimatePresence>
          
          {!isCorrect ? (
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  value={guess}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your guess (0-25)"
                  className="text-white bg-[#2a2a2a] border-2 px-4 py-3 rounded-lg text-center text-xl w-full"
                  style={{ 
                    borderColor: "#00FFF0",
                    boxShadow: "0 0 10px #00FFF088"
                  }}
                  maxLength={2}
                  disabled={isCorrect}
                />
              </div>
              
              <NeonButton
                onClick={handleGuess}
                className="w-full text-lg"
                color="#00FFF0"
                disabled={!guess}
              >
                Submit Guess
              </NeonButton>
            </div>
          ) : (
            <div className="mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-white mb-4">
                  You found the number <span className="font-bold text-xl">{secretNumber}</span> in {attempts} {attempts === 1 ? 'attempt' : 'attempts'}!
                </p>
                
                <NeonButton
                  onClick={initGame}
                  className="w-full text-lg"
                  color="#00FF6A"
                >
                  Play Again
                </NeonButton>
              </motion.div>
            </div>
          )}
        </div>
        
        {/* Stats section with previous guesses */}
        {attempts > 0 && !isCorrect && (
          <motion.div 
            className="mt-6 p-3 rounded-lg bg-[#2a2a2a30] border border-[#ffffff22]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 text-sm mb-2">
              Attempts: <span className="text-white font-bold">{attempts}</span>
            </p>
            {previousGuesses.length > 0 && (
              <div>
                <p className="text-gray-400 text-sm">Previous guesses:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {previousGuesses.map((prevGuess, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-md text-xs font-mono"
                      style={{
                        backgroundColor: prevGuess > secretNumber ? "#FF00F033" : 
                                        prevGuess < secretNumber ? "#FF3A5E33" : "#00FF6A33",
                        color: prevGuess > secretNumber ? "#FF00F0" : 
                              prevGuess < secretNumber ? "#FF3A5E" : "#00FF6A",
                        border: `1px solid ${prevGuess > secretNumber ? "#FF00F066" : 
                                prevGuess < secretNumber ? "#FF3A5E66" : "#00FF6A66"}`
                      }}
                    >
                      {prevGuess}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GuessingGame;
