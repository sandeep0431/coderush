
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from "@/components/BackButton";
import NeonButton from "@/components/NeonButton";

const DiceGame = () => {
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
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-16 relative">
      <BackButton color="#00FF6A" />
      
      <motion.h1 
        className="text-4xl font-bold mb-8"
        style={{ color: "#00FF6A", textShadow: "0 0 10px #00FF6A88" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dice Roller
      </motion.h1>
      
      <motion.div 
        className="bg-[#1a1a1a] p-8 rounded-2xl max-w-lg w-full"
        style={{ boxShadow: "0 0 20px #00FF6A66" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-center mb-8">
          <motion.div 
            className="w-40 h-40 flex items-center justify-center"
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
                transition={{ type: "spring", stiffness: 300 }}
                style={{ filter: "drop-shadow(0 0 10px #00FF6A)" }}
              />
            ) : (
              <div 
                className="text-4xl text-white opacity-50"
                style={{ textShadow: "0 0 5px #00FF6A" }}
              >
                ?
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <NeonButton 
            onClick={handleRoll} 
            disabled={isRolling}
            color="#00FF6A"
          >
            Roll Dice
          </NeonButton>
          <NeonButton 
            onClick={handleReset} 
            disabled={rollHistory.length === 0 && currentRoll === null}
            color="#00FF6A"
          >
            Reset
          </NeonButton>
        </div>
        
        <div className="mt-8">
          <h3 
            className="text-lg font-medium mb-4 text-center"
            style={{ color: "#00FF6A", textShadow: "0 0 5px #00FF6A88" }}
          >
            Roll History
          </h3>
          <div className="flex space-x-4 justify-center">
            <AnimatePresence>
              {rollHistory.map((roll, index) => (
                <motion.div
                  key={`${roll}-${index}`}
                  className="w-12 h-12 flex items-center justify-center rounded-lg font-bold text-white"
                  style={{ 
                    border: "1px solid #00FF6A",
                    boxShadow: "0 0 10px #00FF6A88"
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {roll}
                </motion.div>
              ))}
            </AnimatePresence>
            {rollHistory.length === 0 && (
              <p className="text-gray-500">No rolls yet</p>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Audio element for sound effect */}
      <audio ref={audioRef} preload="auto">
        <source src="/dice-roll.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default DiceGame;
