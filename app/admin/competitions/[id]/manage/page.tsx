'use client';
import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const fetcher = (u:string)=> fetch(u).then(r=>r.json());

export default function ManageCourts({ params }: { params: { id: string }}) {
  const { data: meta } = useSWR(`/api/competitions/${params.id}`, fetcher);
  const [round, setRound] = React.useState<string>('');
  const { data: courts, mutate } = useSWR(round ? `/api/courts?competitionId=${params.id}&round=${encodeURIComponent(round)}` : null, fetcher);

  const del = async (id: string) => {
    await fetch(`/api/courts/${id}`, { method: 'DELETE' });
    mutate();
  };

  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Manage Courts</Typography>
      <TextField select label="Round" value={round} onChange={e=>setRound(e.target.value)} sx={{ mb: 2 }}>
        {meta?.rounds?.filter((r:any)=>r.enabled).map((r:any)=>(<MenuItem key={r.name} value={r.name}>{r.name}</MenuItem>))}
      </TextField>
      <Box sx={{ display: 'grid', gap: 2 }}>
        {courts?.map((c:any)=> (
          <Card key={c._id}>
            <CardContent>
              <Typography variant="h6">Court #{c.courtNumber} — {c.round}</Typography>
              <Typography>Petitioner: {c.petitioner?.teamCode} | Respondent: {c.respondent?.teamCode}</Typography>
              <Typography>Judges: {c.judges?.map((j:any)=>j.name).join(', ')}</Typography>
              <Typography>Manager: {c.courtManager?.name}</Typography>
            </CardContent>
            <CardActions>
              <Button href={`/admin/competitions/${params.id}/assign?edit=${c._id}`}>Edit</Button>
              <Button color="error" onClick={()=>del(c._id)}>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </DashboardShell>
  )
}
