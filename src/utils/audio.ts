// Lightweight Web Audio API spatial synth & UI feedback sound generator

class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientAudio: HTMLAudioElement | null = null;
  private ambientVolume = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Play subtle UI tap/focus click
  playClick(pitch: number = 880, duration: number = 0.04) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy or unavailable, silently ignore
    }
  }

  // Window open chime
  playWindowOpen() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Ignore
    }
  }

  // Toggle ambient atmospheric sound
  toggleAmbient(enable: boolean) {
    if (enable) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
  }

  startAmbient() {
    try {
      if (typeof window === 'undefined') return;
      if (!this.ambientAudio) {
        this.ambientAudio = new Audio('/audio/honey-jam.mp3');
        this.ambientAudio.loop = true;
        this.ambientAudio.volume = this.ambientVolume;
      }
      void this.ambientAudio.play().catch(() => {
        // Playback may require another user interaction or the track asset to be available.
      });
    } catch {
      // Audio unavailable
    }
  }

  stopAmbient() {
    this.ambientAudio?.pause();
    if (this.ambientAudio) this.ambientAudio.currentTime = 0;
  }

  setAmbientVolume(volume: number) {
    this.ambientVolume = Math.max(0, Math.min(1, volume));
    if (this.ambientAudio) this.ambientAudio.volume = this.ambientVolume;
  }

  getIsAmbientPlaying(): boolean {
    return Boolean(this.ambientAudio && !this.ambientAudio.paused);
  }
}

export const soundManager = new SoundManager();
