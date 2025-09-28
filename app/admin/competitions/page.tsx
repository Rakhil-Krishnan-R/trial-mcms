import { getSession } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { Competition } from "@/lib/models";
import DashboardShell from "@/components/DashboardShell";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "next/link";

export default async function Competitions() {
  const session = await getSession();
  if (!session?.userId) return null;
  await dbConnect();
  const items = await Competition.find({ adminId: session.userId }).sort({ createdAt: -1 }).lean();
  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>My Competitions</Typography>
      <Button href="/admin/competitions/new" variant="contained" sx={{ mb: 2 }}>Create Competition</Button>
      <Grid container spacing={2}>
        {items.map((c: any) => (
          <Grid key={c._id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.name}</Typography>
                <Typography variant="body2" color="text.secondary">{c.collegeName}</Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} href={`/admin/competitions/${c._id}`}>Go to Competition Dashboard</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardShell>
  );
}
