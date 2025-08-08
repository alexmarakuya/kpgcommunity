'use client';

import { useState, useEffect, useRef } from 'react';
import { Source_Code_Pro } from 'next/font/google';
// import { Transition } from 'react-transition-group';
// Removed: import { Analytics } from '@vercel/analytics/react';

const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-code-pro'
});

// Add a type for group objects

/**
 * KPG Community Page Component
 * 
 * Features:
 * - Dynamic event location display with conditional "Show Location" button
 * - When eventLocationForDisplay is set to "TBD" or invalid, the location button is hidden
 * - Automatic next Thursday calculation for weekly events
 * - Theme toggle (light/dark mode)
 * - Filterable community groups
 * - Mobile-responsive design
 */

type Group = {
  id: number;
  name: string;
  subtitle: string;
  platform: string;
  link: string;
  emoji: string;
  category: string;
  tags?: string[];
};

export default function Page() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [detailsOpen, setDetailsOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalHostIdx, setModalHostIdx] = useState<number|null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  // Close modal on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  // Close modal on outside click
  useEffect(() => {
    if (!modalOpen) return;
    const onClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [modalOpen]);

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

  const otherGroups: Group[] = [
    {
      id: 1,
      name: 'Nomad Meets',
      subtitle: 'Meetups and networking for digital nomads on Koh Phangan',
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/DIKLAPYAQIHL2EfhumGPGb',
      emoji: '🤝',
      category: 'social',
      // tags: ['networking', 'social'], // Removed tags for Nomad Meets
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
      platform: 'telegram',
      link: 'https://t.me/kohphanganrentals',
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
    {
      id: 6,
      name: 'Flow Phangan',
      subtitle: 'Pop-up community for engineers & digital nomads on Koh Phangan.',
      platform: 'telegram',
      link: 'https://t.me/c/2482920597/1',
      emoji: '🌊',
      category: 'social',
    },
    {
      id: 7,
      name: 'Thailand Visa Advice',
      subtitle: 'Facebook group for visa questions and advice in Thailand',
      platform: 'facebook',
      link: 'https://www.facebook.com/groups/thailandvisaadvice/?ref=share&rdid=VpV27rbEzw7o9piQ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2F1EciD7NCtR%2F',
      emoji: '📄',
      category: 'visa',
      // tags: ['Facebook Group'], // Removed Facebook Group tag
    },
    {
      id: 8,
      name: "Q's Community Events",
      subtitle: "WhatsApp group for Q's Cafe community events and updates",
      platform: 'whatsapp',
      link: 'https://chat.whatsapp.com/Cfw6zJrSxJZ0s8JutLnlgO?mode=ac_t',
      emoji: '☕️',
      category: 'social',
      // No tags needed for now
    },
  ];

  const groupCategories = [
    { id: 'all', label: 'All' },
    { id: 'social', label: 'Social' },
    { id: 'visa', label: 'Visa' },
    { id: 'housing', label: 'Housing' },
    { id: 'ai', label: 'AI' },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredGroups = activeFilter === 'all'
    ? otherGroups
    : otherGroups.filter(group => group.category === activeFilter);

  const currentYear = new Date().getFullYear();

  // Internal database of event locations
  const eventLocations = [
    {
      name: "Q's Cafe",
      address: "Q's Cafe, Srithanu, Koh Phangan",
      mapsUrl: "https://share.google/9nYKEn5PsS1duQpYv"
    },
    {
      name: "Martial Arts Academy",
      address: "Martial Arts Academy, Woktum, Koh Phangan",
      mapsUrl: "https://maps.app.goo.gl/xPDbWpxNKpQGPh4P6"
    },
    // Add more locations as needed
  ];

  // Update: Next event location is TBD
  const eventLocationForDisplay = { name: "TBD", address: "TBD", mapsUrl: '#' };
  
  // Helper function to check if location is valid (not TBD, empty, or placeholder)
  // Used to conditionally show/hide the "Show Location" button
  const hasValidLocation = (location: { name: string; address: string; mapsUrl: string }) => {
    return location.name !== "TBD" && 
           location.address !== "TBD" && 
           location.mapsUrl !== '#' && 
           location.name.trim() !== '' && 
           location.address.trim() !== '';
  };
  const today = new Date();
  // Next Thursday logic for event date
  const dayOfWeek = today.getDay();
  let daysUntilThursday = 4 - dayOfWeek;
  if (daysUntilThursday < 0) daysUntilThursday += 7;
  const eventDateObj = new Date(today);
  eventDateObj.setDate(today.getDate() + daysUntilThursday);
  const monthShort = eventDateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayNum = eventDateObj.getDate().toString().padStart(2, '0');

  // ICS file content for the event (single occurrence, current event date, location is eventLocationForDisplay)
  const yyyy = eventDateObj.getFullYear();
  const mm = String(eventDateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(eventDateObj.getDate()).padStart(2, '0');
  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:KPG Co-Work & Connect — Weekly Coworking Meetup\nDTSTART;TZID=Asia/Bangkok:${yyyy}${mm}${dd}T100000\nDTEND;TZID=Asia/Bangkok:${yyyy}${mm}${dd}T160000\nLOCATION:${eventLocationForDisplay.address} (${eventLocationForDisplay.mapsUrl})\nDESCRIPTION:Join our friendly coworking circle! Connect with fellow nomads, share ideas, and work alongside like-minded souls in a relaxed setting. For more details check our website: www.kpgcommunity.com\nEND:VEVENT\nEND:VCALENDAR`;
  const icsDataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  // Meet the Hosts data
  const hosts = [
    {
      name: 'Sophie Biggerstaff',
      image: '/sophie-biggerstaff.jpg',
      role: 'Business coach, entrepreneur, community builder',
      short: 'A business coach helping purpose-driven founders build online businesses that create more freedom, income, and impact — without burning out.',
      long: 'As a long-term digital nomad, multi-entrepreneur, podcaster, and community builder, Sophie is passionate about creating spaces for connection, growth, and support wherever she goes. She loves empowering others to reach their goals and thrive in supportive communities.',
      link: 'https://itssophiebiggerstaff.com',
    },
    {
      name: 'Alex Duffner',
      image: '/alex-duffner.jpg',
      role: 'Creative entrepreneur, community builder, visionary',
      short: 'Creative entrepreneur and community builder passionate about designing spaces—both physical and digital—that foster connection, growth, and collaboration.',
      long: 'Founder of NAM and KPG Community, Alex brings people together to collaborate, share, and thrive on Koh Phangan. He is dedicated to creating environments where people can connect, learn, and co-create a vibrant community.',
      link: 'https://www.nam.space',
    },
    {
      name: 'Maya Lee',
      image: '/path-to-maya.jpg',
      role: 'Wellness coach, event organizer',
      short: 'Helping digital nomads and creatives find balance, wellness, and inspiration on the island through mindful experiences and supportive community.',
      long: 'Maya is a wellness coach and event organizer who curates experiences for growth, mindfulness, and connection. She loves supporting others on their journey to a healthy, fulfilling lifestyle, and believes in the importance of community for well-being and creativity.',
      link: 'https://mayaleewellness.com',
    },
  ];

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
                  <span className="font-medium">Every Thursday · 10:00 AM – 4:00 PM ·</span>
                  <span>{eventLocationForDisplay.address}</span>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden mb-3 max-w-2xl ${detailsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  aria-hidden={!detailsOpen}
                >
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.85 }}>
                    KPG Island Co-Work & Connect – a free weekly event hosted every Thursday for creatives, nomads & entrepreneurs on Koh Phangan. Join us for a day of productivity, connection, and collaboration at the island's best co-working spots.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <button
                    type="button"
                    aria-expanded={detailsOpen}
                    aria-controls="event-details-desc"
                    onClick={() => setDetailsOpen((open) => !open)}
                    className="inline-block px-4 py-1.5 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 text-center"
                    style={{
                      background: 'var(--foreground)',
                      color: 'var(--background)',
                      borderColor: 'var(--foreground)',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'var(--card-border)';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = 'var(--foreground)';
                      e.currentTarget.style.color = 'var(--background)';
                    }}
                  >
                    <span className="inline-flex items-center gap-1">
                      {detailsOpen ? 'Hide Details' : 'Show Details'}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${detailsOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <a
                    href={icsDataUri}
                    download="KPG-Co-Work-Connect.ics"
                    className="inline-block px-4 py-1.5 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 text-center"
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
                  {/* Show Location button - only display when location is valid (not TBD or empty) */}
                  {hasValidLocation(eventLocationForDisplay) && (
                    <a
                      href={eventLocationForDisplay.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-1.5 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 text-center"
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
                      title={`Show location: ${eventLocationForDisplay.name}`}
                    >
                      Show Location
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-6 pt-0 pb-12">
        {/* KPG Managed Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--foreground)' }}>Join our WhatsApp Groups</h2>
          <div className="space-y-3">
            {kpgManagedGroups.map((group) => (
              <a
                key={group.id}
                href={group.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg transition-all duration-200 cursor-pointer group text-left"
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
                className={`px-4 py-1.5 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 text-center`}
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
                className="block p-4 rounded-lg transition-all duration-200 cursor-pointer group text-left"
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
                        className="inline-flex items-center font-medium transition-colors text-xs px-3 py-0.5 rounded-full border border-[var(--card-border)] shadow-sm mr-2"
                        style={
                          group.platform === 'whatsapp'
                            ? {
                                background: 'var(--wa-pill-bg)',
                                color: 'var(--wa-pill-text)'
                              }
                            : group.platform === 'telegram'
                            ? {
                                background: 'var(--tg-pill-bg)',
                                color: 'var(--tg-pill-text)'
                              }
                            : group.platform === 'facebook'
                            ? {
                                background: 'var(--fb-pill-bg)', // Use a CSS variable for Facebook pill bg
                                color: 'var(--fb-pill-text)'
                              }
                            : {}
                        }
                      >
                        {group.platform === 'whatsapp'
                          ? 'WhatsApp'
                          : group.platform === 'telegram'
                          ? 'Telegram'
                          : group.platform === 'facebook'
                          ? 'Facebook Group'
                          : ''}
                      </div>
                      {group.tags && Array.isArray(group.tags) && group.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-2 justify-center">
                          {group.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-block px-3 py-1 rounded-full text-xs font-semibold border border-[var(--card-border)] bg-[var(--foreground)] text-[var(--background)] shadow-sm uppercase tracking-wide"
                              style={{
                                letterSpacing: '0.05em',
                                background: 'var(--foreground)',
                                color: 'var(--background)',
                                borderColor: 'var(--foreground)',
                                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.04)'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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

      {/* Cowork Map CTA Banner */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div
          className="w-full rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 p-6"
          style={{
            background: 'var(--card-bg)',
            border: '1.5px solid var(--card-border)'
          }}
        >
          {/* <div className="w-20 h-20 md:w-24 md:h-24 rounded-[10px] flex-shrink-0" style={{ background: 'var(--card-border)' }}></div> */}
          <div className="flex-1 pb-2 flex flex-col justify-start items-start gap-1 min-w-0">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch text-lg md:text-xl font-semibold leading-7" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-source-code-pro), monospace' }}>
                Best Coworking Spots on Koh Phangan
              </div>
            </div>
            <div className="w-full max-w-xl opacity-90 flex flex-col justify-start items-start">
              <div className="self-stretch text-sm font-normal leading-tight" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-source-code-pro), monospace' }}>
                Explore a curated map of the island's top cafes, coworking spaces, and friendly work spots. Find your next favorite place to get things done!
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="https://maps.app.goo.gl/khEyxazcCPRySbyv5?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-lg font-semibold text-sm shadow border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 text-center"
              style={{
                background: 'transparent',
                color: 'var(--foreground)',
                borderColor: 'var(--foreground)'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'var(--card-border)';
                e.currentTarget.style.color = 'var(--foreground)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--foreground)';
              }}
              title="Open Coworking Map"
            >
              Open Map
            </a>
          </div>
        </div>
      </div>

      {/*
         Meet the Hosts section and modal are hidden for now.
         To restore, uncomment this block and its contents.
       */}

      <footer className="py-8" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center gap-4 justify-center">
            <a
              href="https://alexduffner.notion.site/2282127878f58097a567e18246910787"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors border text-left"
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
      {/* Removed Analytics component */}
      {/* Floating Bottom Navigation Tab (Mobile) */}
      {/*
      <nav
        className="fixed bottom-0 left-0 w-full z-50 flex md:hidden justify-center items-center bg-[var(--card-bg)] border-t border-[var(--card-border)] shadow-lg"
        style={{
          height: 64,
          boxShadow: '0 -2px 12px 0 rgba(0,0,0,0.06)',
        }}
        role="navigation"
        aria-label="Bottom Navigation"
      >
        <div className="flex gap-2 w-full justify-center items-center">
          <a
            href="/"
            className="flex flex-col items-center justify-center py-2 px-3 text-xs font-semibold transition-colors border-t-4 border-[var(--foreground)]"
            style={{
              minWidth: 70,
              maxWidth: 90,
              borderTopWidth: 4,
              borderTopColor: 'var(--foreground)',
              color: 'var(--foreground)',
              opacity: 1,
              background: 'transparent',
            }}
            aria-current="page"
          >
            <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
            Community
          </a>
          <a
            href="/coworking"
            className="flex flex-col items-center justify-center py-2 px-3 text-xs font-semibold transition-colors border-t-4 border-transparent"
            style={{
              minWidth: 70,
              maxWidth: 90,
              color: 'var(--foreground)',
              opacity: 0.6,
              background: 'transparent',
            }}
          >
            <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10zm0-7a3 3 0 100-6 3 3 0 000 6z" /></svg>
            Places
          </a>
        </div>
      </nav>
      */}
    </div>
  );
}
