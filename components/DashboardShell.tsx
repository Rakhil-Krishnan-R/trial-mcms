'use client';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TopNav from './TopNav';
export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopNav />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  )
}
