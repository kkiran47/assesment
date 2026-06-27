import { motion } from 'framer-motion';
import { FiX, FiCheckCircle, FiMapPin, FiMail, FiExternalLink, FiTrendingUp } from 'react-icons/fi';
import clsx from 'clsx';

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

const ProfileModal = ({ creator, onClose }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed z-50 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scrollbar-hide border border-gray-100 dark:border-gray-800"
      >
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-600 to-indigo-600 w-full overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="px-6 sm:px-10 pb-10">
          <div className="relative flex flex-col sm:flex-row sm:items-end gap-6 -mt-20 sm:-mt-24 mb-8">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-white shadow-xl flex-shrink-0">
              <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{creator.name}</h2>
                {creator.verified && <FiCheckCircle className="text-blue-500 w-6 h-6" />}
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-2">{creator.username}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5"><FiMapPin /> {creator.location}</div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 font-medium">{creator.category}</div>
                <div className={clsx("flex items-center gap-1.5 font-medium", creator.availableForCollab ? "text-green-600 dark:text-green-400" : "text-gray-400")}>
                  <div className={clsx("w-2 h-2 rounded-full", creator.availableForCollab ? "bg-green-500" : "bg-gray-400")}></div>
                  {creator.availableForCollab ? "Available for Collaboration" : "Currently Unavailable"}
                </div>
              </div>
            </div>
            
            <div className="flex flex-row sm:flex-col gap-3 sm:pb-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                <FiMail /> Invite
              </button>
              <button className="flex-1 sm:flex-none bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700">
                <FiExternalLink /> Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{creator.bio}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <FiTrendingUp className="text-blue-500" /> Performance Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Followers</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(creator.followers)}</div>
                    <div className="text-xs text-green-500 mt-2 flex items-center gap-1"><FiTrendingUp /> +{creator.recentGrowth}%</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg Engagement</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{creator.engagementRate}%</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg Views</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatNumber(creator.averageViews)}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Est. Price</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">${creator.price}</div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Past Collaborations</h3>
                <div className="flex flex-wrap gap-3">
                  {creator.pastBrands.map((brand, i) => (
                    <div key={i} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                      {brand}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Audience Demographics</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-gray-600 dark:text-gray-400">Gender</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                      <div className="bg-blue-500 h-full" style={{ width: `${creator.audienceDemographics.male}%` }}></div>
                      <div className="bg-pink-500 h-full" style={{ width: `${creator.audienceDemographics.female}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                      <span>{creator.audienceDemographics.male}% Male</span>
                      <span>{creator.audienceDemographics.female}% Female</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Top Age Group</span>
                      <span className="font-medium text-gray-900 dark:text-white">{creator.audienceDemographics.topAge}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Top Location</span>
                      <span className="font-medium text-gray-900 dark:text-white">{creator.audienceDemographics.topCountry}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Skills & Specialities</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs font-medium text-gray-600 dark:text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                 <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Response Rate</span>
                    <span className="font-bold text-green-500">{creator.responseRate}%</span>
                 </div>
                 <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Content Type</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{creator.contentType}</span>
                 </div>
                 <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Frequency</span>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{creator.contentFrequency}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileModal;
