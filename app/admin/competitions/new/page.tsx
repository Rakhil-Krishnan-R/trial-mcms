'use client';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useMemo } from 'react';

export default function NewCompetition() {
  const [form, setForm] = useState({
    name: '', collegeName: '', startDate: '', endDate: '', numberOfTeams: 0, numberOfCourtRooms: 0, teamPrefix: 'TEAM',
  });
  const [rounds, setRounds] = useState([{ name: 'Prelims 1', enabled: true }, { name: 'Prelims 2', enabled: false }]);
  const [rubric, setRubric] = useState([{ criterion: 'Knowledge of Law', maxMarks: 10 }]);
  const total = useMemo(()=> rubric.reduce((a,r)=>a+Number(r.maxMarks||0),0), [rubric]);

  const submit = async () => {
    const res = await fetch('/api/competitions', { method: 'POST', body: JSON.stringify({ ...form, rounds, scoringRubric: rubric, totalMarks: total }) });
    if (res.ok) window.location.href = '/admin/competitions';
    else alert('Failed to create');
  };

  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Create Competition</Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <TextField label="Competition Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <TextField label="College Name" value={form.collegeName} onChange={e=>setForm({...form, collegeName:e.target.value})} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField type="date" label="Start Date" InputLabelProps={{ shrink: true }} value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})}/>
          <TextField type="date" label="End Date" InputLabelProps={{ shrink: true }} value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})}/>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField type="number" label="Number of Teams" value={form.numberOfTeams} onChange={e=>setForm({...form, numberOfTeams:Number(e.target.value)})}/>
          <TextField type="number" label="Number of Court Rooms" value={form.numberOfCourtRooms} onChange={e=>setForm({...form, numberOfCourtRooms:Number(e.target.value)})}/>
          <TextField label="Team Prefix" value={form.teamPrefix} onChange={e=>setForm({...form, teamPrefix:e.target.value})}/>
        </Box>
        <Typography variant="h6">Rounds</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {rounds.map((r,i)=> (
            <FormControlLabel key={i} control={<Checkbox checked={r.enabled} onChange={e=>{
              const nr=[...rounds]; nr[i].enabled=e.target.checked; setRounds(nr);
            }}/>} label={r.name} />
          ))}
        </Box>
        <Typography variant="h6">Scoring Rubric (Total: {total})</Typography>
        {rubric.map((r,i)=> (
          <Box key={i} sx={{ display: 'flex', gap: 2, alignItems:'center' }}>
            <TextField label="Criterion" value={r.criterion} onChange={e=>{
              const nr=[...rubric]; nr[i].criterion=e.target.value; setRubric(nr);
            }}/>
            <TextField type="number" label="Max Marks" value={r.maxMarks} onChange={e=>{
              const nr=[...rubric]; nr[i].maxMarks=Number(e.target.value); setRubric(nr);
            }}/>
            <IconButton onClick={()=> setRubric(rubric.filter((_,x)=>x!==i))}><DeleteIcon/></IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon/>} onClick={()=> setRubric([...rubric, { criterion:'', maxMarks: 0 }])}>Add Criterion</Button>
        <Button variant="contained" onClick={submit}>Create</Button>
      </Box>
    </DashboardShell>
  );
}
