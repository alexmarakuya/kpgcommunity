'use client';

import { useState, useEffect } from 'react';
import { Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-code-pro'
});

export default function Page() {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const kpgManagedGroups = [
    {
      id: 1,
      name: '💻🤗🌴 KPG Island Co-Work & Connect',
      subtitle: 'Main community hub for co-working, networking, and island life discussions',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/IqAD6c5qL0FCuVA8ws89dv'
    },
    {
      id: 2,
      name: 'KPG Island Chats, Q&A + Recommendations',
      subtitle: 'Ask questions, share recommendations, and get local insights from the community',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/IOXBJVkAHGy1SluqOwVIUi',
      emoji: '💬'
    }
  ];

  const otherGroups = [
    {
      id: 1,
      name: 'Nomad Meets',
      subtitle: 'Meetups and networking for digital nomads on Koh Phangan',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/DIKLAPYAQIHL2EfhumGPGb',
      emoji: '🤝',
      category: 'networking',
    },
    {
      id: 2,
      name: 'Digital Nomads Koh Phangan',
      subtitle: 'Main WhatsApp group for digital nomads on the island',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/Fp23RHoQ0tfDNbDLkq1hSb',
      emoji: '💻',
      category: 'digital-nomads',
    },
    {
      id: 3,
      name: 'Visa | DN Koh Phangan',
      subtitle: 'Visa questions, border runs, and legal tips for nomads',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/IdBv9yNO5Ha55RRLeaPjnl',
      emoji: '🛂',
      category: 'visa',
    },
    {
      id: 4,
      name: 'Koh Phangan Housing',
      subtitle: 'Find and share housing opportunities on the island',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/KsuuzQpZ43dExS1lnReiOe',
      emoji: '🏠',
      category: 'housing',
    },
    {
      id: 5,
      name: 'Phangan AI People',
      subtitle: 'A group for AI enthusiasts, builders, and curious minds on Koh Phangan',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/EHuLy3KfzA93P5NYU3w9Xl',
      emoji: '🤖',
      category: 'ai',
    },
  ];

  const groupCategories = [
    { id: 'all', label: 'All' },
    { id: 'networking', label: 'Networking' },
    { id: 'digital-nomads', label: 'Digital Nomads' },
    { id: 'visa', label: 'Visa' },
    { id: 'housing', label: 'Housing' },
    { id: 'ai', label: 'AI' },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredGroups = activeFilter === 'all'
    ? otherGroups
    : otherGroups.filter(group => group.category === activeFilter);

  const currentYear = new Date().getFullYear();

  return (
    <div className={`min-h-screen ${sourceCodePro.variable} font-mono`}>
      <header className="py-8" style={{ borderBottom: '1px solid var(--card-border)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>KPG Community</h1>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
            A collection of community groups and networks connecting people across Koh Phangan and beyond.
          </p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* KPG Managed Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Managed by KPG Community</h2>
          <div className="space-y-3">
            {kpgManagedGroups.map((group) => (
              <a
                key={group.id}
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg transition-all duration-200 cursor-pointer group"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1 w-full">
                      <h3 className="text-lg font-semibold group-hover:opacity-80 transition-colors" style={{color: 'var(--foreground)'}}>
                        <span className="mr-2">{group.emoji}</span>
                        {group.name}
                      </h3>
                      <div
                        className="inline-flex items-center font-medium transition-colors text-xs px-2 py-0.5 rounded-full"
                        style={
                          group.platform === 'whatsapp'
                            ? {
                                background: 'var(--wa-pill-bg)',
                                color: 'var(--wa-pill-text)'
                              }
                            : {
                                background: 'var(--tg-pill-bg)',
                                color: 'var(--tg-pill-text)'
                              }
                        }
                      >
                        {group.platform === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
                      </div>
                    </div>
                    <p className="text-sm group-hover:opacity-80 transition-colors" style={{color: 'var(--foreground)', opacity: 0.7}}>
                      {group.subtitle}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Other Communities Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Other Communities</h2>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {groupCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1 rounded-full font-medium transition-colors border text-xs ${
                  activeFilter === cat.id
                    ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]'
                    : 'bg-transparent text-[var(--foreground)] border-[var(--card-border)] hover:bg-[var(--card-bg)]'
                }`}
                style={{ minWidth: 80 }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {/* Filtered Groups List */}
          <div className="space-y-3">
            {filteredGroups.map((group) => (
              <a
                key={group.id}
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg transition-all duration-200 cursor-pointer group"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1 w-full">
                      <h3 className="text-lg font-semibold group-hover:opacity-80 transition-colors" style={{color: 'var(--foreground)'}}>
                        <span className="mr-2">{group.emoji}</span>
                        {group.name}
                      </h3>
                      <div
                        className="inline-flex items-center font-medium transition-colors text-xs px-2 py-0.5 rounded-full"
                        style={
                          group.platform === 'whatsapp'
                            ? {
                                background: 'var(--wa-pill-bg)',
                                color: 'var(--wa-pill-text)'
                              }
                            : {
                                background: 'var(--tg-pill-bg)',
                                color: 'var(--tg-pill-text)'
                              }
                        }
                      >
                        {group.platform === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
                      </div>
                    </div>
                    <p className="text-sm group-hover:opacity-80 transition-colors" style={{color: 'var(--foreground)', opacity: 0.7}}>
                      {group.subtitle}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-8" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center gap-4 justify-center">
            <a
              href="https://alexduffner.notion.site/2282127878f58097a567e18246910787"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors border"
              style={{
                background: 'var(--card-bg)',
                color: 'var(--foreground)',
                border: '1.5px solid var(--card-border)',
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'var(--pill-bg)';
                e.currentTarget.style.border = '1.5px solid var(--pill-border)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'var(--card-bg)';
                e.currentTarget.style.border = '1.5px solid var(--card-border)';
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Submit Your Group
            </a>
            {/* Theme Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>Light</span>
              <button
                className="px-3 py-1 rounded-full border text-xs font-medium transition-colors"
                style={{
                  background: theme === 'dark' ? 'var(--foreground)' : 'var(--card-bg)',
                  color: theme === 'dark' ? 'var(--background)' : 'var(--foreground)',
                  border: '1.5px solid var(--card-border)'
                }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle light/dark mode"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
              <span className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>Dark</span>
            </div>
            <div className="text-xs mt-2 flex flex-col items-center gap-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              <span>&copy; {currentYear} KPG Community</span>
              <span>Made with <span style={{ color: '#f87171' }}>❤️</span> for Koh Phangan</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
