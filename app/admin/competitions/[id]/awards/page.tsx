'use client';
import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PDFButton from '@/components/PDFButton';
import { useState } from 'react';

const fetcher = (u:string)=> fetch(u).then(r=>r.json());

export default function Awards({ params }: { params: { id: string }}) {
  const [tab, setTab] = useState(0);
  const { data } = useSWR(`/api/results?competitionId=${params.id}`, fetcher, { refreshInterval: 5000 });

  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Awards & Results</Typography>
      <Tabs value={tab} onChange={(_,v)=>setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Team Leaderboard"/>
        <Tab label="Best Speaker — Male"/>
        <Tab label="Best Speaker — Female"/>
      </Tabs>
      {tab===0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Leaderboard</Typography>
            <PDFButton filename="leaderboard.pdf" />
          </Box>
          <Table id="leaderboard">
            <TableHead>
              <TableRow><TableCell>Rank</TableCell><TableCell>Team Code</TableCell><TableCell>Wins</TableCell><TableCell>Total Score</TableCell><TableCell>Tie</TableCell></TableRow>
            </TableHead>
            <TableBody>
              {data?.teamLeaderboard?.map((r:any)=>(
                <TableRow key={r.rank}>
                  <TableCell>{r.rank}</TableCell>
                  <TableCell>{r.teamCode}</TableCell>
                  <TableCell>{r.wins}</TableCell>
                  <TableCell>{r.totalScore}</TableCell>
                  <TableCell>{r.tie && <IconButton title="Apply tie-breakers" onClick={async ()=>{
                    await fetch(`/api/results/tiebreak?competitionId=${params.id}`, { method: 'POST' });
                  }}><EmojiEventsIcon/></IconButton>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      {tab===1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Best Speaker — Male</Typography>
            <PDFButton filename="best-speaker-male.pdf" />
          </Box>
          <Table><TableHead><TableRow><TableCell>Rank</TableCell><TableCell>Name</TableCell><TableCell>Team</TableCell><TableCell>Score</TableCell></TableRow></TableHead>
          <TableBody>{data?.bestSpeakers?.male?.map((s:any)=>(<TableRow key={s.rank}><TableCell>{s.rank}</TableCell><TableCell>{s.name}</TableCell><TableCell>{s.teamCode}</TableCell><TableCell>{s.score}</TableCell></TableRow>))}</TableBody></Table>
        </Box>
      )}
      {tab===2 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Best Speaker — Female</Typography>
            <PDFButton filename="best-speaker-female.pdf" />
          </Box>
          <Table><TableHead><TableRow><TableCell>Rank</TableCell><TableCell>Name</TableCell><TableCell>Team</TableCell><TableCell>Score</TableCell></TableRow></TableHead>
          <TableBody>{data?.bestSpeakers?.female?.map((s:any)=>(<TableRow key={s.rank}><TableCell>{s.rank}</TableCell><TableCell>{s.name}</TableCell><TableCell>{s.teamCode}</TableCell><TableCell>{s.score}</TableCell></TableRow>))}</TableBody></Table>
        </Box>
      )}
    </DashboardShell>
  )
}
