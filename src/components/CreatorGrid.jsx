import { useState, useMemo } from 'react';
import { useCreatorStore } from '../store/useCreatorStore';
import { creators } from '../data/creators';
import CreatorCard from './CreatorCard';
import EmptyState from './EmptyState';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import ProfileModal from './ProfileModal';
import clsx from 'clsx';

const SortDropdown = () => {
  const { sortBy, setSortBy } = useCreatorStore();
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Most Relevant', 'Newest', 'Highest Followers', 'Highest Engagement', 'Lowest Price', 'Highest Price', 'Verified First'];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Sort by: <span className="text-gray-900 dark:text-white">{sortBy}</span>
        <FiChevronDown className={clsx("transition-transform", isOpen ? "rotate-180" : "")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-20 py-2 overflow-hidden"
          >
            {options.map(option => (
              <button
                key={option}
                className={clsx(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  sortBy === option 
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                )}
                onClick={() => { setSortBy(option); setIsOpen(false); }}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActiveFilters = () => {
  const { filters, toggleArrayFilter, clearFilters, setFilter } = useCreatorStore();
  
  const activeChips = [
    ...filters.categories.map(c => ({ type: 'categories', value: c, label: c })),
    ...filters.platforms.map(p => ({ type: 'platforms', value: p, label: p })),
    ...(filters.verifiedOnly ? [{ type: 'verifiedOnly', value: true, label: 'Verified Only' }] : []),
    ...(filters.availableOnly ? [{ type: 'availableOnly', value: true, label: 'Available' }] : []),
  ];

  if (activeChips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Active filters:</span>
      <AnimatePresence>
        {activeChips.map((chip, index) => (
          <motion.div
            key={`${chip.type}-${chip.value}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
          >
            {chip.label}
            <button 
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => {
                if (chip.type === 'categories' || chip.type === 'platforms') {
                  toggleArrayFilter(chip.type, chip.value);
                } else {
                  setFilter(chip.type, false);
                }
              }}
            >
              <FiX size={14} />
            </button>
          </motion.div>
        ))}
        {activeChips.length > 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline ml-2"
            onClick={clearFilters}
          >
            Clear All
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const CreatorGrid = ({ setIsMobileOpen }) => {
  const { searchQuery, filters, sortBy, clearFilters } = useCreatorStore();
  const [selectedCreator, setSelectedCreator] = useState(null);

  const filteredCreators = useMemo(() => {
    return creators.filter(creator => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = creator.name.toLowerCase().includes(query);
        const matchesUsername = creator.username.toLowerCase().includes(query);
        const matchesCategory = creator.category.toLowerCase().includes(query);
        if (!matchesName && !matchesUsername && !matchesCategory) return false;
      }

      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes(creator.category)) {
        return false;
      }

      // Platforms
      if (filters.platforms.length > 0 && !filters.platforms.includes(creator.platform)) {
        return false;
      }

      // Price Range
      if (creator.price > filters.priceRange[1]) {
        return false;
      }

      // Verified
      if (filters.verifiedOnly && !creator.verified) {
        return false;
      }

      // Available
      if (filters.availableOnly && !creator.availableForCollab) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'Highest Followers': return b.followers - a.followers;
        case 'Highest Engagement': return b.engagementRate - a.engagementRate;
        case 'Lowest Price': return a.price - b.price;
        case 'Highest Price': return b.price - a.price;
        case 'Verified First': return (b.verified === a.verified) ? 0 : b.verified ? 1 : -1;
        case 'Newest': return b.id - a.id;
        case 'Most Relevant': default: return 0;
      }
    });
  }, [creators, searchQuery, filters, sortBy]);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button 
              className="sm:hidden flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
              onClick={() => setIsMobileOpen(true)}
            >
              <FiFilter /> Filters
            </button>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              {filteredCreators.length} <span className="text-gray-500 dark:text-gray-400 font-normal">creators found</span>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <SortDropdown />
          </motion.div>
        </div>

        <ActiveFilters />

        {filteredCreators.length > 0 ? (
          <motion.div 
            layout
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredCreators.map((creator) => (
                <motion.div
                  key={creator.id}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }}
                  layout
                >
                  <CreatorCard 
                    creator={creator} 
                    onClick={setSelectedCreator}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState clearFilters={clearFilters} />
        )}
      </div>

      <AnimatePresence>
        {selectedCreator && (
          <ProfileModal 
            creator={selectedCreator} 
            onClose={() => setSelectedCreator(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreatorGrid;
