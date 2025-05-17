
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import NeonButton from "@/components/NeonButton";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw" | null;

const choices: Choice[] = ["rock", "paper", "scissors"];

// Updated modern neon icons
const emojis: Record<Choice, JSX.Element> = {
  rock: (
    <div className="flex items-center justify-center w-12 h-12 bg-[#FF00F022] rounded-full border-2 border-[#FF00F0] shadow-[0_0_15px_#FF00F088]">
      <span className="text-3xl">✊</span>
    </div>
  ),
  paper: (
    <div className="flex items-center justify-center w-12 h-12 bg-[#00FFF022] rounded-full border-2 border-[#00FFF0] shadow-[0_0_15px_#00FFF088]">
      <span className="text-3xl">✋</span>
    </div>
  ),
  scissors: (
    <div className="flex items-center justify-center w-12 h-12 bg-[#00FF6A22] rounded-full border-2 border-[#00FF6A] shadow-[0_0_15px_#00FF6A88]">
      <span className="text-3xl">✌️</span>
    </div>
  ),
};

const RPSGame = () => {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChoiceClick = (choice: Choice) => {
    setIsAnimating(true);
    setUserChoice(choice);
    
    // Random computer choice
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerSelection = choices[randomIndex];
    setComputerChoice(computerSelection);
    
    // Determine result
    let gameResult: Result = null;
    
    if (choice === computerSelection) {
      gameResult = "draw";
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (choice === "rock" && computerSelection === "scissors") ||
      (choice === "paper" && computerSelection === "rock") ||
      (choice === "scissors" && computerSelection === "paper")
    ) {
      gameResult = "win";
      setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      gameResult = "lose";
      setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
    }
    
    setResult(gameResult);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const resultColors = {
    win: "#00FF6A",
    lose: "#FF3A5E",
    draw: "#00FFF0",
  };
  
  const resultMessages = {
    win: "You Win!",
    lose: "You Lose!",
    draw: "It's a Draw!",
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-16 relative">
      <BackButton />
      
      <motion.h1 
        className="text-4xl font-bold mb-8"
        style={{ color: "#FF00F0", textShadow: "0 0 10px #FF00F088" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Rock Paper Scissors
      </motion.h1>
      
      <motion.div 
        className="bg-[#1a1a1a] p-8 rounded-2xl max-w-2xl w-full"
        style={{ boxShadow: "0 0 20px #FF00F066" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-around mb-6">
          <div className="text-center">
            <p className="text-sm" style={{ color: "#00FF6A", textShadow: "0 0 5px #00FF6A88" }}>Wins</p>
            <motion.p 
              className="text-2xl font-bold text-white"
              key={score.wins}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {score.wins}
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-sm" style={{ color: "#00FFF0", textShadow: "0 0 5px #00FFF088" }}>Draws</p>
            <motion.p 
              className="text-2xl font-bold text-white"
              key={score.draws}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {score.draws}
            </motion.p>
          </div>
          <div className="text-center">
            <p className="text-sm" style={{ color: "#FF3A5E", textShadow: "0 0 5px #FF3A5E88" }}>Losses</p>
            <motion.p 
              className="text-2xl font-bold text-white"
              key={score.losses}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {score.losses}
            </motion.p>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          {choices.map(choice => (
            <NeonButton 
              key={choice}
              onClick={() => handleChoiceClick(choice)}
              className="text-3xl flex items-center justify-center"
              color={choice === "rock" ? "#FF00F0" : choice === "paper" ? "#00FFF0" : "#00FF6A"}
            >
              {emojis[choice]}
            </NeonButton>
          ))}
        </div>
        
        {userChoice && computerChoice && (
          <>
            <div className="flex justify-center items-center space-x-10 mb-6">
              <div className="text-center">
                <p className="text-sm mb-2 text-gray-400">You chose:</p>
                <motion.div
                  animate={isAnimating ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {emojis[userChoice]}
                </motion.div>
              </div>
              
              <div className="text-center">
                <p className="text-sm mb-2 text-gray-400">Computer chose:</p>
                <motion.div
                  animate={isAnimating ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {emojis[computerChoice]}
                </motion.div>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  className="text-2xl font-bold mt-4 text-center"
                  style={{ 
                    color: resultColors[result],
                    textShadow: `0 0 10px ${resultColors[result]}88`
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  key={`${userChoice}-${computerChoice}`}
                >
                  {resultMessages[result]}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default RPSGame;
