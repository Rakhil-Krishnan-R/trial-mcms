import React, {useState, useMemo} from "react";
import axios from "axios";
import { Container, TextField, Button, Box, Typography, Grid, IconButton, Checkbox, FormControlLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Router from "next/router";

export default function CreateCompetition(){
  const [form, setForm] = useState({
    name:"", collegeName:"", startDate:"", endDate:"", numberOfTeams:16, numberOfCourtRooms:4, teamPrefix:"ABC",
    rounds: [{name:"Prelims 1", enabled:true},{name:"Prelims 2", enabled:false}],
    scoringRubric: [{criterion:"Oral Advocacy", maxMarks:50}]
  });

  const totalMarks = useMemo(()=> form.scoringRubric.reduce((s,c)=> s + Number(c.maxMarks||0),0), [form.scoringRubric]);

  const addCriterion = ()=> setForm(f=>({...f, scoringRubric:[...f.scoringRubric, {criterion:"", maxMarks:0}]}));
  const removeCriterion = (i)=> setForm(f=>({...f, scoringRubric:f.scoringRubric.filter((_,k)=>k!==i)}));
  const updateCriterion = (i, key, value) => setForm(f=> {
    const rub = [...f.scoringRubric]; rub[i][key] = value;
    return {...f, scoringRubric: rub};
  });

  const submit = async (e)=>{
    e.preventDefault();
    const payload = {...form, totalMarks};
    await axios.post("/api/competitions", payload);
    Router.push("/admin/dashboard");
  };

  return (
    <Container sx={{mt:4}}>
      <Typography variant="h5">Create Competition</Typography>
      <Box component="form" onSubmit={submit} sx={{ mt:2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Competition Name" fullWidth value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="College Name" fullWidth value={form.collegeName} onChange={e=>setForm({...form, collegeName:e.target.value})} />
          </Grid>
          <Grid item xs={6}><TextField type="date" label="Start Date" fullWidth InputLabelProps={{shrink:true}} value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})} /></Grid>
          <Grid item xs={6}><TextField type="date" label="End Date" fullWidth InputLabelProps={{shrink:true}} value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})} /></Grid>
          <Grid item xs={6}><TextField label="Number of Teams" type="number" fullWidth value={form.numberOfTeams} onChange={e=>setForm({...form, numberOfTeams: Number(e.target.value)})} /></Grid>
          <Grid item xs={6}><TextField label="Number of Court Rooms" type="number" fullWidth value={form.numberOfCourtRooms} onChange={e=>setForm({...form, numberOfCourtRooms: Number(e.target.value)})} /></Grid>
          <Grid item xs={6}><TextField label="Team Prefix" value={form.teamPrefix} onChange={e=>setForm({...form, teamPrefix:e.target.value})} /></Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Rounds</Typography>
            {form.rounds.map((r,i)=>(
              <FormControlLabel key={i} control={<Checkbox checked={r.enabled} onChange={e=> setForm(f=> {
                const rounds=[...f.rounds]; rounds[i].enabled = e.target.checked; return {...f, rounds};
              })} />} label={r.name} />
            ))}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1">Scoring Rubric — Total Marks: {totalMarks}</Typography>
            {form.scoringRubric.map((c,i)=>(
              <Box key={i} sx={{display:"flex",gap:1, alignItems:"center", mb:1}}>
                <TextField label="Criterion" value={c.criterion} onChange={e=>updateCriterion(i,"criterion", e.target.value)} />
                <TextField label="Max Marks" type="number" value={c.maxMarks} onChange={e=>updateCriterion(i,"maxMarks", e.target.value)} />
                <IconButton color="error" onClick={()=>removeCriterion(i)}><RemoveIcon/></IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={addCriterion}>Add Criterion</Button>
          </Grid>

        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" type="submit">Create</Button>
        </Box>
      </Box>
    </Container>
  );
}
