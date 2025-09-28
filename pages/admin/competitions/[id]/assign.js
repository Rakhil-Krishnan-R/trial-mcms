import React from "react";
import { useRouter } from "next/router";
import { Container, Typography } from "@mui/material";

export default function Assign(){
  const router = useRouter();
  const { id } = router.query;
  return (
    <Container sx={{ mt:4 }}>
      <Typography variant="h6">Assign Courts — Competition {id}</Typography>
      <Typography variant="body2">(Assign courts form scaffold)</Typography>
    </Container>
  );
}
