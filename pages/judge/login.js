import React from "react";
import { Container, Typography } from "@mui/material";

export default function JudgeLogin(){
  return (
    <Container sx={{ mt:8 }}>
      <Typography variant="h5">Judge Login (session-based)</Typography>
      <Typography variant="body2">This is a scaffold. Implement cascading dropdowns (Competition → Court → Round) and password entry.</Typography>
    </Container>
  );
}
