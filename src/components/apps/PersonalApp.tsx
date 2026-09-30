import React, { useState } from 'react';
import { Headphones, Image, Music2 } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/portfolioData';

type MusicPlatform = 'spotify' | 'youtube';

export const PersonalApp: React.FC = () => {
  const [platform, setPlatform] = useState<MusicPlatform>('spotify');
  const playlistUrl = platform === 'spotify' ? PERSONAL_DATA.spotifyPlaylistUrl : PERSONAL_DATA.youtubePlaylistUrl;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
      <section className="personal-section">
        <div className="mb-4 flex items-center gap-2">
          <Image className="h-4 w-4 text-rose-300" />
          <h2 className="text-sm font-semibold text-white">Photo Gallery</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PERSONAL_DATA.photos.map((photo) => (
            <figure key={photo.src} className="personal-photo">
              <img src={photo.src} alt={photo.alt} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <figcaption className="pt-2 text-xs text-slate-300">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="personal-section mt-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4 text-emerald-300" />
            <h2 className="text-sm font-semibold text-white">Listening Room</h2>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1" role="group" aria-label="Music service">
            <button type="button" onClick={() => setPlatform('spotify')} aria-pressed={platform === 'spotify'} className={`music-platform ${platform === 'spotify' ? 'music-platform-active' : ''}`}>
              Spotify
            </button>
            <button type="button" onClick={() => setPlatform('youtube')} aria-pressed={platform === 'youtube'} className={`music-platform ${platform === 'youtube' ? 'music-platform-active' : ''}`}>
              YouTube
            </button>
          </div>
        </div>
        <div className="music-embed-wrap">
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-300">
            <Music2 className="h-3.5 w-3.5 text-emerald-300" />
            <span>My Playlist</span>
          </div>
          <iframe
            key={platform}
            src={playlistUrl}
            title={`${platform === 'spotify' ? 'Spotify' : 'YouTube'} music player`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="h-[152px] w-full rounded-lg border-0"
          />
        </div>
      </section>
    </div>
  );
};
