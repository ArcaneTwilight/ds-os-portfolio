import React from 'react';

interface LoadingScreenProps {
  exiting: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ exiting }) => (
  <div className={`loading-screen ${exiting ? 'loading-screen-exit' : ''}`} aria-live="polite">
    <div className="loading-glow loading-glow-one" />
    <div className="loading-glow loading-glow-two" />
    <section className="loading-panel" aria-label="Connecting to virtual device">
      <div className="flex items-center gap-3">
        <div className="loading-mark">DS</div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-sky-200/70">DS OS / boot sequence</p>
          <h1 className="mt-1 text-base font-semibold text-white">Connecting to virtual device</h1>
        </div>
      </div>
      <p className="mt-6 text-xs text-slate-300">Establishing secure connection…</p>
      <div className="loading-progress mt-3" role="progressbar" aria-label="Connection progress">
        <span />
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Syncing virtual environment</span>
        <span className="loading-dots" aria-hidden="true"><i /><i /><i /></span>
      </div>
    </section>
  </div>
);