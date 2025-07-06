'use client';

import { useState } from 'react';
import { Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-code-pro'
});

export default function Page() {
  const [activeFilter, setActiveFilter] = useState('all');

  const kpgManagedGroups = [
    {
      id: 1,
      name: '💻🤗🌴 KPG Island Co-Work & Connect',
      subtitle: 'Main community hub for co-working, networking, and island life discussions',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/your-main-group-link'
    },
    {
      id: 2,
      name: 'KPG Island Chats, Q&A + Recommendations',
      subtitle: 'Ask questions, share recommendations, and get local insights from the community',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/kpg-island-chats-link',
      emoji: '💬'
    }
  ];

  const otherGroups = [
    {
      id: 2,
      name: 'Nestra Phangan',
      subtitle: 'Wellness retreats, yoga classes, and holistic healing practices',
      category: 'wellness',
      platform: 'telegram',
      link: 'https://t.me/nestra-phangan-link',
      emoji: '🧘‍♀️'
    },
    {
      id: 3,
      name: 'Community Events',
      subtitle: 'Stay updated on local events, parties, workshops, and community gatherings',
      category: 'events',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/community-events-link',
      emoji: '🎉'
    },
    {
      id: 4,
      name: 'Island Adventures',
      subtitle: 'Explore hidden beaches, waterfalls, hiking trails, and outdoor activities',
      category: 'adventure',
      platform: 'telegram',
      link: 'https://t.me/island-adventures-link',
      emoji: '🏄‍♂️'
    },
    {
      id: 5,
      name: 'Local Business Network',
      subtitle: 'Connect with local entrepreneurs, share business opportunities, and support local economy',
      category: 'business',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/local-business-link',
      emoji: '💼'
    },
    {
      id: 6,
      name: 'Wellness & Healing',
      subtitle: 'Alternative healing, meditation, nutrition, and wellness practices on the island',
      category: 'wellness',
      platform: 'telegram',
      link: 'https://t.me/wellness-healing-link',
      emoji: '🌿'
    },
    {
      id: 7,
      name: 'Digital Nomads',
      subtitle: 'Remote work tips, co-working spaces, and digital nomad lifestyle discussions',
      category: 'co-working',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/digital-nomads-link',
      emoji: '💻'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Groups' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'events', name: 'Events' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'business', name: 'Business' },
    { id: 'co-working', name: 'Co-Working' }
  ];

  const filteredGroups = activeFilter === 'all' 
    ? otherGroups 
    : otherGroups.filter(group => group.category === activeFilter);

  return (
    <div className={`min-h-screen bg-slate-900 ${sourceCodePro.variable} font-mono`}>
      <header className="py-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-light text-white mb-2">KPG Community</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            A collection of community groups and networks connecting people across Koh Phangan and beyond.
          </p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* KPG Managed Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-white mb-6">Managed by KPG Community</h2>
          <div className="space-y-3">
            {kpgManagedGroups.map((group) => (
              <a
                key={group.id}
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-slate-700 p-4 rounded-lg hover:border-slate-600 hover:bg-slate-750 transition-all duration-200 bg-slate-800 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white group-hover:text-slate-200 transition-colors mb-1">
                      <span className="mr-2">{group.emoji}</span>
                      {group.name}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {group.subtitle}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-green-900/30 text-green-400 group-hover:text-green-300 font-medium transition-colors ml-4 text-sm px-3 py-1 rounded-full border border-green-700/30 group-hover:border-green-600/50">
                    WhatsApp
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Other Communities Section */}
        <section>
          <h2 className="text-2xl font-light text-white mb-6">Other Communities</h2>
          
          {/* Filter Buttons */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activeFilter === category.id
                      ? 'bg-white text-slate-900'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Groups List */}
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <a
                key={group.id}
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-slate-700 p-4 rounded-lg hover:border-slate-600 hover:bg-slate-750 transition-all duration-200 bg-slate-800 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white group-hover:text-slate-200 transition-colors mb-1">
                      <span className="mr-2">{group.emoji}</span>
                      {group.name}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {group.subtitle}
                    </p>
                  </div>
                  <div className={`inline-flex items-center gap-1 font-medium transition-colors ml-4 text-sm px-3 py-1 rounded-full border ${
                    group.platform === 'whatsapp'
                      ? 'bg-green-900/30 text-green-400 group-hover:text-green-300 border-green-700/30 group-hover:border-green-600/50'
                      : 'bg-blue-900/30 text-blue-400 group-hover:text-blue-300 border-blue-700/30 group-hover:border-blue-600/50'
                  }`}>
                    {group.platform === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-700 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center">
            <button className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Submit Your Group
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
