import { useState, useEffect, useRef } from "react";
import { Music2, Volume2, VolumeX, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Import your audio files from src/assets/music/ ───────────────────────────
import track1 from "../assets/music/track1.mp3";
import track2 from "../assets/music/track2.mp3";
import track3 from "../assets/music/track3.mp3";
import track4 from "../assets/music/track4.mp3";
import track5 from "../assets/music/track5.mp3";
import track6 from "../assets/music/track6.mp3";
import track7 from "../assets/music/track7.mp3";
import track8 from "../assets/music/track8.mp3";

const PLAYLIST = [
    { id: 1, title: "At Ease", artist: "Hazelwood", src: track1 },
    { id: 2, title: "Chances", artist: "Burgundy", src: track2 },
    { id: 3, title: "Guava", artist: "HiLau, tubebackr", src: track3 },
    { id: 4, title: "Fever", artist: "ENHYPEN", src: track4 },
    { id: 5, title: "RUDE!", artist: "Hearts2Hearts", src: track5 },
    { id: 6, title: "พบรัก", artist: "INK WARUNTORN", src: track6 },
    { id: 7, title: "gingersweet", artist: "massobeats", src: track7 },
    { id: 8, title: "Quiet Bounce", artist: "Adventure", src: track8 },
];

const hasThaiText = (text) => /[\u0E00-\u0E7F]/.test(text);

// ─── Visualizer ───────────────────────────────────────────────────────────────
const Visualizer = ({ isPlaying }) => {
    const heights = [3, 5, 4, 7, 5, 3, 6, 4];

    return (
        <div className="flex items-end gap-[2px] h-4">
            {heights.map((h, i) => (
                <span
                    key={i}
                    className="w-[2.5px] rounded-full"
                    style={{
                        background: "hsl(var(--primary))",
                        height: isPlaying ? `${h * 2}px` : "3px",
                        opacity: isPlaying ? 0.85 : 0.35,
                        animation: isPlaying
                            ? `mp-bar ${0.38 + i * 0.06}s ease-in-out infinite alternate`
                            : "none",
                        animationDelay: `${i * 0.04}s`,
                        transition: "height 0.3s ease, opacity 0.3s ease",
                    }}
                />
            ))}

            <style>{`
        @keyframes mp-bar {
          from { transform: scaleY(0.25); }
          to   { transform: scaleY(1); }
        }
      `}</style>
        </div>
    );
};

// ─── Glass styles ─────────────────────────────────────────────────────────────
const GLASS_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

  .font-itim {
    font-family: 'Itim', cursive;
  }  

  .mp-glass {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.16);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.24),
      inset 0 -1px 0 rgba(255,255,255,0.04),
      0 8px 32px rgba(0,0,0,0.35),
      0 2px 8px rgba(0,0,0,0.2);
    backdrop-filter: blur(28px) saturate(180%);
    -webkit-backdrop-filter: blur(28px) saturate(180%);
    position: relative;
  }

  :root:not(.dark) .mp-glass {
    background: rgba(255,255,255,0.58);
    border-color: rgba(255,255,255,0.82);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.95),
      inset 0 -1px 0 rgba(0,0,0,0.03),
      0 4px 24px rgba(0,0,0,0.09),
      0 1px 4px rgba(0,0,0,0.06);
  }

  .mp-glass::before {
    content: '';
    position: absolute;
    top: 0;
    left: 12px;
    right: 12px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.4) 25%,
      rgba(255,255,255,0.65) 50%,
      rgba(255,255,255,0.4) 75%,
      transparent 100%
    );
    border-radius: 50%;
    pointer-events: none;
  }

  .mp-glass-panel {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.13);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.18),
      0 16px 48px rgba(0,0,0,0.45),
      0 4px 16px rgba(0,0,0,0.25);
    backdrop-filter: blur(40px) saturate(200%);
    -webkit-backdrop-filter: blur(40px) saturate(200%);
  }

  :root:not(.dark) .mp-glass-panel {
    background: rgba(255,255,255,0.72);
    border-color: rgba(255,255,255,0.88);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,1),
      0 8px 32px rgba(0,0,0,0.1),
      0 2px 8px rgba(0,0,0,0.06);
  }

  .mp-glass-popup {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.22),
      0 12px 40px rgba(0,0,0,0.4),
      0 2px 8px rgba(0,0,0,0.2);
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
  }

  :root:not(.dark) .mp-glass-popup {
    background: rgba(255,255,255,0.65);
    border-color: rgba(255,255,255,0.9);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,1),
      0 8px 24px rgba(0,0,0,0.08);
  }

  .mp-divider {
    background: rgba(255,255,255,0.15);
  }

  :root:not(.dark) .mp-divider {
    background: rgba(0,0,0,0.1);
  }

  .mp-icon-btn {
    border-radius: 50%;
    transition: background 0.15s ease;
  }

  .mp-icon-btn:hover {
    background: rgba(255,255,255,0.12);
  }

  :root:not(.dark) .mp-icon-btn:hover {
    background: rgba(0,0,0,0.06);
  }

  .mp-track-row {
    border-radius: 10px;
    transition: background 0.15s ease;
  }

  .mp-track-row:hover {
    background: rgba(255,255,255,0.08);
  }

  :root:not(.dark) .mp-track-row:hover {
    background: rgba(0,0,0,0.04);
  }

  .mp-track-row.active {
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.2);
  }

  :root:not(.dark) .mp-track-row.active {
    background: rgba(255,255,255,0.75);
    border-color: rgba(255,255,255,0.9);
  }

  .mp-volume-range {
    width: 88px;
    height: 18px;
    cursor: pointer;
    accent-color: hsl(var(--primary));
    transform: rotate(-90deg);
  }
`;

// ─── Main Component ───────────────────────────────────────────────────────────
export const MusicPlayer = () => {
    const audioRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.6);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);

    const volumeTimer = useRef(null);
    const playlistTimer = useRef(null);
    const pendingPlay = useRef(false);
    const lastVolume = useRef(0.6);

    const current = PLAYLIST[currentIndex];
    const effectiveVol = isMuted ? 0 : volume;

    // ── Update volume ────────────────────────────────────────────────────────
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = isMuted ? 0 : volume;
    }, [volume, isMuted]);

    // ── When track changes, load new song and play if needed ─────────────────
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.load();

        if (pendingPlay.current) {
            pendingPlay.current = false;

            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.error("Audio play failed:", error);
                    setIsPlaying(false);
                });
        }
    }, [currentIndex, current.src]);

    // ── Auto next song ───────────────────────────────────────────────────────
    const handleEnded = () => {
        pendingPlay.current = true;
        setCurrentIndex((i) => (i + 1) % PLAYLIST.length);
    };

    // ── Play / Pause ─────────────────────────────────────────────────────────
    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.volume = effectiveVol;
                await audio.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Audio play failed:", error);
            setIsPlaying(false);
        }
    };

    // ── Select track ─────────────────────────────────────────────────────────
    const selectTrack = (idx) => {
        setShowPlaylist(false);

        if (idx === currentIndex) {
            togglePlay();
            return;
        }

        pendingPlay.current = true;
        setCurrentIndex(idx);
    };

    // ── Volume change ────────────────────────────────────────────────────────
    const handleVolumeChange = (e) => {
        const v = Number(e.target.value);

        setVolume(v);

        if (v > 0) {
            lastVolume.current = v;
            setIsMuted(false);

            if (audioRef.current) {
                audioRef.current.volume = v;
                audioRef.current.muted = false;
            }
        } else {
            setIsMuted(true);

            if (audioRef.current) {
                audioRef.current.volume = 0;
                audioRef.current.muted = true;
            }
        }
    };

    // ── Hover helpers ────────────────────────────────────────────────────────
    const enterVolume = () => {
        clearTimeout(volumeTimer.current);
        setShowVolume(true);
    };

    const leaveVolume = () => {
        volumeTimer.current = setTimeout(() => {
            setShowVolume(false);
        }, 280);
    };

    const enterPlaylist = () => {
        clearTimeout(playlistTimer.current);
        setShowPlaylist(true);
    };

    const leavePlaylist = () => {
        playlistTimer.current = setTimeout(() => {
            setShowPlaylist(false);
        }, 280);
    };

    useEffect(() => {
        const startMusicOnFirstInteraction = async () => {
            const audio = audioRef.current;
            if (!audio) return;

            try {
                audio.volume = isMuted ? 0 : volume;
                audio.muted = isMuted;
                await audio.play();
                setIsPlaying(true);

                window.removeEventListener("click", startMusicOnFirstInteraction);
                window.removeEventListener("keydown", startMusicOnFirstInteraction);
                window.removeEventListener("touchstart", startMusicOnFirstInteraction);
            } catch (error) {
                console.error("Autoplay failed:", error);
            }
        };

        window.addEventListener("click", startMusicOnFirstInteraction);
        window.addEventListener("keydown", startMusicOnFirstInteraction);
        window.addEventListener("touchstart", startMusicOnFirstInteraction);

        return () => {
            window.removeEventListener("click", startMusicOnFirstInteraction);
            window.removeEventListener("keydown", startMusicOnFirstInteraction);
            window.removeEventListener("touchstart", startMusicOnFirstInteraction);
        };
    }, [volume, isMuted]);

    return (
        <>
            <style>{GLASS_STYLES}</style>

            <audio
                ref={audioRef}
                src={current.src}
                preload="auto"
                muted={isMuted}
                onEnded={handleEnded}
            />

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
                {/* ── Playlist panel ──────────────────────────────────────────────── */}
                <div
                    onMouseEnter={enterPlaylist}
                    onMouseLeave={leavePlaylist}
                    className={cn(
                        "mp-glass-panel w-64 rounded-2xl p-2 flex flex-col gap-0.5",
                        "transition-all duration-300 origin-bottom-right",
                        showPlaylist
                            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                    )}
                >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] px-3 pt-1 pb-1.5 text-foreground/35">
                        Playlist
                    </p>

                    {PLAYLIST.map((track, idx) => {
                        const isActive = idx === currentIndex;

                        return (
                            <button
                                key={track.id}
                                onClick={() => selectTrack(idx)}
                                className={cn(
                                    "mp-track-row flex items-center gap-3 px-3 py-2 text-left w-full",
                                    isActive && "active"
                                )}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                                    style={{
                                        background:
                                            isActive && isPlaying
                                                ? "hsl(var(--primary))"
                                                : isActive
                                                    ? "hsl(var(--primary) / 0.5)"
                                                    : "transparent",
                                        boxShadow:
                                            isActive && isPlaying
                                                ? "0 0 6px hsl(var(--primary) / 0.8)"
                                                : "none",
                                    }}
                                />

                                <div className="min-w-0 flex-1">
                                    <p
                                        className={cn(
                                            "text-xs font-medium truncate leading-tight",
                                            isActive ? "text-foreground" : "text-foreground/60",
                                            hasThaiText(track.title) && "font-itim text-sm"
                                        )}
                                    >
                                        {track.title}
                                    </p>

                                    <p
                                        className="text-[10px] truncate leading-tight"
                                        style={{ color: "rgba(150,150,170,0.6)" }}
                                    >
                                        {track.artist}
                                    </p>
                                </div>

                                {isActive && isPlaying && <Visualizer isPlaying={true} />}
                            </button>
                        );
                    })}
                </div>

                {/* ── Main pill ───────────────────────────────────────────────────── */}
                <div className="mp-glass flex items-center gap-0 rounded-2xl px-1 py-1">
                    {/* Volume */}
                    <div
                        className="relative flex items-center px-2"
                        onMouseEnter={enterVolume}
                        onMouseLeave={leaveVolume}
                    >
                        <button
                            onClick={() => {
                                if (isMuted || volume === 0) {
                                    const restoredVolume = lastVolume.current || 0.6;
                                    setVolume(restoredVolume);
                                    setIsMuted(false);

                                    if (audioRef.current) {
                                        audioRef.current.volume = restoredVolume;
                                        audioRef.current.muted = false;
                                    }
                                } else {
                                    lastVolume.current = volume;
                                    setIsMuted(true);

                                    if (audioRef.current) {
                                        audioRef.current.volume = 0;
                                        audioRef.current.muted = true;
                                    }
                                }
                            }}
                            className="mp-icon-btn flex items-center justify-center w-8 h-8"
                            aria-label="Toggle mute"
                        >
                            {effectiveVol === 0 ? (
                                <VolumeX className="w-4 h-4 text-foreground/50" />
                            ) : (
                                <Volume2
                                    className="w-4 h-4"
                                    style={{ color: "hsl(var(--primary))" }}
                                />
                            )}
                        </button>

                        {/* Volume popup */}
                        <div
                            onMouseEnter={() => clearTimeout(volumeTimer.current)}
                            onMouseLeave={leaveVolume}
                            className={cn(
                                "mp-glass-popup absolute bottom-12 left-1/2 -translate-x-1/2",
                                "flex flex-col items-center gap-2 px-3.5 py-3.5 rounded-xl",
                                "transition-all duration-200 origin-bottom",
                                showVolume
                                    ? "opacity-100 scale-100 pointer-events-auto"
                                    : "opacity-0 scale-90 pointer-events-none"
                            )}
                        >
                            <span
                                className="text-[10px] font-semibold tabular-nums"
                                style={{ color: "hsl(var(--primary))" }}
                            >
                                {Math.round(effectiveVol * 100)}%
                            </span>

                            <div className="h-[88px] w-[28px] flex items-center justify-center">
                                <input
                                    type="range"
                                    className="mp-volume-range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={effectiveVol}
                                    onChange={handleVolumeChange}
                                    onInput={handleVolumeChange}
                                    aria-label="Volume"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="mp-divider w-px h-5 mx-0.5 flex-shrink-0" />

                    {/* Play / Pause */}
                    <button
                        onClick={togglePlay}
                        className="mx-2 flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-150"
                        style={{
                            background: "hsl(var(--primary) / 0.15)",
                            border: "1px solid hsl(var(--primary) / 0.25)",
                            boxShadow: isPlaying
                                ? "0 0 12px hsl(var(--primary) / 0.3)"
                                : "none",
                        }}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <span className="flex gap-[3px]">
                                <span
                                    className="w-[3px] h-3.5 rounded-full block"
                                    style={{ background: "hsl(var(--primary))" }}
                                />
                                <span
                                    className="w-[3px] h-3.5 rounded-full block"
                                    style={{ background: "hsl(var(--primary))" }}
                                />
                            </span>
                        ) : (
                            <Music2
                                className="w-4 h-4"
                                style={{ color: "hsl(var(--primary))" }}
                            />
                        )}
                    </button>

                    <div className="mp-divider w-px h-5 mx-0.5 flex-shrink-0" />

                    {/* Track info */}
                    <div
                        className="relative flex items-center gap-2.5 px-2 cursor-default"
                        onMouseEnter={enterPlaylist}
                        onMouseLeave={leavePlaylist}
                    >
                        <div className="flex flex-col min-w-0 max-w-[108px]">
                            <span
                                className={cn(
                                    "text-xs font-medium truncate leading-tight text-foreground/90",
                                    hasThaiText(current.title) && "font-itim text-sm"
                                )}
                            >
                                {current.title}
                            </span>

                            <span
                                className="text-[10px] truncate leading-tight"
                                style={{ color: "rgba(150,150,170,0.6)" }}
                            >
                                {current.artist}
                            </span>
                        </div>

                        <Visualizer isPlaying={isPlaying} />

                        <ChevronUp
                            className="w-3 h-3 flex-shrink-0 transition-transform duration-200"
                            style={{
                                color: "rgba(150,150,170,0.4)",
                                transform: showPlaylist ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};