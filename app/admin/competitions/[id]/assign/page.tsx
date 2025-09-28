'use client';
import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import React from 'react';

const fetcher = (u: string) => fetch(u).then(r => r.json());

export default function AssignCourts({ params }: { params: { id: string } }) {
  const { data: meta } = useSWR(`/api/competitions/${params.id}`, fetcher);
  const { data: teams } = useSWR(`/api/competitions/${params.id}/teams`, fetcher);
  const [form, setForm] = React.useState<any>({ judgesCount: 1 });
  const judges = Array.from({ length: Number(form.judgesCount || 1) });

  const submit = async () => {
    await fetch('/api/courts', { method: 'POST', body: JSON.stringify({ competitionId: params.id, ...form }) });
    alert('Court assigned');
  };

  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Assign Courts</Typography>
      <Box sx={{ display: 'grid', gap: 2, maxWidth: 720 }}>
        <TextField select label="Round" value={form.round || ''} onChange={e => setForm({ ...form, round: e.target.value })}>
          {meta?.rounds?.filter((r: any) => r.enabled).map((r: any) => (<MenuItem key={r.name} value={r.name}>{r.name}</MenuItem>))}
        </TextField>
        <TextField select label="Court Number" value={form.courtNumber || ''} onChange={e => setForm({ ...form, courtNumber: Number(e.target.value) })}>
          {Array.from({ length: meta?.numberOfCourtRooms || 0 }, (_, i) => (<MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>))}
        </TextField>
        <TextField select label="Petitioner Team" value={form.petitionerTeamId || ''} onChange={e => setForm({ ...form, petitionerTeamId: e.target.value })}>
          {teams?.map((t: any) => (<MenuItem key={t._id} value={t._id}>{t.teamCode}</MenuItem>))}
        </TextField>
        <TextField select label="Respondent Team" value={form.respondentTeamId || ''} onChange={e => setForm({ ...form, respondentTeamId: e.target.value })}>
          {teams?.map((t: any) => (<MenuItem key={t._id} value={t._id}>{t.teamCode}</MenuItem>))}
        </TextField>
        <TextField select label="Number of Judges" value={form.judgesCount || 1} onChange={e => setForm({ ...form, judgesCount: Number(e.target.value) })}>
          {Array.from({ length: 10 }, (_, i) => (<MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>))}
        </TextField>
        {judges.map((_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2 }}>
            <TextField label={`Judge ${i + 1} Citation`} onChange={e => setForm({ ...form, [`jCitation${i}`]: e.target.value })} />
            <TextField label={`Judge ${i + 1} Name`} onChange={e => setForm({ ...form, [`jName${i}`]: e.target.value })} />
          </Box>
        ))}
        <TextField label="Court Manager Name" onChange={e => setForm({ ...form, managerName: e.target.value })} />
        <TextField type="password" label="Court Room Password" onChange={e => setForm({ ...form, managerPassword: e.target.value })} />
        <Button variant="contained" onClick={submit}>Save</Button>
      </Box>
    </DashboardShell>
  )
}
