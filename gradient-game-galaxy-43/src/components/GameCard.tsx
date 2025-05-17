
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GameCardProps {
  title: string;
  children: ReactNode;
}

const GameCard = ({ title, children }: GameCardProps) => {
  return (
    <motion.div
      className="glass-card w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      {children}
    </motion.div>
  );
};

export default GameCard;
