import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * RegulaGuard AI – animated startup splash / loading screen.
 * Shows the brand logo with orbiting rings, a scanning beam, floating
 * particles, rotating status messages and a live progress bar.
 */

const STATUS_STEPS = [
  'Initializing secure environment',
  'Loading regulatory policy library',
  'Calibrating fraud & AML engines',
  'Syncing credit & liquidity models',
  'Verifying audit trail integrity',
  'Compliance engine ready',
];

const TOTAL_MS = 4200;

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  // Smooth eased progress counter
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / TOTAL_MS, 1);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 450);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stepIndex = Math.min(
    STATUS_STEPS.length - 1,
    Math.floor((progress / 100) * STATUS_STEPS.length)
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        left: (i * 53) % 100,
        size: 2 + (i % 4),
        delay: (i % 12) * 0.45,
        duration: 6 + (i % 7),
        opacity: 0.25 + (i % 5) * 0.12,
      })),
    []
  );

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#02040c] cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onClick={() => setVisible(false)}
          title="Click to skip"
        >
          {/* Animated grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.35) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(circle at center, black 10%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 70%)',
            }}
          />

          {/* Ambient glows */}
          <motion.div
            className="absolute w-[620px] h-[620px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.45), transparent 70%)' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[380px] h-[380px] rounded-full blur-[100px] translate-x-40 translate-y-24"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)' }}
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Rising particles */}
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute bottom-[-10px] rounded-full bg-sky-400"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                boxShadow: '0 0 10px rgba(56,189,248,0.9)',
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: '-105vh', opacity: [0, p.opacity, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* Logo + orbit rings */}
          <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
            {/* Outer dashed ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-sky-500/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
            {/* Orbiting comet ring */}
            <motion.div
              className="absolute inset-3 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(56,189,248,0.0) 250deg, rgba(56,189,248,0.95) 355deg, transparent 360deg)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            />
            {/* Counter-rotating inner ring */}
            <motion.div
              className="absolute inset-10 rounded-full"
              style={{
                background:
                  'conic-gradient(from 90deg, transparent 0deg, transparent 280deg, rgba(139,92,246,0.9) 350deg, transparent 360deg)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Pulse waves */}
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-12 rounded-full border border-blue-400/50"
                initial={{ scale: 0.7, opacity: 0.7 }}
                animate={{ scale: 1.35, opacity: 0 }}
                transition={{ duration: 2.4, delay: i * 1.2, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}

            {/* Logo */}
            <motion.div
              className="relative w-[78%] h-[78%] overflow-hidden"
              initial={{ scale: 0.4, opacity: 0, rotateY: -90, filter: 'blur(14px)' }}
              animate={{ scale: 1, opacity: 1, rotateY: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                perspective: 800,
                maskImage: 'radial-gradient(circle at center, black 55%, transparent 74%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 55%, transparent 74%)',
              }}
            >
              <motion.img
                src="/logo.png"
                alt="RegulaGuard AI"
                className="w-full h-full object-contain select-none"
                draggable={false}
                animate={{
                  filter: [
                    'drop-shadow(0 0 10px rgba(59,130,246,0.5))',
                    'drop-shadow(0 0 28px rgba(56,189,248,0.95))',
                    'drop-shadow(0 0 10px rgba(59,130,246,0.5))',
                  ],
                }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Scanning beam */}
              <motion.div
                className="absolute left-0 right-0 h-[3px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(125,211,252,1), transparent)',
                  boxShadow: '0 0 24px 8px rgba(56,189,248,0.55)',
                }}
                initial={{ top: '8%' }}
                animate={{ top: ['8%', '78%', '8%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
              />
            </motion.div>
          </div>

          {/* Status + progress */}
          <motion.div
            className="relative mt-4 w-[300px] sm:w-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex items-end justify-between mb-2 font-mono text-[11px] tracking-wider">
              <div className="h-4 overflow-hidden text-sky-300/90 uppercase">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stepIndex}
                    className="block"
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {STATUS_STEPS[stepIndex]}
                    <span className="animate-pulse">...</span>
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-white font-semibold tabular-nums">{progress}%</span>
            </div>

            <div className="relative h-[6px] rounded-full bg-slate-800/80 overflow-hidden ring-1 ring-sky-500/20">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #2563eb, #38bdf8, #8b5cf6)',
                  boxShadow: '0 0 16px rgba(56,189,248,0.9)',
                }}
              />
              {/* shimmer */}
              <motion.div
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ['-100px', '460px'] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <p className="mt-5 text-center text-[10px] uppercase tracking-[0.35em] text-slate-500">
              Banking Risk · Fraud · Compliance Copilot
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
