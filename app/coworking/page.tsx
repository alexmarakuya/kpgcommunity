'use client';

import { useState, useEffect } from 'react';
import { Source_Code_Pro } from 'next/font/google';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const sourceCodePro = Source_Code_Pro({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-source-code-pro'
});

type CoworkingSpace = {
  id: number;
  name: string;
  address: string;
  description: string;
  images: string[];
  sockets: 'plentiful' | 'limited' | 'none';
  nomadScore: number; // 1-10
  wifiSpeed: string;
  aircon: boolean;
  openingHours: string;
  lastUpdated: string;
  mapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: 'cafe' | 'coworking' | 'beach' | 'mountain';
  price: string;
  vibe: string;
};

export default function CoworkingPage() {
  const [selectedSpace, setSelectedSpace] = useState<CoworkingSpace | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [expandedCards, setExpandedCards] = useState<{ [id: number]: boolean }>({});

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDa1QQJoksztGYPIpGTzXuUTV0KqJyiWDI',
  });

  const coworkingSpaces: CoworkingSpace[] = [
    {
      id: 1,
      name: "Q's Cafe",
      address: "Srithanu, Koh Phangan",
      description: "Popular cafe with great coffee, food, and a relaxed atmosphere perfect for working. Located in the heart of Srithanu.",
      images: ["/qs-cafe-1.jpg", "/qs-cafe-2.jpg"],
      sockets: "plentiful",
      nomadScore: 9,
      wifiSpeed: "Fast (50+ Mbps)",
      aircon: true,
      openingHours: "7:00 AM - 10:00 PM",
      lastUpdated: "2024-01-15",
      mapsUrl: "https://maps.app.goo.gl/khEyxazcCPRySbyv5",
      coordinates: { lat: 9.7211, lng: 100.0081 },
      category: "cafe",
      price: "Free (with purchase)",
      vibe: "Relaxed, community-focused"
    },
    {
      id: 2,
      name: "Martial Arts Academy",
      address: "Woktum, Koh Phangan",
      description: "Spacious coworking area with good WiFi and a peaceful environment. Great for focused work sessions.",
      images: ["/martial-arts-1.jpg"],
      sockets: "limited",
      nomadScore: 7,
      wifiSpeed: "Good (20-30 Mbps)",
      aircon: true,
      openingHours: "8:00 AM - 8:00 PM",
      lastUpdated: "2024-01-10",
      mapsUrl: "https://maps.app.goo.gl/xPDbWpxNKpQGPh4P6",
      coordinates: { lat: 9.7500, lng: 100.0200 },
      category: "coworking",
      price: "Free",
      vibe: "Quiet, focused"
    },
    {
      id: 3,
      name: "Beach Bar & Restaurant",
      address: "Haad Rin, Koh Phangan",
      description: "Beachfront location with ocean views. Perfect for those who want to work with a view.",
      images: ["/beach-bar-1.jpg"],
      sockets: "limited",
      nomadScore: 6,
      wifiSpeed: "Moderate (10-15 Mbps)",
      aircon: false,
      openingHours: "9:00 AM - 11:00 PM",
      lastUpdated: "2024-01-12",
      mapsUrl: "https://maps.app.goo.gl/example",
      coordinates: { lat: 9.7000, lng: 100.0000 },
      category: "beach",
      price: "Free (with purchase)",
      vibe: "Beach vibes, relaxed"
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'cafe', label: 'Cafes' },
    { id: 'coworking', label: 'Coworking' },
    { id: 'beach', label: 'Beach' },
    { id: 'mountain', label: 'Mountain' },
  ];

  const filteredSpaces = activeFilter === 'all'
    ? coworkingSpaces
    : coworkingSpaces.filter(space => space.category === activeFilter);

  const getNomadScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSocketsColor = (sockets: string) => {
    switch (sockets) {
      case 'plentiful': return 'text-green-600';
      case 'limited': return 'text-yellow-600';
      case 'none': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAirconIcon = (aircon: boolean) => {
    return aircon ? '❄️' : '🌡️';
  };

  const getSocketsIcon = (sockets: string) => {
    switch (sockets) {
      case 'plentiful': return '🔌🔌🔌';
      case 'limited': return '🔌🔌';
      case 'none': return '🔌';
      default: return '🔌';
    }
  };

  const mapCenter = selectedSpace
    ? selectedSpace.coordinates
    : filteredSpaces.length > 0
      ? filteredSpaces[0].coordinates
      : { lat: 9.7211, lng: 100.0081 };

  const handleShowMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const toggleCard = (id: number) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`min-h-screen w-screen ${sourceCodePro.variable} font-mono`} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar overlay */}
      <aside
        className="fixed top-0 left-0 h-full w-full sm:w-[400px] z-20 bg-[var(--card-bg)] bg-opacity-95 shadow-xl overflow-y-auto border-r border-[var(--card-border)]"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <header className="px-6 pt-6 pb-2 sticky top-0 z-30 bg-[var(--card-bg)] bg-opacity-95" style={{ backdropFilter: 'blur(8px)' }}>
          <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Coworking Spaces</h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
            Discover the best places to work on Koh Phangan.
          </p>
        </header>
        <div className="px-6 pt-2 pb-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
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
          {/* Location Cards */}
          <div className="space-y-4">
            {filteredSpaces.map((space) => {
              const expanded = expandedCards[space.id];
              return (
                <div
                  key={space.id}
                  className={`p-3 rounded-lg transition-all duration-200 border bg-[var(--card-bg)] ${selectedSpace?.id === space.id ? 'ring-2 ring-blue-500' : ''}`}
                  style={{ border: '1px solid var(--card-border)' }}
                >
                  {/* Compact Row Layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <h3 className="text-base font-semibold truncate" style={{ color: 'var(--foreground)' }} title="Coworking space name">{space.name}</h3>
                          <span className={`text-xs font-bold ${getNomadScoreColor(space.nomadScore)}`} title="Nomad friendliness score (1-10)">★ {space.nomadScore}</span>
                        </div>
                        <button
                          className="ml-2 px-2 py-1 rounded text-xs border font-semibold flex items-center transition-colors"
                          style={{
                            background: 'transparent',
                            color: 'var(--foreground)',
                            borderColor: 'var(--card-border)'
                          }}
                          aria-expanded={expanded}
                          aria-controls={`details-${space.id}`}
                          onClick={() => toggleCard(space.id)}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      {/* Key metrics on their own line */}
                      <div className="flex flex-wrap gap-4 text-xs mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                        <span className="truncate" title="Location address (neighborhood or area)">{space.address.replace(/,? ?Koh Phangan/i, '')}</span>
                        <span title="WiFi speed (measured in Mbps; higher is better)">📶 {(() => {
                          const match = space.wifiSpeed.match(/(\d+\s*Mbps)/i);
                          return match ? match[1] : space.wifiSpeed;
                        })()}</span>
                        <span title="Power socket availability (more icons = more sockets)">{getSocketsIcon(space.sockets)}</span>
                        <span title="Air conditioning available (❄️ = yes, 🌡️ = no)">{getAirconIcon(space.aircon)}</span>
                      </div>
                    </div>
                  </div>
                  {/* Only show expanded details and Google Maps button if expanded */}
                  {expanded && (
                    <div className="mt-2">
                      <p className="text-sm mb-2" style={{ color: 'var(--foreground)', opacity: 0.8 }}>{space.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {space.images.map((img, idx) => (
                          <img key={idx} src={img} alt={space.name + ' photo'} className="w-24 h-16 object-cover rounded border" />
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                        <span>Open: {space.openingHours}</span>
                        <span>Updated: {space.lastUpdated}</span>
                      </div>
                      <div className="text-xs mb-2" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                        <span>{space.price} • {space.vibe}</span>
                      </div>
                      <a
                        href={space.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 text-center mt-1"
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
                        onClick={e => e.stopPropagation()}
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>
      {/* Fullscreen Map */}
      <div className="fixed inset-0 z-10">
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={handleShowMyLocation}
            className="px-3 py-1 rounded-lg border font-semibold text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 text-center"
            style={{
              background: 'var(--foreground)',
              color: 'var(--background)',
              borderColor: 'var(--foreground)'
            }}
          >
            Show My Location
          </button>
        </div>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100vw', height: '100vh' }}
            center={mapCenter}
            zoom={12}
          >
            {filteredSpaces.map((space) => (
              <Marker
                key={space.id}
                position={space.coordinates}
                onClick={() => setSelectedSpace(space)}
                label={space.name}
                icon={selectedSpace?.id === space.id ? undefined : undefined}
              />
            ))}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                  scaledSize: typeof window !== 'undefined' && window.google && window.google.maps ? new window.google.maps.Size(40, 40) : undefined
                }}
              />
            )}
          </GoogleMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--card-bg)' }}>
            <div className="text-center">
              <p className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                Loading map...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 