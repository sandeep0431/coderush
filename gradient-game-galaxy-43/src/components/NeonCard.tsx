
import { motion } from "framer-motion";

interface NeonCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const NeonCard = ({ title, description, icon, color, onClick }: NeonCardProps) => {
  return (
    <motion.div
      className="relative p-1 rounded-2xl cursor-pointer"
      style={{ 
        background: `linear-gradient(45deg, ${color}, transparent)`,
        boxShadow: `0 0 15px ${color}88`
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: `0 0 20px ${color}`
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-[#1a1a1a] rounded-xl p-6 h-full">
        <div className="text-4xl mb-3">{icon}</div>
        <h2 
          className="text-2xl font-bold mb-2" 
          style={{ color: color, textShadow: `0 0 8px ${color}88` }}
        >
          {title}
        </h2>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default NeonCard;
