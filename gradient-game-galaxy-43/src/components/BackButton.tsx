
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  color?: string;
}

const BackButton = ({ color = "#00FFF0" }: BackButtonProps) => {
  const navigate = useNavigate();
  
  return (
    <motion.button
      className="absolute top-4 left-4 flex items-center gap-2 text-white px-4 py-2 rounded-lg"
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
      onClick={() => navigate('/')}
    >
      <ArrowLeft size={18} />
      <span>Back</span>
    </motion.button>
  );
};

export default BackButton;
