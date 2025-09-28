'use client';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();
  return (
    <AppBar position="sticky" color="inherit" elevation={1} sx={{ borderBottom: '1px solid #e6e9ee' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          MCMS — Blackstone Edition
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button component={Link} href="/admin" variant={pathname?.startsWith('/admin') ? 'contained' : 'text'}>Admin</Button>
        <Button component={Link} href="/judge" variant={pathname?.startsWith('/judge') ? 'contained' : 'text'}>Judge</Button>
        <Button component={Link} href="/manager" variant={pathname?.startsWith('/manager') ? 'contained' : 'text'}>Court Manager</Button>
      </Toolbar>
    </AppBar>
  );
}
