import { BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-blue-50/40 backdrop-blur-sm border-b border-white/50 shadow-md shadow-blue-300/10 "
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto h-16 flex cursor-pointer items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          // whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.div 
            className="w-9 h-9 bg-gradient-to-br from-primary-blue-200 to-blue-200 rounded-xl flex items-center justify-center"
            // whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <BookOpen className="w-5 h-5 text-blue-900" />
          </motion.div>
          <span className="text-xl font-bold text-shadow-blue-900">Pure Page</span>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-8 text-md font-normal">
          {["Features", "Join Waitlist"].map((item, index) => (
            <motion.a
              key={item}
              href={item === "Features" ? "#features" : "#waitlist"}
              className="text-muted-foreground hover:text-foreground transition-colors relative"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}