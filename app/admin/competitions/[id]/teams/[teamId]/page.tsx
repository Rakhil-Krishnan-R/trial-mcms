'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function EditTeam({ params }: { params: { id: string, teamId: string } }) {
  const [team, setTeam] = useState<any>(null);
  const [s1, setS1] = useState<any>({ name: '', gender: 'Male', role: 'Speaker 1' });
  const [s2, setS2] = useState<any>({ name: '', gender: 'Female', role: 'Speaker 2' });
  useEffect(()=>{
    (async ()=>{
      const r = await fetch(`/api/teams/${params.teamId}`);
      const t = await r.json();
      setTeam(t);
      const sp1 = t.speakers?.find((x:any)=>x.role==='Speaker 1')||s1;
      const sp2 = t.speakers?.find((x:any)=>x.role==='Speaker 2')||s2;
      setS1(sp1); setS2(sp2);
    })();
  },[params.teamId]);

  const save = async () => {
    await fetch(`/api/teams/${params.teamId}`, { method: 'PUT', body: JSON.stringify({ speakers: [s1, s2] }) });
    history.back();
  };

  if (!team) return <DashboardShell><Typography>Loading...</Typography></DashboardShell>;
  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Edit Team — {team.teamCode}</Typography>
      <Box sx={{ display: 'grid', gap: 2, maxWidth: 600 }}>
        <Typography variant="h6">Speaker 1</Typography>
        <TextField label="Name" value={s1.name} onChange={e=>setS1({...s1, name:e.target.value})} />
        <RadioGroup row value={s1.gender} onChange={e=>setS1({...s1, gender:e.target.value})}>
          <FormControlLabel value="Male" control={<Radio/>} label="Male"/>
          <FormControlLabel value="Female" control={<Radio/>} label="Female"/>
        </RadioGroup>
        <Typography variant="h6">Speaker 2</Typography>
        <TextField label="Name" value={s2.name} onChange={e=>setS2({...s2, name:e.target.value})} />
        <RadioGroup row value={s2.gender} onChange={e=>setS2({...s2, gender:e.target.value})}>
          <FormControlLabel value="Male" control={<Radio/>} label="Male"/>
          <FormControlLabel value="Female" control={<Radio/>} label="Female"/>
        </RadioGroup>
        <Button variant="contained" onClick={save}>Save</Button>
      </Box>
    </DashboardShell>
  );
}
