import DashboardShell from "@/components/DashboardShell";
import { dbConnect } from "@/lib/db";
import { Competition, Team } from "@/lib/models";
import { getSession } from "@/lib/auth";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Link from "next/link";

export default async function TeamManagement({ params }: { params: { id: string } }) {
  await dbConnect();
  const comp = await Competition.findById(params.id).lean();
  const teams = await Team.find({ competitionId: params.id }).sort({ teamCode: 1 }).lean();
  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Team Management — {comp?.name}</Typography>
      <Button href={`/api/teams/autogen?competitionId=${params.id}`} variant="contained" sx={{ mb: 2 }}>Auto-generate Teams</Button>
      <Grid container spacing={2}>
        {teams.map((t: any) => (
          <Grid key={t._id} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{t.teamCode}</Typography>
                <Typography variant="body2" color="text.secondary">{t.speakers?.map((s: any) => `${s.role}: ${s.name || '-'} (${s.gender || '-'})`).join(' • ') || 'No speakers set'}</Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} href={`/admin/competitions/${params.id}/teams/${t._id}`}>Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardShell>
  );
}
