'use client';

import { useEffect, useState } from 'react';

/* ──────────────────────────────────────────────────────────────────────────
   Colour helpers — CSS custom props so light/dark mode works automatically
   ────────────────────────────────────────────────────────────────────────── */
const P = 'var(--color-primary)';
const FG = 'var(--color-foreground)';
const BG = 'var(--color-card)';
const BD = 'var(--color-border)';
const MUT = 'var(--color-muted-foreground)';
const SEC = 'var(--color-secondary)';

type Sty = React.CSSProperties;
const css = (o: Partial<Sty>): Sty => o as Sty;

/* ──────────────────────────────────────────────────────────────────────────
   Shared RAF hook — isolated per HeroVisual mount so only this subtree re-renders
   ────────────────────────────────────────────────────────────────────────── */
function useTime() {
    const [t, setT] = useState(0);
    useEffect(() => {
        let id: number;
        const start = performance.now();
        const tick = (now: number) => { setT((now - start) / 1000); id = requestAnimationFrame(tick); };
        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, []);
    return t;
}

/* ════════════════════════════════════════════════════════════════════════════
   1 ▸ CIVIL — Suspension Bridge with vehicles & live structural metrics
   ════════════════════════════════════════════════════════════════════════════ */
function CivilVisual({ t }: { t: number }) {
    const W = 420, H = 320;
    const deckY = 205, tL = 115, tR = 305, tTop = deckY - 130;
    const aL = 18, aR = 402;
    const N = 26;

    const cable = Array.from({ length: N }, (_, i) => {
        const x = aL + (i / (N - 1)) * (aR - aL);
        const n = (x - aL) / (aR - aL);
        return { x, y: tTop + (Math.pow(n * 2 - 1, 2) - 1) * 68 };
    });
    const cableD = cable.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

    const suspenders = Array.from({ length: 12 }, (_, i) => {
        const x = tL + 14 + (i / 11) * (tR - tL - 28);
        const n = (x - aL) / (aR - aL);
        return { x, cY: tTop + (Math.pow(n * 2 - 1, 2) - 1) * 68 };
    });

    const cars = [
        { off: 0, spd: 36, w: 30, h: 13, col: '#4A9EFF' },
        { off: 170, spd: 24, w: 22, h: 11, col: '#FF6B4A' },
        { off: 300, spd: 31, w: 20, h: 10, col: '#FFD14A' },
    ].map(c => ({ ...c, x: ((t * c.spd + c.off) % (aR - aL + c.w + 20)) + aL - c.w }));

    const waveY = deckY + 58;
    const waveD = Array.from({ length: 36 }, (_, i) => {
        const x = (i / 35) * W;
        const y = waveY + Math.sin(x * .07 + t * 1.9) * 5 + Math.sin(x * .03 - t * 1.1) * 3;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
                <linearGradient id="cv-water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={P} stopOpacity=".16" />
                    <stop offset="100%" stopColor={P} stopOpacity=".03" />
                </linearGradient>
            </defs>

            {/* river */}
            <rect x={0} y={waveY} width={W} height={H - waveY} fill="url(#cv-water)" />
            <path d={waveD} style={css({ stroke: P, strokeWidth: 1.5, fill: 'none', opacity: '.3' })} />

            {/* approach slabs */}
            {[{ x: 0, w: tL }, { x: tR, w: W - tR }].map((s, i) => (
                <rect key={i} x={s.x} y={deckY - 4} width={s.w} height={8}
                    style={css({ fill: SEC })} />
            ))}

            {/* deck */}
            <rect x={tL} y={deckY - 6} width={tR - tL} height={12}
                style={css({ fill: BD })} rx="1" />
            <rect x={tL} y={deckY - 3} width={tR - tL} height={6}
                style={css({ fill: SEC })} />

            {/* centre-line dashes */}
            {Array.from({ length: 9 }, (_, i) => (
                <rect key={i} x={tL + 14 + i * 24} y={deckY - 1} width={12} height={2}
                    style={css({ fill: P, opacity: '.35' })} rx="1" />
            ))}

            {/* suspenders */}
            {suspenders.map((s, i) => (
                <line key={i} x1={s.x} y1={s.cY} x2={s.x} y2={deckY - 6}
                    style={css({ stroke: P, strokeWidth: 1.5, opacity: '.5' })} />
            ))}

            {/* shadow cable */}
            <path d={cable.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${(p.y + 6).toFixed(1)}`).join(' ')}
                style={css({ stroke: P, strokeWidth: 2.5, fill: 'none', opacity: '.18' })} />

            {/* main cable */}
            <path d={cableD} style={css({ stroke: P, strokeWidth: 4, fill: 'none', opacity: '.9' })} />

            {/* stress knots */}
            {[.25, .5, .75].map((f, i) => {
                const p = cable[Math.round(f * (N - 1))];
                const pulse = .5 + Math.sin(t * 2.6 + i) * .32;
                return <circle key={i} cx={p.x} cy={p.y} r={4 + Math.sin(t * 2 + i) * 1.5}
                    style={css({ fill: P, opacity: pulse })} />;
            })}

            {/* towers */}
            {[tL, tR].map((tx, i) => (
                <g key={i}>
                    <rect x={tx - 7} y={tTop} width={14} height={deckY - tTop}
                        style={css({ fill: P, opacity: '.82' })} rx="2" />
                    <rect x={tx - 17} y={tTop + 24} width={34} height={9}
                        style={css({ fill: P, opacity: '.5' })} rx="1" />
                    <rect x={tx - 4} y={tTop - 11} width={8} height={14}
                        style={css({ fill: P })} rx="1" />
                </g>
            ))}

            {/* vehicles */}
            {cars.map((c, i) => (
                <g key={i}>
                    <rect x={c.x} y={deckY - 6 - c.h} width={c.w} height={c.h}
                        style={css({ fill: c.col, opacity: '.88' })} rx="2" />
                    <circle cx={c.x + 5} cy={deckY - 6} r={3} style={css({ fill: '#333' })} />
                    <circle cx={c.x + c.w - 5} cy={deckY - 6} r={3} style={css({ fill: '#333' })} />
                </g>
            ))}

            {/* metric cards */}
            {[
                { x: 8, label: 'LIVE LOAD', val: `${(186 + Math.sin(t * .5) * 18).toFixed(0)} t` },
                { x: 150, label: 'DEFLECTION', val: `${(14.2 + Math.sin(t * .7) * 3).toFixed(1)} mm` },
                { x: 296, label: 'PEAK STRESS', val: `${(314 + Math.sin(t * .4) * 24).toFixed(0)} MPa` },
            ].map((m, i) => (
                <g key={i}>
                    <rect x={m.x} y={8} width={112} height={46} rx="7"
                        style={css({ fill: BG, stroke: BD, strokeWidth: 1 })} />
                    <text x={m.x + 8} y={24} style={css({ fill: P, fontSize: 7.5, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>{m.label}</text>
                    <text x={m.x + 8} y={42} style={css({ fill: FG, fontSize: 14, fontWeight: 800, fontFamily: 'var(--font-sans)' })}>{m.val}</text>
                </g>
            ))}

            <text x={W / 2} y={308} textAnchor="middle"
                style={css({ fill: MUT, fontSize: 8, fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: 1.5 })}>
                SUSPENSION BRIDGE · LIVE STRUCTURAL ANALYSIS
            </text>
        </svg>
    );
}

/* ════════════════════════════════════════════════════════════════════════════
   2 ▸ PROCESS — Industrial P&ID with animated fluid flow
   ════════════════════════════════════════════════════════════════════════════ */
function ProcessVisual({ t }: { t: number }) {
    const fOff = -(t * 36) % 18;

    const vessels = [
        { x: 22, y: 80, w: 70, h: 115, label: ['FEED', 'TANK'], lv: .72 + Math.sin(t * .3) * .04 },
        { x: 175, y: 98, w: 66, h: 92, label: ['REACTOR'], lv: .55 + Math.sin(t * .5 + 1) * .09 },
        { x: 320, y: 85, w: 70, h: 105, label: ['PRODUCT', 'TANK'], lv: .28 + (t * .018 % .46) },
    ];
    const mainY = 212;

    const pipes = [
        { x1: 92, y1: mainY, x2: 175, y2: mainY },
        { x1: 241, y1: mainY, x2: 320, y2: mainY },
    ];

    const pX = 134, pY = mainY;
    const hxX = 280, hxY = mainY;

    return (
        <svg viewBox="0 0 420 308" className="w-full h-full">
            <defs>
                <linearGradient id="pv-fluid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={P} stopOpacity=".85" />
                    <stop offset="100%" stopColor={P} stopOpacity=".38" />
                </linearGradient>
            </defs>

            {/* pipes */}
            {pipes.map((p, i) => (
                <g key={i}>
                    <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                        style={css({ stroke: BD, strokeWidth: 13, strokeLinecap: 'round' })} />
                    <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                        style={css({
                            stroke: P, strokeWidth: 7, strokeLinecap: 'round', opacity: '.75',
                            strokeDasharray: '11 6', strokeDashoffset: fOff
                        })} />
                </g>
            ))}

            {/* reactor drain */}
            <line x1={208} y1={190} x2={208} y2={256}
                style={css({ stroke: BD, strokeWidth: 9 })} />
            <line x1={208} y1={190} x2={208} y2={256}
                style={css({ stroke: P, strokeWidth: 5, opacity: '.5', strokeDasharray: '7 5', strokeDashoffset: fOff })} />

            {/* pump */}
            <circle cx={pX} cy={pY} r={17} style={css({ fill: BG, stroke: P, strokeWidth: 2.5 })} />
            <g transform={`rotate(${t * 180}, ${pX}, ${pY})`}>
                {Array.from({ length: 4 }, (_, i) => (
                    <line key={i}
                        x1={pX} y1={pY}
                        x2={pX + Math.cos(i * Math.PI / 2) * 12}
                        y2={pY + Math.sin(i * Math.PI / 2) * 12}
                        style={css({ stroke: P, strokeWidth: 3.5, strokeLinecap: 'round', opacity: '.9' })} />
                ))}
            </g>
            <text x={pX} y={pY + 29} textAnchor="middle"
                style={css({ fill: P, fontSize: 7, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>PUMP-01</text>

            {/* heat exchanger */}
            <rect x={hxX - 20} y={hxY - 11} width={40} height={22} rx="5"
                style={css({ fill: BG, stroke: P, strokeWidth: 1.8 })} />
            {Array.from({ length: 5 }, (_, i) => (
                <line key={i} x1={hxX - 14 + i * 7} y1={hxY - 11} x2={hxX - 14 + i * 7} y2={hxY + 11}
                    style={css({ stroke: P, strokeWidth: 1, opacity: '.4' })} />
            ))}
            <text x={hxX} y={hxY + 30} textAnchor="middle"
                style={css({ fill: P, fontSize: 7, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>HX-01</text>

            {/* vessels */}
            {vessels.map((v, i) => {
                const fluidY = v.y + v.h * (1 - v.lv);
                const wD = Array.from({ length: 8 }, (_, j) => {
                    const wx = v.x + 3 + (j / 7) * (v.w - 6);
                    const wy = fluidY + Math.sin(t * 2.5 + i + j) * 2.2;
                    return `${j === 0 ? 'M' : 'L'}${wx.toFixed(1)},${wy.toFixed(1)}`;
                }).join(' ');
                return (
                    <g key={i}>
                        <rect x={v.x} y={v.y} width={v.w} height={v.h} rx="5"
                            style={css({ fill: BG, stroke: P, strokeWidth: 2.2, opacity: '.96' })} />
                        <clipPath id={`pv-clip-${i}`}>
                            <rect x={v.x} y={v.y} width={v.w} height={v.h} rx="5" />
                        </clipPath>
                        <rect x={v.x + 2} y={fluidY} width={v.w - 4} height={v.h * v.lv}
                            fill="url(#pv-fluid)" clipPath={`url(#pv-clip-${i})`} />
                        <path d={wD}
                            style={css({ stroke: 'white', strokeWidth: 1.5, fill: 'none', opacity: '.38' })} />
                        {v.lv > .25 && (
                            <text x={v.x + v.w / 2} y={fluidY + 20} textAnchor="middle"
                                style={css({ fill: 'white', fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-sans)' })}>
                                {Math.round(v.lv * 100)}%
                            </text>
                        )}
                        {/* connection stub */}
                        <rect x={i < 2 ? v.x + v.w - 1 : v.x - 7} y={mainY - 5} width={8} height={9} rx="1"
                            style={css({ fill: P, opacity: '.55' })} />
                        {/* labels */}
                        {v.label.map((ln, li) => (
                            <text key={li} x={v.x + v.w / 2} y={v.y + v.h + 14 + li * 11} textAnchor="middle"
                                style={css({ fill: P, fontSize: 7.5, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>
                                {ln}
                            </text>
                        ))}
                    </g>
                );
            })}

            {/* temp probes */}
            {[{ x: 162, y: 152 }, { x: 308, y: 140 }].map((pr, i) => (
                <g key={i}>
                    <circle cx={pr.x} cy={pr.y} r={13}
                        style={css({ fill: BG, stroke: P, strokeWidth: 1.8 })} />
                    <text x={pr.x} y={pr.y + 4} textAnchor="middle"
                        style={css({ fill: P, fontSize: 7.5, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>
                        {(66 + i * 22 + Math.sin(t * .5 + i) * 4).toFixed(0)}°
                    </text>
                </g>
            ))}

            {/* stat cards */}
            {[
                { x: 6, label: 'FLOW RATE', val: `${(44.2 + Math.sin(t * .9) * 4.6).toFixed(1)} L/m` },
                { x: 156, label: 'TEMP', val: `${(78 + Math.sin(t * .4) * 6).toFixed(0)} °C` },
                { x: 296, label: 'PRESSURE', val: `${(3.2 + Math.sin(t * .4) * .3).toFixed(2)} bar` },
            ].map((m, i) => (
                <g key={i}>
                    <rect x={m.x} y={265} width={116} height={38} rx="7"
                        style={css({ fill: BG, stroke: BD, strokeWidth: 1 })} />
                    <text x={m.x + 8} y={279} style={css({ fill: P, fontSize: 7.5, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>{m.label}</text>
                    <text x={m.x + 8} y={296} style={css({ fill: FG, fontSize: 13, fontWeight: 800, fontFamily: 'var(--font-sans)' })}>{m.val}</text>
                </g>
            ))}

            <text x={210} y={308} textAnchor="middle"
                style={css({ fill: MUT, fontSize: 8, fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: 1.5 })}>
                INDUSTRIAL PROCESS · REAL-TIME SIMULATION
            </text>
        </svg>
    );
}

/* ════════════════════════════════════════════════════════════════════════════
   3 ▸ ELECTRICAL — Power distribution network with live waveform
   ════════════════════════════════════════════════════════════════════════════ */
function ElectricalVisual({ t }: { t: number }) {
    const dOff = -(t * 58) % 20;

    const nodes: { x: number; y: number; label: string; type: string }[] = [
        { x: 210, y: 46, label: 'GRID', type: 'source' },
        { x: 105, y: 128, label: '132 kV', type: 'sub' },
        { x: 315, y: 128, label: '132 kV', type: 'sub' },
        { x: 52, y: 216, label: '11 kV', type: 'dist' },
        { x: 152, y: 216, label: '11 kV', type: 'dist' },
        { x: 210, y: 216, label: 'SOLAR', type: 'solar' },
        { x: 268, y: 216, label: '11 kV', type: 'dist' },
        { x: 368, y: 216, label: '11 kV', type: 'dist' },
    ];

    const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [2, 7], [4, 5], [5, 6]];

    const waveBase = 258;
    const waveD = Array.from({ length: 90 }, (_, i) => {
        const x = 20 + i * (380 / 89);
        const y = waveBase + Math.sin((i / 89) * Math.PI * 4 - t * 4.5) * 14
            + Math.sin((i / 89) * Math.PI * 8 - t * 2.2) * 4;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    const r = (n: typeof nodes[0]) => n.type === 'source' ? 22 : n.type === 'sub' ? 17 : 12;

    return (
        <svg viewBox="0 0 420 308" className="w-full h-full">
            <defs>
                <filter id="ev-glow">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* lines */}
            {edges.map(([fi, ti], i) => {
                const f = nodes[fi], to = nodes[ti];
                return (
                    <g key={i}>
                        <line x1={f.x} y1={f.y} x2={to.x} y2={to.y}
                            style={css({ stroke: BD, strokeWidth: 5, strokeLinecap: 'round' })} />
                        <line x1={f.x} y1={f.y} x2={to.x} y2={to.y}
                            style={css({
                                stroke: P, strokeWidth: fi >= 3 ? 2 : 3, strokeLinecap: 'round',
                                strokeDasharray: '10 10', strokeDashoffset: dOff + i * 5, opacity: '.85'
                            })} />
                    </g>
                );
            })}

            {/* nodes */}
            {nodes.map((n, i) => {
                const R = r(n);
                const pulse = .42 + Math.sin(t * 3 + i * .8) * .3;
                return (
                    <g key={i}>
                        <circle cx={n.x} cy={n.y} r={R * 2.5}
                            style={css({ fill: P, opacity: .04 + pulse * .04 })} />
                        <circle cx={n.x} cy={n.y} r={R + 5 + pulse * 5}
                            style={css({ fill: 'none', stroke: P, strokeWidth: 1, opacity: .14 + pulse * .2 })} />
                        <circle cx={n.x} cy={n.y} r={R}
                            style={css({ fill: BG, stroke: P, strokeWidth: n.type === 'source' ? 3 : 2 })} />
                        {n.type === 'source' && (
                            <text x={n.x} y={n.y + 6} textAnchor="middle"
                                style={css({ fontSize: 16, fill: P })}>⚡</text>
                        )}
                        {n.type === 'solar' && (
                            <>
                                <rect x={n.x - 8} y={n.y - 6} width={7} height={12} rx="1"
                                    style={css({ fill: P, opacity: '.75' })} />
                                <rect x={n.x + 1} y={n.y - 6} width={7} height={12} rx="1"
                                    style={css({ fill: P, opacity: '.5' })} />
                            </>
                        )}
                        <text x={n.x} y={n.y + R + 13} textAnchor="middle"
                            style={css({ fill: P, fontSize: 7, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>
                            {n.label}
                        </text>
                    </g>
                );
            })}

            {/* waveform panel */}
            <rect x={16} y={245} width={388} height={48} rx="7"
                style={css({ fill: BG, stroke: BD, strokeWidth: 1 })} />
            <text x={24} y={260}
                style={css({ fill: P, fontSize: 7.5, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>VOLTAGE</text>
            <text x={396} y={260} textAnchor="end"
                style={css({ fill: FG, fontSize: 7.5, fontWeight: 800, fontFamily: 'var(--font-sans)' })}>
                {(230.4 + Math.sin(t * .4) * 1.8).toFixed(1)} V
            </text>
            <path d={waveD}
                style={css({ stroke: P, strokeWidth: 1.5, fill: 'none', opacity: '.85' })} />
            <text x={24} y={285}
                style={css({ fill: MUT, fontSize: 7, fontFamily: 'var(--font-sans)' })}>
                FREQ: {(50.0 + Math.sin(t * .2) * .05).toFixed(2)} Hz
            </text>
            <text x={396} y={285} textAnchor="end"
                style={css({ fill: MUT, fontSize: 7, fontFamily: 'var(--font-sans)' })}>
                PF: {(.97 + Math.sin(t * .3) * .02).toFixed(2)}
            </text>

            <text x={210} y={308} textAnchor="middle"
                style={css({ fill: MUT, fontSize: 8, fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: 1.5 })}>
                POWER DISTRIBUTION NETWORK · LIVE MONITORING
            </text>
        </svg>
    );
}

/* ════════════════════════════════════════════════════════════════════════════
   4 ▸ PLANNING — Animated Gantt/CPM with live progress cursor
   ════════════════════════════════════════════════════════════════════════════ */
function PlanningVisual({ t }: { t: number }) {
    const CYCLE = 14;
    const prog = (t % CYCLE) / CYCLE;
    const TOTAL = 16;
    const gX = 106, gW = 302, gH = 162, gY = 38;
    const wPx = gW / TOTAL;

    const rows = [
        { label: 'Site Survey', start: 0, dur: 1, crit: false },
        { label: 'Feasibility', start: 1, dur: 2, crit: false },
        { label: 'Concept Design', start: 2, dur: 3, crit: true },
        { label: 'Approvals', start: 3, dur: 3, crit: false },
        { label: 'Procurement', start: 4, dur: 4, crit: false },
        { label: 'Construction', start: 6, dur: 8, crit: true },
        { label: 'Commissioning', start: 14, dur: 2, crit: true },
    ];
    const RH = gH / rows.length;
    const now = prog * TOTAL;
    const cX = gX + now * wPx;

    const netNodes = [
        { x: 50, y: 242, label: 'START', done: true },
        { x: 120, y: 228, label: 'Survey', done: prog > .06 },
        { x: 120, y: 258, label: 'Feasib', done: prog > .13 },
        { x: 200, y: 242, label: 'Design', done: prog > .3 },
        { x: 275, y: 228, label: 'Build', done: prog > .68 },
        { x: 275, y: 258, label: 'Procu', done: prog > .55 },
        { x: 360, y: 242, label: 'DONE', done: prog > .95 },
    ];
    const netEdges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]];

    return (
        <svg viewBox="0 0 420 310" className="w-full h-full">

            {/* Gantt background */}
            <rect x={gX} y={gY} width={gW} height={gH} rx="6"
                style={css({ fill: BG, stroke: BD, strokeWidth: 1 })} />

            {/* alternating row shading */}
            {rows.map((_, i) => (
                <rect key={i} x={gX} y={gY + i * RH} width={gW} height={RH}
                    style={css({ fill: i % 2 ? SEC : 'transparent', opacity: '.35' })} />
            ))}

            {/* vertical week grid */}
            {Array.from({ length: TOTAL + 1 }, (_, i) => (
                <line key={i} x1={gX + i * wPx} y1={gY} x2={gX + i * wPx} y2={gY + gH}
                    style={css({ stroke: BD, strokeWidth: 1, opacity: i % 4 === 0 ? .7 : .25 })} />
            ))}

            {/* week labels */}
            {Array.from({ length: 5 }, (_, i) => (
                <text key={i} x={gX + i * 4 * wPx + 2 * wPx} y={gY - 5} textAnchor="middle"
                    style={css({ fill: MUT, fontSize: 7, fontFamily: 'var(--font-sans)' })}>
                    W{i * 4 + 1}
                </text>
            ))}

            {/* bars */}
            {rows.map((row, i) => {
                const bX = gX + row.start * wPx;
                const bW = row.dur * wPx;
                const bY = gY + i * RH + 4;
                const bH = RH - 8;
                const done = Math.min(1, Math.max(0, (now - row.start) / row.dur));
                return (
                    <g key={i}>
                        <text x={gX - 5} y={bY + bH / 2 + 4} textAnchor="end"
                            style={css({ fill: MUT, fontSize: 7.5, fontFamily: 'var(--font-sans)' })}>
                            {row.label}
                        </text>
                        <rect x={bX + 1} y={bY} width={bW - 2} height={bH} rx="3"
                            style={css({ fill: SEC, opacity: '.9' })} />
                        <rect x={bX + 1} y={bY} width={(bW - 2) * done} height={bH} rx="3"
                            style={css({ fill: P, opacity: row.crit ? 1 : .62 })} />
                        {row.crit && (
                            <rect x={bX + 1} y={bY + bH - 2} width={bW - 2} height={2} rx="1"
                                style={css({ fill: P })} />
                        )}
                        {done > .3 && (
                            <text x={bX + (bW - 2) * done - 4} y={bY + bH / 2 + 4} textAnchor="end"
                                style={css({ fill: 'white', fontSize: 7, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>
                                {Math.round(done * 100)}%
                            </text>
                        )}
                    </g>
                );
            })}

            {/* TODAY cursor */}
            <line x1={cX} y1={gY - 9} x2={cX} y2={gY + gH + 2}
                style={css({ stroke: P, strokeWidth: 2, strokeDasharray: '4 2' })} />
            <polygon points={`${cX - 5},${gY - 9} ${cX + 5},${gY - 9} ${cX},${gY - 2}`}
                style={css({ fill: P })} />
            <text x={cX + 5} y={gY - 11}
                style={css({ fill: P, fontSize: 7, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>TODAY</text>

            {/* CPM network */}
            {netEdges.map(([fi, ti], i) => {
                const f = netNodes[fi], to = netNodes[ti];
                return (
                    <line key={i} x1={f.x} y1={f.y} x2={to.x} y2={to.y}
                        style={css({
                            stroke: f.done && to.done ? P : BD,
                            strokeWidth: f.done && to.done ? 2 : 1.5,
                            opacity: f.done && to.done ? .9 : .35
                        })} />
                );
            })}
            {netNodes.map((n, i) => (
                <g key={i}>
                    <circle cx={n.x} cy={n.y} r={11}
                        style={css({ fill: n.done ? P : BG, stroke: P, strokeWidth: 2 })} />
                    <text x={n.x} y={n.y + 4} textAnchor="middle"
                        style={css({ fill: n.done ? 'white' : MUT, fontSize: 6.5, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>
                        {n.label.slice(0, 5)}
                    </text>
                </g>
            ))}
            <text x={20} y={236}
                style={css({ fill: P, fontSize: 7, fontWeight: 700, fontFamily: 'var(--font-sans)', letterSpacing: .5 })}>CPM NETWORK</text>

            {/* stat pills */}
            {[
                { x: 6, label: 'PROGRESS', val: `${Math.round(prog * 100)}%` },
                { x: 112, label: 'WKS LEFT', val: `${Math.round((1 - prog) * TOTAL)}` },
                { x: 218, label: 'BUDGET', val: `R${(4.2 + prog * 2.1).toFixed(1)}M` },
                { x: 322, label: 'STATUS', val: 'ON TRCK' },
            ].map((m, i) => (
                <g key={i}>
                    <rect x={m.x} y={274} width={100} height={32} rx="6"
                        style={css({ fill: BG, stroke: BD, strokeWidth: 1 })} />
                    <text x={m.x + 7} y={287}
                        style={css({ fill: P, fontSize: 7, fontWeight: 700, fontFamily: 'var(--font-sans)' })}>{m.label}</text>
                    <text x={m.x + 7} y={299}
                        style={css({ fill: FG, fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-sans)' })}>{m.val}</text>
                </g>
            ))}

            <text x={210} y={310} textAnchor="middle"
                style={css({ fill: MUT, fontSize: 8, fontWeight: 600, fontFamily: 'var(--font-sans)', letterSpacing: 1.5 })}>
                PROJECT SCHEDULE · CRITICAL PATH METHOD
            </text>
        </svg>
    );
}

/* ════════════════════════════════════════════════════════════════════════════
   Export — one RAF loop, passes time to the active visual
   ════════════════════════════════════════════════════════════════════════════ */
const VISUALS = [CivilVisual, ProcessVisual, ElectricalVisual, PlanningVisual];

export function HeroVisual({ index, isAnimating }: { index: number; isAnimating: boolean }) {
    const t = useTime();
    const Visual = VISUALS[index % VISUALS.length];

    return (
        <div
            className={`w-full h-full transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{ minHeight: 340 }}
        >
            <Visual t={t} />
        </div>
    );
}
