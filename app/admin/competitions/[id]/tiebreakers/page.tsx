'use client';
import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const fetcher = (u:string)=> fetch(u).then(r=>r.json());

export default function TieBreakers({ params }: { params: { id: string }}) {
  const { data: teams, mutate } = useSWR(`/api/competitions/${params.id}/teams`, fetcher);
  const [title, setTitle] = React.useState<'Memorial Scores'|'Researcher Test'>('Memorial Scores');
  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Enter Tie-Breaker Scores</Typography>
      <Box sx={{ mb: 2 }}>
        <Button onClick={()=>setTitle(title==='Memorial Scores'?'Researcher Test':'Memorial Scores')}>
          Toggle Title: {title}
        </Button>
      </Box>
      <Box sx={{ display: 'grid', gap: 2, maxWidth: 600 }}>
        {teams?.map((t:any)=>(
          <Box key={t._id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography sx={{ width: 120 }}>{t.teamCode}</Typography>
            <TextField type="number" size="small" onBlur={async (e)=>{
              await fetch(`/api/teams/${t._id}/tiebreaker`, { method: 'PUT', body: JSON.stringify({ 
                field: title==='Memorial Scores'?'memorialScore':'researcherTest', value: Number(e.target.value) 
              })});
              mutate();
            }} />
          </Box>
        ))}
      </Box>
    </DashboardShell>
  )
}
