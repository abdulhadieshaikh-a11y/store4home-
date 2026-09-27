'use client';

import { useState } from 'react';
import Emblem from '@/components/art/Emblem';
import { site } from '@/lib/site';

/**
 * Map-ready location block. Shows a lightweight vintage "map card" first and only
 * loads Google Maps when asked — faster pages, no third-party requests up front.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="keyline relative aspect-[4/5] w-full overflow-hidden bg-iron-950 sm:aspect-[16/10]">
      {loaded ? (
        <iframe
          title={`Map showing ${site.name}, ${site.address.oneLine}`}
          src={site.maps.embed}
          className="absolute inset-0 h-full w-full border-0 [filter:sepia(.35)_saturate(.8)_contrast(1.05)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0">
          {/* stylised street grid */}
          <svg aria-hidden viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            <rect width="800" height="500" fill="#1A110B" />
            <g stroke="#B8935A" strokeOpacity=".14" strokeWidth="1">
              {Array.from({ length: 26 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 34} y1="0" x2={i * 34 - 120} y2="500" />
              ))}
              {Array.from({ length: 18 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 32} x2="800" y2={i * 32 + 40} />
              ))}
            </g>
            <g stroke="#C4541C" strokeOpacity=".45" fill="none">
              <path d="M-20 360 C 200 320, 420 380, 820 300" strokeWidth="6" />
              <path d="M300 -20 C 340 160, 360 320, 330 520" strokeWidth="4" />
            </g>
            <circle cx="400" cy="250" r="120" fill="#C4541C" fillOpacity=".08" />
            <circle cx="400" cy="250" r="60" fill="#C4541C" fillOpacity=".12" />
          </svg>
          <div className="grain pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
            <Emblem tone="ember" decorative className="w-24 sm:w-28" />
            <p className="mt-5 font-label text-[0.7rem] uppercase tracking-wide2 text-ember-300">Plus code {site.address.plusCode}</p>
            <p className="mt-2 max-w-xs font-serif italic text-cream/80">CP & Berar Society, BMCHS, Sharafabad, Karachi</p>
            <div className="mt-6 flex flex-col gap-3 xs:flex-row">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="border border-cream/40 px-5 py-3 font-label text-[0.72rem] uppercase tracking-label text-cream transition-colors hover:border-ember-400 hover:text-ember-300"
              >
                Load map
              </button>
              <a
                href={site.maps.view}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ember-500 px-5 py-3 font-label text-[0.72rem] uppercase tracking-label text-cream-50 transition-colors hover:bg-ember-400"
              >
                Open in Google Maps<span className="sr-only"> (new tab)</span>
              </a>
            </div>
            <p className="mt-4 text-xs text-cream/40">Loading the map connects to Google.</p>
          </div>
        </div>
      )}
    </div>
  );
}
