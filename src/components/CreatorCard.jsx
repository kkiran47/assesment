import { motion } from 'framer-motion';
import { FiCheckCircle, FiTrendingUp, FiStar, FiMapPin, FiYoutube, FiTwitter, FiInstagram, FiMessageCircle, FiVideo } from 'react-icons/fi';
import { SiTiktok, SiTwitch } from 'react-icons/si';
import clsx from 'clsx';

const PlatformIcon = ({ platform }) => {
  switch(platform) {
    case 'YouTube': return <FiYoutube className="text-red-500" />;
    case 'Instagram': return <FiInstagram className="text-pink-500" />;
    case 'Twitter': return <FiTwitter className="text-blue-400" />;
    case 'TikTok': return <SiTiktok className="text-black dark:text-white" />;
    case 'Twitch': return <SiTwitch className="text-purple-500" />;
    default: return <FiVideo className="text-gray-500" />;
  }
};

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

const formatCurrency = (num) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
};

const CreatorCard = ({ creator, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm hover:shadow-2xl hover:border-blue-200 dark:hover:border-gray-500 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden"
      onClick={() => onClick(creator)}
    >
      <div className="absolute top-0 right-0 p-4 flex gap-2 z-10">
        {creator.trending && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 backdrop-blur-sm shadow-sm">
            <FiTrendingUp /> Trending
          </span>
        )}
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-50 dark:ring-gray-700 group-hover:ring-blue-100 dark:group-hover:ring-gray-600 transition-all">
            <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
            <PlatformIcon platform={creator.platform} />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{creator.name}</h3>
            {creator.verified && <FiCheckCircle className="text-blue-500 flex-shrink-0" size={16} />}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-1">{creator.username}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <FiMapPin size={12} />
            <span className="truncate">{creator.location}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 bg-gray-50 dark:bg-gray-900 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-800">
          {creator.category}
        </span>
        {creator.topCreator && (
          <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-md text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
            Top Creator
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 dark:border-gray-700/50 mb-4 mt-auto">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Followers</div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{formatNumber(creator.followers)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Engagement</div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{creator.engagementRate}%</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Views</div>
          <div className="text-base font-semibold text-gray-800 dark:text-gray-200">{formatNumber(creator.averageViews)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Est. Price</div>
          <div className="text-base font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(creator.price)}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-sm">
          <FiStar className="text-amber-400 fill-amber-400" />
          <span className="font-medium text-gray-900 dark:text-white">{creator.rating}</span>
          <span className="text-gray-400">({creator.brandSafetyScore} Safety)</span>
        </div>
      </div>

      {/* Sliding Hover Info Panel */}
      <div className="absolute inset-x-0 bottom-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-700 p-5 transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col h-[60%] justify-between">
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            About {creator.name.split(' ')[0]}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 leading-relaxed">
            {creator.bio}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {creator.skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 rounded-md text-[10px] font-semibold tracking-wide">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <button 
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2" 
          onClick={(e) => { e.stopPropagation(); onClick(creator); }}
        >
          View Full Profile
        </button>
      </div>
    </motion.div>
  );
};

export default CreatorCard;
