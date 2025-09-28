'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';

export default function ScoreSheet() {
  const sp = useSearchParams();
  const courtId = sp.get('courtId'); const judgeId = sp.get('judgeId');
  const [meta, setMeta] = useState<any>(null);
  const [rubric, setRubric] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [scores, setScores] = useState<any>({ Petitioner: [], Respondent: [] });
  const [confirm, setConfirm] = useState<any>(null);

  useEffect(()=>{
    (async ()=>{
      const r = await fetch(`/api/judge/meta?courtId=${courtId}&judgeId=${judgeId}`);
      const data = await r.json(); setMeta(data);
      setRubric(data.scoringRubric||[]);
    })();
  },[courtId, judgeId]);

  const handleScore = (team:string, speakerName: string, criterion: string, value: number, max: number) => {
    if (value <= max/2) setConfirm({ team, speakerName, criterion, value });
    setScores((prev:any)=> {
      const arr = prev[team] || [];
      const idx = arr.findIndex((x:any)=> x.speakerName===speakerName && x.criterion===criterion);
      const next = [...arr];
      if (idx>=0) next[idx] = { speakerName, criterion, score: value };
      else next.push({ speakerName, criterion, score: value });
      return { ...prev, [team]: next };
    });
  };

  const submit = async () => {
    await fetch('/api/judge/submit', { method: 'POST', body: JSON.stringify({ courtId, judgeId, scores }) });
    window.location.href = '/judge/thanks';
  };

  if (!meta) return <DashboardShell><Typography>Loading...</Typography></DashboardShell>;
  const team = page===0?'Petitioner':'Respondent';
  const speakers = page===0? meta.petitionerSpeakers : meta.respondentSpeakers;
  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>Digital Scoresheet</Typography>
      <Typography sx={{ mb: 2 }}>{meta.competition?.name} • Court #{meta.court?.courtNumber} • {meta.court?.round}</Typography>
      <Typography sx={{ mb: 2 }}>{team} — {speakers.map((s:any)=>`${s.role}: ${s.name} (${s.gender})`).join(' • ')}</Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        {speakers.map((spk:any)=> (
          <Box key={spk.role} sx={{ border: '1px solid #e6e9ee', p: 2, borderRadius: 2 }}>
            <Typography variant="h6">{spk.role}: {spk.name}</Typography>
            {rubric.map((r:any)=> (
              <TextField key={r.criterion} select label={`${r.criterion} (Max ${r.maxMarks})`} onChange={(e)=>handleScore(team, spk.name, r.criterion, Number(e.target.value), r.maxMarks)} sx={{ mt: 1 }}>
                {Array.from({ length: r.maxMarks+1 }, (_,i)=>(<MenuItem key={i} value={i}>{i}</MenuItem>))}
              </TextField>
            ))}
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button disabled={page===0} onClick={()=>setPage(p=>p-1)}>Back</Button>
        <Button onClick={()=> page===0 ? setPage(1) : submit()} variant="contained">{page===0?'Next':'Submit'}</Button>
      </Box>
      <Dialog open={!!confirm} onClose={()=>setConfirm(null)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">Low Score Confirmation</Typography>
          <Typography sx={{ my: 1 }}>You selected {confirm?.value} which is ≤ 50% of the max for {confirm?.criterion}. Confirm?</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button onClick={()=>setConfirm(null)} variant="contained">Confirm</Button>
            <Button onClick={()=>setConfirm(null)} variant="outlined">Cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </DashboardShell>
  );
}
