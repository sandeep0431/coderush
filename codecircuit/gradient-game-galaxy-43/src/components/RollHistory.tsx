
import { motion } from "framer-motion";

interface RollHistoryProps {
  rolls: number[];
}

const RollHistory = ({ rolls }: RollHistoryProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Roll History:</h3>
      <div className="flex space-x-4 justify-center">
        {rolls.map((roll, index) => (
          <motion.div
            key={index}
            className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-30 rounded-lg font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {roll}
          </motion.div>
        ))}
        {rolls.length === 0 && (
          <p className="text-gray-600">No rolls yet</p>
        )}
      </div>
    </div>
  );
};

export default RollHistory;
