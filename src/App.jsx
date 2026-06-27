import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterSidebar from './components/FilterSidebar';
import CreatorGrid from './components/CreatorGrid';
import { useCreatorStore } from './store/useCreatorStore';

function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDarkMode } = useCreatorStore();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Center the 500px blob on the cursor
      mouseX.set(e.clientX - 250); 
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-sans overflow-hidden">
      
      {/* Dynamic Cursor Blob */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/20 dark:bg-blue-600/10 blur-[100px] pointer-events-none z-0 hidden sm:block"
        style={{
          x: springX,
          y: springY,
        }}
      />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row relative">
          <FilterSidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
          <CreatorGrid setIsMobileOpen={setIsMobileOpen} />
        </div>
      </div>
    </div>
  );
}

export default App;
