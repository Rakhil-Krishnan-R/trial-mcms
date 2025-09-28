import React from "react";
import { useRouter } from "next/router";
import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function CompIndex(){
  const router = useRouter();
  const { id } = router.query;
  return (
    <Container sx={{ mt:4 }}>
      <Typography variant="h5">Competition Dashboard</Typography>
      <Typography variant="subtitle1">Competition ID: {id}</Typography>
      <Box sx={{ mt:2, display:"flex", gap:2 }}>
        <Link href={`/admin/competitions/${id}/teams`} passHref><Button variant="outlined">Team Management</Button></Link>
        <Link href={`/admin/competitions/${id}/assign`} passHref><Button variant="outlined">Assign Courts</Button></Link>
        <Link href={`/admin/competitions/${id}/live`} passHref><Button variant="outlined">See Live Court Data</Button></Link>
      </Box>
    </Container>
  );
}
