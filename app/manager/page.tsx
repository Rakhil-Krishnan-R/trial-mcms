'use client';
import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';

const fetcher = (u:string)=> fetch(u).then(r=>r.json());

export default function ManagerLogin() {
  const { data: comps } = useSWR('/api/competitions', fetcher);
  const [compId, setCompId] = useState('');
  const { data: courts } = useSWR(compId? `/api/courts?competitionId=${compId}` : null, fetcher);
  const [courtId, setCourtId] = useState('');
  const [password, setPassword] = useState('');
  const [meta, setMeta] = useState<any>(null);

  const onSelectCourt = async (id: string) => {
    setCourtId(id);
    const r = await fetch(`/api/courts/${id}`); const data = await r.json(); setMeta(data);
  };

  const login = async () => {
    const res = await fetch('/api/manager/login', { method: 'POST', body: JSON.stringify({ courtId, password }) });
    if (res.ok) window.location.href = `/manager/timer?courtId=${courtId}`;
    else alert('Login failed');
  };

  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Court Manager — Session Login</Typography>
      <Box sx={{ display: 'grid', gap: 2, maxWidth: 720 }}>
        <TextField select label="Competition" value={compId} onChange={e=>setCompId(e.target.value)}>
          {comps?.map((c:any)=>(<MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>))}
        </TextField>
        <TextField select label="Court Number" value={courtId} onChange={e=>onSelectCourt(e.target.value)}>
          {courts?.map((c:any)=>(<MenuItem key={c._id} value={c._id}>Court #{c.courtNumber}</MenuItem>))}
        </TextField>
        {meta && (<>
          <TextField label="Round" value={meta.round} disabled />
          <Typography>Manager: {meta.courtManager?.name}</Typography>
          <TextField type="password" label="Court Room Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button variant="contained" onClick={login}>Login</Button>
        </>)}
      </Box>
    </DashboardShell>
  );
}
