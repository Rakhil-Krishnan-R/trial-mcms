import DashboardShell from "@/components/DashboardShell";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Link from "next/link";

export default function CompDashboard({ params }: { params: { id: string } }) {
  const base = `/admin/competitions/${params.id}`;
  const tabs = [
    { label: 'Team Management', href: `${base}/teams` },
    { label: 'Tie-Breakers', href: `${base}/tiebreakers` },
    { label: 'Assign Courts', href: `${base}/assign` },
    { label: 'Manage Courts', href: `${base}/manage` },
    { label: 'Live Court Data', href: `${base}/live` },
    { label: 'Awards & Results', href: `${base}/awards` },
  ];
  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Competition Dashboard</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {tabs.map((t)=> <Tab key={t.href} component={Link as any} label={t.label} href={t.href} />)}
      </Box>
    </DashboardShell>
  )
}
