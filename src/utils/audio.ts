// Audio manager supporting both custom MP3 audio and Web Audio ambient music-box synthesis

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isPlayingSynth = false;
  private synthInterval: number | null = null;
  private isMuted = false;
  private isInitialized = false;
  private onStateChangeListeners: Array<(isPlaying: boolean, isMuted: boolean) => void> = [];

  constructor() {
    // Lazy initialized on user interaction
  }

  public subscribe(listener: (isPlaying: boolean, isMuted: boolean) => void) {
    this.onStateChangeListeners.push(listener);
    listener(this.isPlaying(), this.isMuted);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter(l => l !== listener);
    };
  }

  private notify() {
    const playing = this.isPlaying();
    this.onStateChangeListeners.forEach(l => l(playing, this.isMuted));
  }

  public isPlaying(): boolean {
    if (this.audio && !this.audio.paused && !this.audio.ended) return true;
    return this.isPlayingSynth;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public async startMusic(audioSrc = '/music/birthday.mp3') {
    if (this.isMuted) return;

    try {
      if (!this.audio) {
        this.audio = new Audio(audioSrc);
        this.audio.loop = true;
        this.audio.volume = 0.5;

        this.audio.addEventListener('error', () => {
          console.log("Custom MP3 not found or failed to load. Starting romantic ambient chime synthesizer.");
          this.startSynthMelody();
        });
      }

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.notify();
      }
    } catch {
      // Audio element failed or autoplay blocked -> fallback to Web Audio Synth
      this.startSynthMelody();
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.audio) this.audio.pause();
      this.stopSynth();
    } else {
      if (this.audio && this.audio.src) {
        this.audio.play().catch(() => this.startSynthMelody());
      } else {
        this.startSynthMelody();
      }
    }
    this.notify();
  }

  // Web Audio Music Box Synthesizer (dreamy, romantic pentatonic progression)
  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  private playTone(freq: number, time: number, duration = 1.8, gainVal = 0.12) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave with soft harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Bell / music box decay envelope
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(gainVal, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Ignore audio synthesis errors
    }
  }

  public startSynthMelody() {
    if (this.isPlayingSynth || this.isMuted) return;
    this.isPlayingSynth = true;
    this.notify();

    // Relaxing romantic chime sequence (Key of C/F: C4, E4, G4, A4, B4, C5, D5, E5, G5)
    const melodyNotes = [
      261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
      349.23, 440.00, 523.25, 659.25, // F4, A4, C5, E5
      293.66, 369.99, 440.00, 587.33, // D4, F#4, A4, D5
      392.00, 493.88, 587.33, 783.99  // G4, B4, D5, G5
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.isPlayingSynth || this.isMuted) return;
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // Play main bell note
      const baseFreq = melodyNotes[noteIndex % melodyNotes.length];
      this.playTone(baseFreq, now, 2.2, 0.1);

      // Play higher octave sparkle occasionally
      if (noteIndex % 2 === 0) {
        this.playTone(baseFreq * 2, now + 0.15, 1.6, 0.04);
      }

      noteIndex++;
    };

    playNext();
    this.synthInterval = window.setInterval(playNext, 950);
  }

  public stopSynth() {
    this.isPlayingSynth = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.notify();
  }

  // Sparkle / Gift opening chime SFX
  public playMagicalChime() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, i) => {
        this.playTone(freq, now + i * 0.08, 1.2, 0.15);
      });
    } catch {
      // Ignore
    }
  }

  public playHeartPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      this.playTone(880, now, 0.3, 0.08);
      this.playTone(1320, now + 0.06, 0.5, 0.1);
    } catch {
      // Ignore
    }
  }
}

export const audioManager = new AudioManager();
