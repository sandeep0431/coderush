
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NeonCard from "@/components/NeonCard";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen py-8 px-4 bg-[#0f0f0f]">
      <motion.header
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-[0_0_15px_rgba(0,255,240,0.8)]">
          Lumin Arcade
        </h1>
        <p className="text-white text-opacity-80 max-w-lg mx-auto">
          Choose a game to play from our collection of mini-games
        </p>
      </motion.header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <NeonCard 
          title="Play Rock-Paper-Scissors" 
          description="Challenge the computer in this classic game"
          icon="🎮"
          color="#FF00F0"
          onClick={() => navigate('/rps')}
        />
        
        <NeonCard 
          title="Play Dice Roller" 
          description="Test your luck with our virtual dice"
          icon="🎲"
          color="#00FF6A"
          onClick={() => navigate('/dice')}
        />
        
        <NeonCard 
          title="Play Number Guesser" 
          description="Can you guess the hidden number?"
          icon="🎯"
          color="#00FFF0"
          onClick={() => navigate('/guess')}
        />
      </div>
      
      <motion.footer
        className="text-center text-white text-opacity-60 mt-16 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Created with React, Tailwind CSS, and Framer Motion</p>
      </motion.footer>
    </div>
  );
};

export default Index;
