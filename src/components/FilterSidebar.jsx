import { useCreatorStore } from '../store/useCreatorStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFilter, FiCheck } from 'react-icons/fi';
import clsx from 'clsx';

const categories = ['Technology', 'Fashion', 'Fitness', 'Finance', 'Travel', 'Food', 'Art', 'Gaming', 'Beauty'];
const platforms = ['YouTube', 'Instagram', 'TikTok', 'Twitter', 'Twitch', 'Pinterest'];

const FilterSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { filters, setFilter, toggleArrayFilter, clearFilters } = useCreatorStore();

  const activeFilterCount = filters.categories.length + filters.platforms.length + (filters.verifiedOnly ? 1 : 0) + (filters.availableOnly ? 1 : 0);

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 w-full sm:w-72 overflow-hidden transition-colors duration-300">
      <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <h2 className="font-bold text-gray-900 dark:text-white">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Clear
            </button>
          )}
          <button className="sm:hidden text-gray-500" onClick={() => setIsMobileOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 scrollbar-hide">
        
        {/* Verification & Availability */}
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={clsx(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              filters.verifiedOnly ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-gray-600 group-hover:border-blue-500 dark:bg-gray-800"
            )}>
              {filters.verifiedOnly && <FiCheck className="text-white w-3 h-3" />}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Verified Creators Only</span>
            <input 
              type="checkbox" 
              className="hidden" 
              checked={filters.verifiedOnly} 
              onChange={() => setFilter('verifiedOnly', !filters.verifiedOnly)} 
            />
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={clsx(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors",
              filters.availableOnly ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-gray-600 group-hover:border-blue-500 dark:bg-gray-800"
            )}>
              {filters.availableOnly && <FiCheck className="text-white w-3 h-3" />}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for Collab</span>
            <input 
              type="checkbox" 
              className="hidden" 
              checked={filters.availableOnly} 
              onChange={() => setFilter('availableOnly', !filters.availableOnly)} 
            />
          </label>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = filters.categories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleArrayFilter('categories', cat)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border",
                    isActive 
                      ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-blue-400" 
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
          <div className="space-y-2">
            {platforms.map((platform) => {
              const isActive = filters.platforms.includes(platform);
              return (
                <label key={platform} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors -mx-2">
                  <div className={clsx(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    isActive ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-gray-600 group-hover:border-blue-500 dark:bg-gray-800"
                  )}>
                    {isActive && <FiCheck className="text-white w-3 h-3" />}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">{platform}</span>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={isActive} 
                    onChange={() => toggleArrayFilter('platforms', platform)} 
                  />
                </label>
              );
            })}
          </div>
        </div>
        
        {/* Price Range */}
        <div>
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Price Range</h3>
            <span className="text-sm text-gray-500">${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="10000" 
            step="500"
            value={filters.priceRange[1]} 
            onChange={(e) => setFilter('priceRange', [0, parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden sm:block shrink-0 sticky top-[65px] h-[calc(100vh-65px)]">
        {sidebarContent}
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm sm:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
