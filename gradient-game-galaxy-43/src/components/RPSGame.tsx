
import { useState } from "react";
import { motion } from "framer-motion";
import ScoreBoard from "./ScoreBoard";
import AnimatedButton from "./AnimatedButton";

type Choice = "rock" | "paper" | "scissors";
type Result = "win" | "lose" | "draw" | null;

const choices: Choice[] = ["rock", "paper", "scissors"];

const emojis: Record<Choice, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
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
    win: "text-game-win",
    lose: "text-game-lose",
    draw: "text-game-draw",
  };
  
  const resultMessages = {
    win: "You Win!",
    lose: "You Lose!",
    draw: "It's a Draw!",
  };

  return (
    <div>
      <ScoreBoard wins={score.wins} losses={score.losses} draws={score.draws} />
      
      <div className="flex justify-center space-x-4 mb-8">
        {choices.map(choice => (
          <AnimatedButton 
            key={choice}
            onClick={() => handleChoiceClick(choice)}
            className="text-3xl"
          >
            {emojis[choice]}
          </AnimatedButton>
        ))}
      </div>
      
      {userChoice && computerChoice && (
        <div className="text-center">
          <div className="flex justify-center items-center space-x-10 mb-6">
            <div className="text-center">
              <p className="text-sm mb-2">You chose:</p>
              <motion.div
                className="text-5xl"
                animate={isAnimating ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {emojis[userChoice]}
              </motion.div>
            </div>
            
            <div className="text-center">
              <p className="text-sm mb-2">Computer chose:</p>
              <motion.div
                className="text-5xl"
                animate={isAnimating ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {emojis[computerChoice]}
              </motion.div>
            </div>
          </div>
          
          {result && (
            <motion.div
              className={`text-2xl font-bold mt-4 ${resultColors[result]}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`${userChoice}-${computerChoice}`}
            >
              {resultMessages[result]}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default RPSGame;
