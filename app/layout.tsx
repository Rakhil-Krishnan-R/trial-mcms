import AppTheme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppTheme>
          <CssBaseline />
          {children}
        </AppTheme>
      </body>
    </html>
  );
}
