import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Home',     href: '#hero'     },
    { name: 'About',    href: '#about'    },
    { name: 'Skills',   href: '#skills'   },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact',  href: '#contact'  },
];

export const Navbar = () => {
    const [isScrolled,  setIsScrolled]  = useState(false);
    const [isMenuOpen,  setIsMenuOpen]  = useState(false);
    const [activeHash,  setActiveHash]  = useState('#hero');

    // ── Scroll detection ─────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 16);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ── Active section via IntersectionObserver ───────────────────────────
    useEffect(() => {
        const ids = navItems.map(i => i.href.slice(1));
        const observers = ids.map(id => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveHash(`#${id}`); },
                { threshold: 0.4 }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    // ── Lock body scroll when mobile menu open ────────────────────────────
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const handleNav = (href) => {
        setActiveHash(href);
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* ── Liquid glass styles ──────────────────────────────────── */}
            <style>{`
                .liquid-glass-bar {
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.15);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.22),
                        inset 0 -1px 0 rgba(255,255,255,0.04),
                        0 8px 32px rgba(0,0,0,0.25),
                        0 2px 8px  rgba(0,0,0,0.15);
                    backdrop-filter: blur(28px) saturate(180%);
                    -webkit-backdrop-filter: blur(28px) saturate(180%);
                }
                .dark .liquid-glass-bar {
                    background: rgba(255,255,255,0.05);
                    border-color: rgba(255,255,255,0.12);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.18),
                        inset 0 -1px 0 rgba(255,255,255,0.03),
                        0 8px 40px rgba(0,0,0,0.5),
                        0 2px 8px  rgba(0,0,0,0.35);
                }
                /* Light mode glass */
                :root:not(.dark) .liquid-glass-bar {
                    background: rgba(255,255,255,0.55);
                    border-color: rgba(255,255,255,0.8);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.9),
                        inset 0 -1px 0 rgba(0,0,0,0.04),
                        0 4px 24px rgba(0,0,0,0.08),
                        0 1px 4px  rgba(0,0,0,0.06);
                }

                /* Specular highlight sweep across top edge */
                .liquid-glass-bar::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 14px; right: 14px;
                    height: 1px;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255,255,255,0.45) 30%,
                        rgba(255,255,255,0.65) 50%,
                        rgba(255,255,255,0.45) 70%,
                        transparent 100%
                    );
                    border-radius: 50%;
                    pointer-events: none;
                }

                /* Active link glass pill */
                .glass-active-pill {
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.2);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }
                :root:not(.dark) .glass-active-pill {
                    background: rgba(255,255,255,0.7);
                    border-color: rgba(255,255,255,0.9);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,1), 0 1px 4px rgba(0,0,0,0.06);
                }

                /* Mobile drawer glass */
                .liquid-glass-drawer {
                    background: rgba(10,14,26,0.85);
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(40px) saturate(160%);
                    -webkit-backdrop-filter: blur(40px) saturate(160%);
                }
                :root:not(.dark) .liquid-glass-drawer {
                    background: rgba(255,255,255,0.88);
                    border-bottom-color: rgba(0,0,0,0.08);
                }

                /* Mobile link pill active */
                .glass-mobile-active {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.18);
                }
                :root:not(.dark) .glass-mobile-active {
                    background: rgba(255,255,255,0.7);
                    border-color: rgba(0,0,0,0.08);
                }
            `}</style>

            <nav className={cn(
                'fixed top-0 inset-x-0 z-40 flex justify-center transition-all duration-500',
                isScrolled ? 'pt-3' : 'pt-5'
            )}>
                {/* ── Glass bar ─────────────────────────────────────────── */}
                <div className={cn(
                    'liquid-glass-bar relative flex items-center justify-between',
                    'transition-all duration-500',
                    isScrolled
                        ? 'w-[92%] max-w-4xl rounded-[20px] h-14 px-5'
                        : 'w-[96%] max-w-5xl rounded-[24px] h-[60px] px-6'
                )}>

                    {/* ── Logo ──────────────────────────────────────────── */}
                    <a
                        href="#hero"
                        onClick={() => handleNav('#hero')}
                        className="flex items-center gap-2.5 group relative z-10"
                    >
                        {/* Glowing accent dot */}
                        <span
                            className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-primary transition-all duration-300 group-hover:scale-125"
                            style={{ boxShadow: '0 0 8px rgba(99,102,246,0.8), 0 0 20px rgba(99,102,246,0.3)' }}
                        />
                        <span className={cn(
                            'font-bold tracking-tight text-foreground transition-all duration-500',
                            isScrolled ? 'text-xl' : 'text-2xl'
                        )}>
                            MarkYz
                            <span className="font-light text-foreground/35"> Portfolio</span>
                        </span>
                    </a>

                    {/* ── Desktop links ─────────────────────────────────── */}
                    <div className="hidden md:flex items-center gap-1 relative z-10">
                        {navItems.map((item) => {
                            const isActive = activeHash === item.href;
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => handleNav(item.href)}
                                    className={cn(
                                        'relative px-4 py-1.5 text-sm rounded-xl transition-all duration-200',
                                        isActive
                                            ? 'text-foreground font-medium'
                                            : 'text-foreground/50 hover:text-foreground/80'
                                    )}
                                >
                                    {isActive && (
                                        <span className="glass-active-pill absolute inset-0 rounded-xl" />
                                    )}
                                    <span className="relative">{item.name}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* ── Mobile hamburger ──────────────────────────────── */}
                    <button
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        className={cn(
                            'md:hidden relative z-10 flex items-center justify-center w-9 h-9 rounded-xl',
                            'glass-active-pill transition-colors duration-200',
                            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                        )}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        <span className={cn(
                            'absolute transition-all duration-200',
                            isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                        )}>
                            <X size={15} className="text-foreground" />
                        </span>
                        <span className={cn(
                            'absolute transition-all duration-200',
                            isMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
                        )}>
                            <Menu size={15} className="text-foreground" />
                        </span>
                    </button>
                </div>

                {/* ── Mobile drawer ─────────────────────────────────────── */}
                <div className={cn(
                    'fixed inset-0 z-30 md:hidden transition-all duration-300',
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                )}>
                    {/* Tap-outside backdrop */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Slide-down panel */}
                    <div className={cn(
                        'liquid-glass-drawer absolute top-0 inset-x-0 pt-28 pb-8 px-6',
                        'transition-transform duration-300 ease-out',
                        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    )}>
                        <nav className="flex flex-col gap-1.5">
                            {navItems.map((item, i) => {
                                const isActive = activeHash === item.href;
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => handleNav(item.href)}
                                        style={{ transitionDelay: isMenuOpen ? `${i * 45}ms` : '0ms' }}
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium',
                                            'transition-all duration-200',
                                            isActive
                                                ? 'glass-mobile-active text-foreground'
                                                : 'text-foreground/50 hover:text-foreground/80'
                                        )}
                                    >
                                        <span className={cn(
                                            'w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300',
                                            isActive ? 'bg-primary' : 'bg-foreground/20'
                                        )} />
                                        {item.name}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </nav>
        </>
    );
};