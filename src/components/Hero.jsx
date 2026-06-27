import { motion } from 'framer-motion';

const Hero = () => {
  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 pt-16 pb-12 sm:pt-24 sm:pb-16 transition-colors duration-300">
      {/* Dynamic Animated Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 dark:opacity-20 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, -50, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="absolute top-10 left-1/4 w-72 h-72 bg-blue-400 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten" 
        />
        <motion.div 
          animate={{ x: [0, -60, 40, 0], y: [0, -40, 50, 0] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-500 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten" 
        />
        <motion.div 
          animate={{ x: [0, 40, -30, 0], y: [0, 50, -40, 0] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute -bottom-10 left-1/3 w-64 h-64 bg-purple-400 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten" 
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
        >
          Discover creators that <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-300% animate-gradient">match your campaign.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed"
        >
          Find, analyze, and connect with top influencers across all platforms. 
          The smartest way to scale your influencer marketing.
        </motion.p>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 }
            }
          }}
          initial="hidden"
          animate="show"
          className="flex justify-center flex-wrap gap-4 sm:gap-6 text-center"
        >
          {[
            { value: "10K+", label: "Total Creators" },
            { value: "45", label: "Countries" },
            { value: "8+", label: "Platforms" },
            { value: "5.2%", label: "Avg Engagement" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              variants={statVariants}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/40 dark:border-gray-700/50 shadow-xl shadow-blue-900/5 min-w-[140px]"
            >
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
