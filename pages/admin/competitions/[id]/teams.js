import React from "react";
import { useRouter } from "next/router";
import { Container, Typography } from "@mui/material";

export default function Teams(){
  const router = useRouter();
  const { id } = router.query;
  return (
    <Container sx={{ mt:4 }}>
      <Typography variant="h6">Team Management — Competition {id}</Typography>
      <Typography variant="body2">(Team generation and speaker editing UI to be built — scaffold provided)</Typography>
    </Container>
  );
}
