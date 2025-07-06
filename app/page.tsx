'use client';

import { useState, useEffect } from 'react';
import { Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-code-pro'
});

export default function Page() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [detailsOpen, setDetailsOpen] = useState(false);

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

  // ICS file content for the event
  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:KPG Co-Work & Connect — Weekly Coworking Meetup\nDTSTART;TZID=Asia/Bangkok:20240711T100000\nDTEND;TZID=Asia/Bangkok:20240711T160000\nRRULE:FREQ=WEEKLY;BYDAY=TH\nLOCATION:Crumbs Café, Thongsala, Koh Phangan\nDESCRIPTION:Join our friendly coworking circle! Connect with fellow nomads, share ideas, and work alongside like-minded souls in a relaxed beachfront setting. Fast Wi-Fi, inspiring people, optional lunch together.\nURL:https://maps.app.goo.gl/QCRXU9UnbjLTxQkE8\nEND:VEVENT\nEND:VCALENDAR`;
  const icsDataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  // Calculate next Thursday's date
  function getNextThursday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7 || 7;
    const nextThursday = new Date(today);
    nextThursday.setDate(today.getDate() + daysUntilThursday);
    return nextThursday;
  }
  const nextThursday = getNextThursday();
  const monthShort = nextThursday.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayNum = nextThursday.getDate().toString().padStart(2, '0');

  return (
    <div className={`min-h-screen ${sourceCodePro.variable} font-mono`}>
      <header className="relative pb-1 pt-6 overflow-hidden">
        {/* Hero background image with overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/jungle-hero.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
            maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
            opacity: 0.2,
          }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full min-h-[300px] py-8">
          <h1 className="text-3xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>KPG Community</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
            A collection of community groups and networks connecting people across Koh Phangan and beyond.
          </p>
          {/* Community Event Banner (moved into hero) */}
          <div className="mb-6 mt-12 w-full">
            <div className="relative flex flex-col md:flex-row items-start md:items-stretch rounded-xl shadow-sm p-6 gap-3 md:gap-4 overflow-hidden text-left"
              style={{
                background: 'var(--card-bg)',
                border: '1.5px solid var(--card-border)'
              }}>
              {/* Background image fade from left to right */}
              <div
                aria-hidden="true"
                className="absolute inset-0 left-0 top-0 w-full h-full z-0"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.01) 70%, rgba(0,0,0,0)), url('/people-working.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'left center',
                  backgroundRepeat: 'no-repeat',
                  pointerEvents: 'none',
                  opacity: 0.18,
                  mixBlendMode: 'multiply',
                }}
              />
              {/* Calendar Date */}
              <div
                className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-xl md:mr-4 border shadow-sm"
                style={{
                  background: 'var(--pill-bg)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--card-border)'
                }}
                aria-label={`Next session: ${monthShort} ${dayNum}`}
              >
                <span className="text-xs font-semibold mt-1" style={{ color: 'var(--pill-text)', letterSpacing: '0.05em' }}>{monthShort}</span>
                <span className="text-2xl font-bold leading-tight" style={{ color: 'var(--foreground)' }}>{dayNum}</span>
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0 relative z-10 text-left">
                <h3 className="text-lg md:text-xl font-semibold mb-1 leading-relaxed" style={{ color: 'var(--foreground)' }}>KPG Co-Work & Connect — Weekly Coworking Meetup</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-sm mb-2 leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  <span className="font-medium">Every Thursday · 10:00 AM – 4:00 PM</span>
                  <span className="hidden sm:inline mx-2">&bull;</span>
                  <a
                    href="https://maps.app.goo.gl/QCRXU9UnbjLTxQkE8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 focus:text-green-700 transition-colors"
                    style={{ color: 'var(--foreground)', textDecoration: 'none' }}
                  >
                    Crumbs Café, Thongsala, Koh Phangan
                  </a>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden mb-3 max-w-2xl ${detailsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  aria-hidden={!detailsOpen}
                >
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.85 }}>
                    Join our friendly coworking circle! Connect with fellow nomads, share ideas, and work alongside like-minded souls in a relaxed beachfront setting. Fast Wi-Fi, inspiring people, optional lunch together.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <button
                    type="button"
                    aria-expanded={detailsOpen}
                    aria-controls="event-details-desc"
                    onClick={() => setDetailsOpen((open) => !open)}
                    className="inline-block px-4 py-1.5 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2"
                    style={{
                      background: detailsOpen ? 'var(--background)' : 'var(--foreground)',
                      color: detailsOpen ? 'var(--foreground)' : 'var(--background)',
                      borderColor: 'var(--foreground)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'var(--card-border)';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = detailsOpen ? 'var(--background)' : 'var(--foreground)';
                      e.currentTarget.style.color = detailsOpen ? 'var(--foreground)' : 'var(--background)';
                    }}
                  >
                    {detailsOpen ? 'Hide Details' : 'Show Details'}
                  </button>
                  <a
                    href={icsDataUri}
                    download="KPG-Co-Work-Connect.ics"
                    className="inline-block px-4 py-1.5 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2"
                    style={{
                      background: 'transparent',
                      color: 'var(--foreground)',
                      borderColor: 'var(--foreground)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'var(--card-border)';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                    title="Add to Calendar"
                  >
                    Add to Calendar
                  </a>
                  <a
                    href="https://maps.app.goo.gl/QCRXU9UnbjLTxQkE8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-1.5 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2"
                    style={{
                      background: 'transparent',
                      color: 'var(--foreground)',
                      borderColor: 'var(--foreground)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'var(--card-border)';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                    title="Show Location on Map"
                  >
                    Show Location
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 pt-0 pb-12">
        {/* KPG Managed Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Join our WhatsApp Groups.</h2>
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
                className={`px-4 py-1.5 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2`}
                style={{
                  minWidth: 80,
                  background: activeFilter === cat.id ? 'var(--foreground)' : 'transparent',
                  color: activeFilter === cat.id ? 'var(--background)' : 'var(--foreground)',
                  borderColor: activeFilter === cat.id ? 'var(--foreground)' : 'var(--card-border)',
                }}
                onMouseOver={e => {
                  if (activeFilter !== cat.id) {
                    e.currentTarget.style.background = 'var(--pill-bg)';
                  }
                }}
                onMouseOut={e => {
                  if (activeFilter !== cat.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
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
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="sr-only peer"
                  aria-label="Toggle light/dark mode"
                />
                <div
                  className="w-11 h-6 rounded-lg transition-colors duration-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--foreground)] border"
                  style={{
                    background: theme === 'dark' ? 'var(--card-bg)' : 'var(--pill-bg)',
                    borderColor: 'var(--card-border)'
                  }}
                ></div>
                <div
                  className="absolute left-1 top-1 w-4 h-4 rounded-lg transition-transform duration-200 border"
                  style={{
                    background: theme === 'dark' ? 'var(--foreground)' : 'var(--card-border)',
                    borderColor: theme === 'dark' ? 'var(--card-border)' : 'var(--foreground)',
                    transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(0)'
                  }}
                ></div>
              </label>
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
