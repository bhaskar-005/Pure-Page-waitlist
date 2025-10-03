import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
  index?: number;
}

export function FeatureCard({ icon, title, description, comingSoon = true, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="relative p-8 cursor-pointer bg-white rounded-3xl border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Coming Soon Badge */}
      {comingSoon && (
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
        >
          <motion.span
            className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full font-semibold tracking-wide"
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.3)",
                "0 0 0 12px rgba(59, 130, 246, 0)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            Coming Soon
          </motion.span>
        </motion.div>
      )}

      <div className="space-y-6 relative z-10">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          {icon}
        </motion.div>

        {/* Title & Description */}
        <div className="space-y-2">
          <motion.h3
            className="text-xl sm:text-2xl font-semibold text-blue-950"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-gray-600 text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Subtle hover gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
        initial={false}
      />
    </motion.div>
  );
}
