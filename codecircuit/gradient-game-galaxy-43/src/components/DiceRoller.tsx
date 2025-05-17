
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import RollHistory from "./RollHistory";

const DiceRoller = () => {
  const [currentRoll, setCurrentRoll] = useState<number | null>(null);
  const [rollHistory, setRollHistory] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const handleRoll = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Play sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    
    // Generate random dice roll
    const result = Math.floor(Math.random() * 6) + 1;
    
    // Simulate the dice rolling animation
    setTimeout(() => {
      setCurrentRoll(result);
      setRollHistory(prev => {
        const newHistory = [result, ...prev];
        return newHistory.slice(0, 3);
      });
      setIsRolling(false);
    }, 800);
  };
  
  const handleReset = () => {
    setRollHistory([]);
    setCurrentRoll(null);
  };
  
  return (
    <div className="text-center">
      <div className="flex justify-center mb-8">
        <motion.div 
          className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center"
          animate={isRolling ? { 
            rotate: [0, 360, 720, 1080], 
            scale: [1, 0.8, 1.2, 1]
          } : {}}
          transition={{ duration: 0.8 }}
        >
          {currentRoll ? (
            <motion.img 
              src={`/images/dice-${currentRoll}.svg`} 
              alt={`Dice ${currentRoll}`}
              className="w-full h-full"
              key={`dice-${currentRoll}-${Date.now()}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          ) : (
            <div className="text-4xl text-white opacity-50">?</div>
          )}
        </motion.div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <AnimatedButton onClick={handleRoll} disabled={isRolling}>
          Roll Dice
        </AnimatedButton>
        <AnimatedButton 
          onClick={handleReset} 
          className="bg-opacity-20"
          disabled={rollHistory.length === 0 && currentRoll === null}
        >
          Reset
        </AnimatedButton>
      </div>
      
      <RollHistory rolls={rollHistory} />
      
      {/* Audio element for sound effect */}
      <audio ref={audioRef} preload="auto">
        <source src="/dice-roll.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default DiceRoller;
