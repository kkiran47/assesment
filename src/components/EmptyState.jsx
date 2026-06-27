import { motion } from 'framer-motion';

const EmptyState = ({ clearFilters }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-48 h-48 mb-8 relative">
        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl animate-pulse"></div>
        <img 
          src="https://illustrations.popsy.co/amber/surreal-hourglass.svg" 
          alt="No results found" 
          className="w-full h-full object-contain relative z-10 opacity-80"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://illustrations.popsy.co/amber/falling.svg';
          }}
        />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No creators found</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
        We couldn't find any creators matching your current filters. Try adjusting your search criteria or explore other categories.
      </p>
      <button 
        onClick={clearFilters}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all active:scale-95"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
};

export default EmptyState;
