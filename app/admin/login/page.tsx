'use client';
import { useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    setError('');
    const res = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    if (res.ok) window.location.href = '/admin';
    else setError((await res.json()).error || 'Login failed');
  };

  return (
    <DashboardShell>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Admin Login</Typography>
      <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} fullWidth sx={{ mb: 2 }} />
      <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <Button variant="contained" onClick={submit}>Sign In</Button>
      <Button variant="text" sx={{ ml: 2 }} href="/admin/register">Create an account</Button>
    </DashboardShell>
  )
}
