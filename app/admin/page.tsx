import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import DashboardShell from "@/components/DashboardShell";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default async function AdminIndex() {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "SUPERADMIN")) {
    redirect("/admin/login");
  }
  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Admin Dashboard</Typography>
      <Button component={Link} href="/admin/competitions" variant="contained">View My Competitions</Button>
    </DashboardShell>
  );
}
