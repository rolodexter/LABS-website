import { motion } from 'framer-motion';

export default function CapabilityCard({ title, description, icon: Icon, animationDelay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="relative group"
    >
      <div className="bg-black p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-all duration-300">
        <div className="flex items-start space-x-4">
          {Icon && (
            <div className="flex-shrink-0">
              <Icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>

        {/* Sliding panel with additional details */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-800">
            <slot name="details" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
