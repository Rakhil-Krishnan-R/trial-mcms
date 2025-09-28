import React from "react";
import { useRouter } from "next/router";
import { Container, Typography } from "@mui/material";

export default function Live(){
  const router = useRouter();
  const { id } = router.query;
  return (
    <Container sx={{ mt:4 }}>
      <Typography variant="h6">Live Court Data — Competition {id}</Typography>
      <Typography variant="body2">(Real-time dashboard scaffold)</Typography>
    </Container>
  );
}
