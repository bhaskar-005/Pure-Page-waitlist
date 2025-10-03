import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="relative pt-24 pb-32 px-6 overflow-hidden bg-gradient-to-b from-blue-100/80 to-gray-200/0">
      <div className="max-w-7xl mx-auto mt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                <Sparkles className="w-4 h-4" />
              </motion.div>
              AI-Powered Journaling
            </motion.div>

            {/* Headline */}
            <motion.div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Your thoughts,
                </motion.span>
                <br />
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  beautifully captured
                </motion.span>
              </h1>
              <motion.p className="text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed">
                Experience the future of journaling with AI-powered insights, intelligent prompts to reflect deeper every day.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href={"#waitlist"}
              className="text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <motion.button 
                className="px-8 py-4 cursor-pointer bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm"
                // whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Join the Waitlist
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
              </motion.a>

              {/* <motion.button 
                className="px-8 py-4 border-3 text-blue-700 rounded-xl font-semibold hover:bg-gray-300 transition shadow-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                See Demo
              </motion.button> */}
            </motion.div>

            {/* Badges / Highlights */}
            <motion.div className="flex items-center gap-6 text-sm text-gray-500 pt-4">
              {[
                { text: "Coming Soon", color: "bg-green-500 ", bg: "bg-green-500/20" },
                { text: "Free to start", color: "bg-purple-500 ", bg: "bg-purple-500/20" }
              ].map((item, index) => (
                <motion.div 
                  key={item.text}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                >
                  <motion.div 
                    className="relative flex items-center justify-center"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                      className={`absolute w-4 h-4 rounded-full ${item.bg} `}
                    />
                    <div className={`w-3 h-3 ${item.color} rounded-full relative z-10`} />
                  </motion.div>          
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <motion.div 
              className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <motion.img 
                src="https://cdn.veryfront.com/687d7ea8-017c-417a-b951-47440f718171/assets/f55dc0f3-5783-4ba6-9688-e53f8bb2eb19.webp"
                alt="Person writing in journal"
                className="w-full h-full object-cover"
                // initial={{ scale: 1.1 }}
                // animate={{ scale: 1 }}
                // transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.div>

            {/* Floating Sparkles */}
            <motion.div 
              className="absolute -top-6 -right-6 w-20 h-20 bg-blue-200/30 rounded-2xl backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.15, rotate: 5 }}
            >
              <Sparkles className="w-8 h-8 text-blue-600" />
            </motion.div>

            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
