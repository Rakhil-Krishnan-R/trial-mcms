'use client';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
};

export default function ShakeTimer({ totalSeconds, onDone }: { totalSeconds: number, onDone: () => void }) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!running) { if (ref.current) cancelAnimationFrame(ref.current); return; }
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setRemaining((prev) => {
        const next = Math.max(0, prev - dt);
        if (next === 0) {
          setRunning(false);
          onDone();
        }
        return next;
      });
      ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [running, onDone]);

  const shake = remaining <= 10 || remaining <= 120 && Math.floor(remaining) % 60 === 0 || remaining <= 300 && Math.floor(remaining) % 60 === 0;
  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="h2" className={shake ? 'shake' : ''} sx={{ fontWeight: 800 }}>{fmt(Math.ceil(remaining))}</Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start'}</Button>
        <Button variant="outlined" onClick={() => { setRemaining(totalSeconds); setRunning(false); }}>Reset</Button>
      </Box>
      <style jsx global>{`
        .shake { animation: wiggle 0.5s ease-in-out infinite; }
        @keyframes wiggle {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </Box>
  )
}
