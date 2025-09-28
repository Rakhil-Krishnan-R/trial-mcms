import DashboardShell from "@/components/DashboardShell";
import Typography from "@mui/material/Typography";

export default function Thanks() {
  return (
    <DashboardShell>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Thank you!</Typography>
      <Typography>Your scoresheet has been submitted and your session is now locked.</Typography>
    </DashboardShell>
  )
}
