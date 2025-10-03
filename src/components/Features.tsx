import { FeatureCard } from "@/components/FeatureCard";
import { Bot, Mic, TrendingUp, Image, Settings, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-blue-600" />,
      title: "AI Writing Helper",
      description:
        "Get personalized prompts and insights that feel human, helping you dive deeper into your thoughts and experiences."
    },
    {
      icon: <Mic className="w-6 h-6 text-blue-600" />,
      title: "Voice Recording",
      description:
        "Capture your thoughts on the go with seamless voice-to-text transcription that preserves your natural speaking style."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      title: "Streak Tracking",
      description:
        "Stay motivated with beautiful visualizations of your journaling consistency and personal growth over time."
    },
    {
      icon: <Image className="w-6 h-6 text-blue-600" />,
      title: "Rich Media",
      description:
        "Add photos, sketches, and multimedia to create rich, memorable entries that tell your complete story."
    },
    {
      icon: <Settings className="w-6 h-6 text-blue-600" />,
      title: "Smart Organization",
      description:
        "Automatic tagging, mood tracking, and intelligent search help you find and reflect on past entries effortlessly."
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Quick Entry",
      description:
        "Jump straight to writing with fast entry creation, minimal interface, and distraction-free writing environment."
    }
  ];

  return (
    <section id="features" className="relative py-24 px-6  overflow-hidden">
      {/* Background Circles */}
      <motion.div
        className="absolute top-16 -left-16 w-40 h-40 bg-blue-100 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 -right-16 w-60 h-60 bg-blue-50 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div 
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl lg:text-4xl font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Everything you need to {" "}
            <motion.span 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              Journal beautifully
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            Pure Page combines the intimacy of traditional journaling with the power of modern AI to create something truly special.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
