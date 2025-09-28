import DashboardShell from "@/components/DashboardShell";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Grid from '@mui/material/Grid';


export default function Home() {
  return (
    <DashboardShell>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Welcome to MCMS — Blackstone Edition</Typography>
      <Typography sx={{ mb: 3 }}>A professional, modern moot court management system inspired by LinkedIn’s clean design.</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Admin Portal</Typography>
              <Typography sx={{ mb: 2 }}>Create competitions, manage teams, assign courts, and view live data.</Typography>
              <Button component={Link} href="/admin" variant="contained">Go to Admin</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Judge Portal</Typography>
              <Typography sx={{ mb: 2 }}>Session-based login to submit digital scoresheets.</Typography>
              <Button component={Link} href="/judge" variant="contained">Go to Judge</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Court Manager Portal</Typography>
              <Typography sx={{ mb: 2 }}>Time allocation & live timer with automated submission.</Typography>
              <Button component={Link} href="/manager" variant="contained">Go to Manager</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardShell>
  );
}
