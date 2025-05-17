
import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#0f0f0f] flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut" 
        }}
        className="text-center"
      >
        <motion.h1 
          className="text-6xl md:text-7xl font-extrabold tracking-wider bg-gradient-to-r from-[#00fff0] via-[#ff00f0] to-[#00ff6a] text-transparent bg-clip-text"
          animate={{ 
            textShadow: ["0 0 10px #00fff0", "0 0 20px #00fff0", "0 0 10px #00fff0"] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          Lumin Arcade
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
