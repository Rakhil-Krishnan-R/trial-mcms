import * as React from "react";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: { main: "#1565C0" },
    secondary: { main: "#607D8B" },
    background: { default: "#f5f7fa" },
  }
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MCMS — BLACKSTONE EDITION</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps}/>
      </ThemeProvider>
    </>
  );
}
