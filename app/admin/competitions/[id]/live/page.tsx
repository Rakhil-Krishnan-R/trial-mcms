'use client';
import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import PDFButton from '@/components/PDFButton';
import { useState } from 'react';

const fetcher = (u:string)=> fetch(u).then(r=>r.json());

export default function Live({ params }: { params: { id: string }}) {
  const { data: meta } = useSWR(`/api/competitions/${params.id}`, fetcher);
  const [round, setRound] = useState<string>('');
  const { data: courts } = useSWR(round ? `/api/live?competitionId=${params.id}&round=${encodeURIComponent(round)}` : null, fetcher, { refreshInterval: 3000 });
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<any>(null);

  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Live Court Data</Typography>
      <TextField select label="Round" value={round} onChange={e=>setRound(e.target.value)} sx={{ mb: 2 }}>
        {meta?.rounds?.filter((r:any)=>r.enabled).map((r:any)=>(<MenuItem key={r.name} value={r.name}>{r.name}</MenuItem>))}
      </TextField>
      <Box sx={{ display: 'grid', gap: 2 }}>
        {courts?.map((c:any)=> {
          const statuses = [...(c.judges||[]).map((j:any)=>j.status), c.courtManager?.status].filter(Boolean);
          const canView = statuses.every((s:string)=> s==='Completed');
          return (
            <Card key={c._id}>
              <CardContent>
                <Typography variant="h6">Court #{c.courtNumber} — {c.round}</Typography>
                <Typography>Judges: {c.judges?.map((j:any)=> `${j.name} (${j.status})`).join(' • ')}</Typography>
                <Typography>Manager: {c.courtManager?.name} ({c.courtManager?.status})</Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button disabled={!canView} onClick={async ()=>{ 
                    const r = await fetch(`/api/reports?courtId=${c._id}&team=Petitioner`); setReport(await r.json()); setOpen(true);
                  }}>View Petitioner Score</Button>
                  <Button disabled={!canView} onClick={async ()=>{ 
                    const r = await fetch(`/api/reports?courtId=${c._id}&team=Respondent`); setReport(await r.json()); setOpen(true);
                  }}>View Respondent Score</Button>
                  <Button disabled={!canView} onClick={async ()=>{ 
                    const r = await fetch(`/api/reports?courtId=${c._id}`); setReport(await r.json()); setOpen(true);
                  }}>View Both Scores</Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="md">
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Scoresheet & Time Log</Typography>
          <pre style={{ maxHeight: 400, overflow: 'auto', background:'#f6f8fa', padding: 12, borderRadius: 8 }}>{JSON.stringify(report, null, 2)}</pre>
          <PDFButton filename="scoresheet.pdf" data={report?.rows||[]} columns={report?.columns||[]} />
        </Box>
      </Dialog>
    </DashboardShell>
  )
}
