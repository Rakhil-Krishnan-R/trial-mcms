import React, {useState} from "react";
import axios from "axios";
import Router from "next/router";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function Register(){
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const submit = async (e)=>{
    e.preventDefault();
    try{
      await axios.post("/api/auth/register", { name, email, password });
      Router.push("/admin/dashboard");
    }catch(e){ setErr(e?.response?.data?.message || "Failed"); }
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5">Create Admin Account</Typography>
      <Box component="form" onSubmit={submit} sx={{ display:"grid", gap:2, mt:2 }}>
        <TextField label="Full name" value={name} onChange={e=>setName(e.target.value)} required />
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {err && <Typography color="error">{err}</Typography>}
        <Button variant="contained" type="submit">Create</Button>
      </Box>
    </Container>
  );
}
