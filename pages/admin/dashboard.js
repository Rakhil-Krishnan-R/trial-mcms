import React from "react";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import Router from "next/router";

export default function AdminDashboard(){
  const { data: comps, error } = useSWR("/api/competitions", fetcher);
  if (error) return <div>Error</div>;
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Button variant="outlined" sx={{ mt:2, mb:2 }} onClick={()=>Router.push("/admin/competitions/create")}>Create Competition</Button>
      <Grid container spacing={2}>
        {comps?.map(c => (
          <Grid item xs={12} md={6} key={c._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.name}</Typography>
                <Typography variant="body2">{c.collegeName}</Typography>
                <Typography variant="caption">Teams: {c.numberOfTeams} • Courts: {c.numberOfCourtRooms}</Typography>
                <Button sx={{ mt:1 }} variant="contained" onClick={()=>Router.push(`/admin/competitions/${c._id}`)}>Go to Competition Dashboard</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
