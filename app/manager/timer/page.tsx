'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ShakeTimer from '@/components/ShakeTimer';

export default function Timer() {
  const sp = useSearchParams();
  const courtId = sp.get('courtId');
  const [alloc, setAlloc] = useState<any>({ totalTimePerTeam: 900, petitioner:{speaker1:300,speaker2:300,rebuttal:300}, respondent:{speaker1:300,speaker2:300,rebuttal:300} });
  const [phase, setPhase] = useState<string>('alloc');
  const [queue, setQueue] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  const start = async () => {
    const q = ['Petitioner - Speaker 1','Petitioner - Speaker 2','Petitioner - Rebuttal','Respondent - Speaker 1','Respondent - Speaker 2','Respondent - Rebuttal'];
    setQueue(q); setIdx(0); setPhase('timer');
  };

  const current = queue[idx];
  const seconds = (()=>{
    if (!current) return 0;
    const [team, role, extra] = current.split(' - ');
    const key = (role || '').toLowerCase();
    const t = alloc[team.toLowerCase()]?.[key] || alloc[team.toLowerCase()]?.[extra?.toLowerCase()||'rebuttal'] || 0;
    return Number(t);
  })();

  const finishSpeaker = () => {
    if (idx+1 < queue.length) setIdx(idx+1);
    else setPhase('done');
  };

  const submit = async () => {
    await fetch('/api/manager/submit', { method: 'POST', body: JSON.stringify({ courtId, allocations: alloc }) });
    window.location.href = '/manager';
  };

  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Live Timer Dashboard</Typography>
      {phase==='alloc' && (
        <Box sx={{ display: 'grid', gap: 2, maxWidth: 720 }}>
          <TextField type="number" label="Total Time Per Team (sec)" value={alloc.totalTimePerTeam} onChange={e=>setAlloc({...alloc, totalTimePerTeam:Number(e.target.value)})} />
          <Typography variant="h6">Petitioner</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField type="number" label="Speaker 1 (sec)" value={alloc.petitioner.speaker1} onChange={e=>setAlloc({...alloc, petitioner:{...alloc.petitioner, speaker1:Number(e.target.value)}})} />
            <TextField type="number" label="Speaker 2 (sec)" value={alloc.petitioner.speaker2} onChange={e=>setAlloc({...alloc, petitioner:{...alloc.petitioner, speaker2:Number(e.target.value)}})} />
            <TextField type="number" label="Rebuttal (sec)" value={alloc.petitioner.rebuttal} onChange={e=>setAlloc({...alloc, petitioner:{...alloc.petitioner, rebuttal:Number(e.target.value)}})} />
          </Box>
          <Typography variant="h6">Respondent</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField type="number" label="Speaker 1 (sec)" value={alloc.respondent.speaker1} onChange={e=>setAlloc({...alloc, respondent:{...alloc.respondent, speaker1:Number(e.target.value)}})} />
            <TextField type="number" label="Speaker 2 (sec)" value={alloc.respondent.speaker2} onChange={e=>setAlloc({...alloc, respondent:{...alloc.respondent, speaker2:Number(e.target.value)}})} />
            <TextField type="number" label="Rebuttal (sec)" value={alloc.respondent.rebuttal} onChange={e=>setAlloc({...alloc, respondent:{...alloc.respondent, rebuttal:Number(e.target.value)}})} />
          </Box>
          <Button variant="contained" onClick={start}>Start Timer</Button>
        </Box>
      )}
      {phase==='timer' && (
        <Box sx={{ textAlign:'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Now Speaking: {current}</Typography>
          <ShakeTimer totalSeconds={seconds} onDone={finishSpeaker} />
          <Box sx={{ display: 'flex', gap: 2, justifyContent:'center' }}>
            <Button variant="contained" onClick={finishSpeaker}>Move to Next Speaker</Button>
          </Box>
        </Box>
      )}
      {phase==='done' && (
        <Box sx={{ textAlign:'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>All speakers completed.</Typography>
          <Button variant="contained" onClick={submit}>Finish & Submit Times</Button>
        </Box>
      )}
    </DashboardShell>
  )
}
