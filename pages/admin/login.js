import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography, Link } from "@mui/material";
import axios from "axios";
import Router from "next/router";

export default function AdminLogin(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await axios.post("/api/auth/login",{ email, password });
      Router.push("/admin/dashboard");
    }catch(err){
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Admin Sign In — MCMS</Typography>
      <Box component="form" onSubmit={submit} sx={{ display:"grid", gap:2 }}>
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained">Sign In</Button>
        <Link href="/admin/register">Create Admin Account</Link>
      </Box>
    </Container>
  );
}
