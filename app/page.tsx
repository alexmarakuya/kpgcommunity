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
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/your-main-group-link'
    },
    {
      id: 2,
      name: 'KPG Island Chats, Q&A + Recommendations',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/kpg-island-chats-link',
      emoji: '💬'
    }
  ];

  const otherGroups = [
    {
      id: 2,
      name: 'Nestra Phangan',
      category: 'wellness',
      platform: 'telegram',
      link: 'https://t.me/nestra-phangan-link',
      emoji: '🧘‍♀️'
    },
    {
      id: 3,
      name: 'Community Events',
      category: 'events',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/community-events-link',
      emoji: '🎉'
    },
    {
      id: 4,
      name: 'Island Adventures',
      category: 'adventure',
      platform: 'telegram',
      link: 'https://t.me/island-adventures-link',
      emoji: '🏄‍♂️'
    },
    {
      id: 5,
      name: 'Local Business Network',
      category: 'business',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/local-business-link',
      emoji: '💼'
    },
    {
      id: 6,
      name: 'Wellness & Healing',
      category: 'wellness',
      platform: 'telegram',
      link: 'https://t.me/wellness-healing-link',
      emoji: '🌿'
    },
    {
      id: 7,
      name: 'Digital Nomads',
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
              <div key={group.id} className="border border-slate-700 p-4 rounded-lg hover:border-slate-600 transition-colors bg-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">
                    <span className="mr-2">{group.emoji}</span>
                    {group.name}
                  </h3>
                  <a
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 font-medium"
                  >
                    Join WhatsApp Group
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
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
              <div key={group.id} className="border border-slate-700 p-4 rounded-lg hover:border-slate-600 transition-colors bg-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">
                    <span className="mr-2">{group.emoji}</span>
                    {group.name}
                  </h3>
                  <a
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 font-medium ${
                      group.platform === 'whatsapp'
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-blue-400 hover:text-blue-300'
                    }`}
                  >
                    Join {group.platform === 'whatsapp' ? 'WhatsApp' : 'Telegram'} Group
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
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
