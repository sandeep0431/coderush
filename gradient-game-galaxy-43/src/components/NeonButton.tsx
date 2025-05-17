
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonButtonProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
  color?: string;
  disabled?: boolean;
}

const NeonButton = ({ 
  onClick, 
  className = "", 
  children, 
  color = "#00FFF0",
  disabled = false 
}: NeonButtonProps) => {
  return (
    <motion.button
      className={`px-6 py-3 rounded-xl text-white font-semibold border transition-all ${className}`}
      style={{ 
        borderColor: color,
        boxShadow: `0 0 10px ${color}88`,
        textShadow: `0 0 5px ${color}88`
      }}
      whileHover={{ 
        backgroundColor: `${color}22`,
        boxShadow: `0 0 15px ${color}`
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default NeonButton;
