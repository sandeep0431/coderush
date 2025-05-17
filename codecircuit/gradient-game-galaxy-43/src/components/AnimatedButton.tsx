
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  onClick: () => void;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

const AnimatedButton = ({ onClick, className = "", children, disabled = false }: AnimatedButtonProps) => {
  return (
    <motion.button
      className={`px-6 py-3 rounded-xl bg-white bg-opacity-30 hover:bg-opacity-40 font-semibold transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
