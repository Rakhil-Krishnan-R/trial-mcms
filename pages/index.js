import React from "react";
import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";

export default function Home(){
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4">MCMS — BLACKSTONE EDITION</Typography>
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Link href="/admin/login" passHref><Button variant="contained">Admin Portal</Button></Link>
        <Link href="/judge/login" passHref><Button variant="outlined">Judge Portal</Button></Link>
        <Link href="/manager/login" passHref><Button variant="outlined">Manager Portal</Button></Link>
      </Box>
    </Container>
  );
}
