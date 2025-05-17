
import { motion } from "framer-motion";

interface ScoreBoardProps {
  wins: number;
  losses: number;
  draws: number;
}

const ScoreBoard = ({ wins, losses, draws }: ScoreBoardProps) => {
  return (
    <motion.div
      className="flex justify-around mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center">
        <p className="text-sm text-green-500 font-semibold">Wins</p>
        <p className="text-2xl font-bold">{wins}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-blue-500 font-semibold">Draws</p>
        <p className="text-2xl font-bold">{draws}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-red-500 font-semibold">Losses</p>
        <p className="text-2xl font-bold">{losses}</p>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;
